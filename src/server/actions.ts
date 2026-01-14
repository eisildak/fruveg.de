import type {
  AddToCart,
  UpdateCartItem,
  RemoveFromCart,
  ClearCart,
  CreateOrder,
  UpdateOrderStatus,
  CreateProduct,
  UpdateProduct,
  DeleteProduct
} from 'wasp/server/operations';
import { HttpError } from 'wasp/server';

// ============= SEPET İŞLEMLERİ =============

type AddToCartInput = {
  productId: number;
  quantity: number;
};

export const addToCart: AddToCart<AddToCartInput, void> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Sepete ekleme yapmak için giriş yapmalısınız');
  }

  const product = await context.entities.Product.findUnique({
    where: { id: args.productId }
  });

  if (!product) {
    throw new HttpError(404, 'Ürün bulunamadı');
  }

  if (!product.isAvailable) {
    throw new HttpError(400, 'Bu ürün şu an mevcut değil');
  }

  if (args.quantity < product.minOrderQuantity) {
    throw new HttpError(400, `Minimum sipariş miktarı: ${product.minOrderQuantity} ${product.unit}`);
  }

  // Sepeti bul veya oluştur
  let cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id }
  });

  if (!cart) {
    cart = await context.entities.Cart.create({
      data: {
        userId: context.user.id
      }
    });
  }

  // Ürün zaten sepette var mı?
  const existingItem = await context.entities.CartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: args.productId
      }
    }
  });

  if (existingItem) {
    // Miktarı artır
    await context.entities.CartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + args.quantity
      }
    });
  } else {
    // Yeni ürün ekle
    await context.entities.CartItem.create({
      data: {
        cartId: cart.id,
        productId: args.productId,
        quantity: args.quantity
      }
    });
  }
};

type UpdateCartItemInput = {
  cartItemId: number;
  quantity: number;
};

export const updateCartItem: UpdateCartItem<UpdateCartItemInput, void> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const cartItem = await context.entities.CartItem.findUnique({
    where: { id: args.cartItemId },
    include: {
      cart: true,
      product: true
    }
  });

  if (!cartItem || cartItem.cart.userId !== context.user.id) {
    throw new HttpError(404, 'Sepet ürünü bulunamadı');
  }

  if (args.quantity < 1) {
    throw new HttpError(400, 'Miktar en az 1 olmalıdır');
  }

  if (args.quantity < cartItem.product.minOrderQuantity) {
    throw new HttpError(400, `Minimum sipariş miktarı: ${cartItem.product.minOrderQuantity} ${cartItem.product.unit}`);
  }

  await context.entities.CartItem.update({
    where: { id: args.cartItemId },
    data: { quantity: args.quantity }
  });
};

type RemoveFromCartInput = {
  cartItemId: number;
};

export const removeFromCart: RemoveFromCart<RemoveFromCartInput, void> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const cartItem = await context.entities.CartItem.findUnique({
    where: { id: args.cartItemId },
    include: {
      cart: true
    }
  });

  if (!cartItem || cartItem.cart.userId !== context.user.id) {
    throw new HttpError(404, 'Sepet ürünü bulunamadı');
  }

  await context.entities.CartItem.delete({
    where: { id: args.cartItemId }
  });
};

export const clearCart: ClearCart<void, void> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id }
  });

  if (cart) {
    await context.entities.CartItem.deleteMany({
      where: { cartId: cart.id }
    });
  }
};

// ============= SİPARİŞ İŞLEMLERİ =============

type CreateOrderInput = {
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPostalCode: string;
  deliveryPhone: string;
  deliveryNotes?: string;
  paymentMethod: string;
};

export const createOrder: CreateOrder<CreateOrderInput, any> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Sipariş vermek için giriş yapmalısınız');
  }

  // Sepeti getir
  const cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    throw new HttpError(400, 'Sepetiniz boş');
  }

  // Toplam tutarı hesapla
  const totalPrice = cart.items.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  // Minimum sipariş tutarı kontrolü (500 TL)
  if (totalPrice < 500) {
    throw new HttpError(400, 'Minimum sipariş tutarı 500 TL olmalıdır');
  }

  // Sipariş numarası oluştur
  const orderNumber = `FRU${Date.now()}${Math.floor(Math.random() * 1000)}`;

  // Sipariş oluştur
  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      orderNumber,
      totalPrice,
      deliveryAddress: args.deliveryAddress,
      deliveryCity: args.deliveryCity,
      deliveryPostalCode: args.deliveryPostalCode,
      deliveryPhone: args.deliveryPhone,
      deliveryNotes: args.deliveryNotes,
      paymentMethod: args.paymentMethod,
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
          unit: item.product.unit
        }))
      }
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  // Sepeti temizle
  await context.entities.CartItem.deleteMany({
    where: { cartId: cart.id }
  });

  return order;
};

type UpdateOrderStatusInput = {
  orderId: number;
  status: string;
};

export const updateOrderStatus: UpdateOrderStatus<UpdateOrderStatusInput, void> = async (args, context) => {
  if (!context.user || !context.user.isAdmin) {
    throw new HttpError(403, 'Bu işlem için admin yetkisi gereklidir');
  }

  await context.entities.Order.update({
    where: { id: args.orderId },
    data: { status: args.status }
  });
};

// ============= ÜRÜN YÖNETİMİ (ADMIN) =============

type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  unit: string;
  category: string;
  imageUrl?: string;
  stock: number;
  minOrderQuantity: number;
};

export const createProduct: CreateProduct<CreateProductInput, void> = async (args, context) => {
  if (!context.user || !context.user.isAdmin) {
    throw new HttpError(403, 'Bu işlem için admin yetkisi gereklidir');
  }

  await context.entities.Product.create({
    data: {
      name: args.name,
      description: args.description,
      price: args.price,
      unit: args.unit,
      category: args.category,
      imageUrl: args.imageUrl,
      stock: args.stock,
      minOrderQuantity: args.minOrderQuantity
    }
  });
};

type UpdateProductInput = {
  productId: number;
  name?: string;
  description?: string;
  price?: number;
  unit?: string;
  category?: string;
  imageUrl?: string;
  stock?: number;
  isAvailable?: boolean;
  minOrderQuantity?: number;
};

export const updateProduct: UpdateProduct<UpdateProductInput, void> = async (args, context) => {
  if (!context.user || !context.user.isAdmin) {
    throw new HttpError(403, 'Bu işlem için admin yetkisi gereklidir');
  }

  const { productId, ...updateData } = args;

  await context.entities.Product.update({
    where: { id: productId },
    data: updateData
  });
};

type DeleteProductInput = {
  productId: number;
};

export const deleteProduct: DeleteProduct<DeleteProductInput, void> = async (args, context) => {
  if (!context.user || !context.user.isAdmin) {
    throw new HttpError(403, 'Bu işlem için admin yetkisi gereklidir');
  }

  await context.entities.Product.update({
    where: { id: args.productId },
    data: { isAvailable: false }
  });
};
