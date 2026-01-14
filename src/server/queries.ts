import type { GetProducts, GetCart, GetMyOrders, GetAllOrders } from 'wasp/server/operations';
import type { Product, Cart, Order } from 'wasp/entities';
import { HttpError } from 'wasp/server';

// ============= ÜRÜNLER =============

export const getProducts: GetProducts<void, Product[]> = async (_args, context) => {
  return context.entities.Product.findMany({
    where: {
      isAvailable: true
    },
    orderBy: {
      category: 'asc',
      name: 'asc'
    }
  });
};

// ============= SEPET =============

export const getCart: GetCart<void, any> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Sepeti görüntülemek için giriş yapmalısınız');
  }

  const cart = await context.entities.Cart.findUnique({
    where: {
      userId: context.user.id
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart) {
    return {
      items: [],
      totalPrice: 0
    };
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  return {
    ...cart,
    totalPrice
  };
};

// ============= SİPARİŞLER =============

export const getMyOrders: GetMyOrders<void, any[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'Siparişleri görüntülemek için giriş yapmalısınız');
  }

  return context.entities.Order.findMany({
    where: {
      userId: context.user.id
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getAllOrders: GetAllOrders<void, any[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  if (!context.user.isAdmin) {
    throw new HttpError(403, 'Bu işlem için admin yetkisi gereklidir');
  }

  return context.entities.Order.findMany({
    include: {
      user: {
        select: {
          email: true
        }
      },
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
