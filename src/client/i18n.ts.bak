import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'de' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'de',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'fruveg-language',
    }
  )
);

export const translations = {
  de: {
    // Navbar
    home: 'Startseite',
    products: 'Produkte',
    myOrders: 'Meine Bestellungen',
    adminPanel: 'Admin-Panel',
    login: 'Anmelden',
    signup: 'Registrieren',
    
    // Product
    addToCart: 'In den Warenkorb',
    adding: 'Wird hinzugefügt...',
    minOrder: 'Mindestbestellmenge',
    productAdded: 'Produkt wurde zum Warenkorb hinzugefügt!',
    
    // Cart
    myCart: 'Mein Warenkorb',
    clearCart: 'Warenkorb leeren',
    emptyCart: 'Ihr Warenkorb ist leer',
    emptyCartDesc: 'Beginnen Sie jetzt mit dem Einkaufen und entdecken Sie frische Produkte!',
    viewProducts: 'Produkte ansehen',
    subtotal: 'Zwischensumme',
    shipping: 'Versand',
    free: 'Kostenlos',
    total: 'Gesamt',
    minOrderWarning: 'Mindestbestellwert beträgt 500 €.',
    addMore: 'noch hinzufügen.',
    checkout: 'Zur Kasse gehen',
    continueShopping: 'Weiter einkaufen',
    
    // Checkout
    payment: 'Kasse',
    deliveryInfo: 'Lieferinformationen',
    deliveryAddress: 'Lieferadresse',
    city: 'Stadt',
    postalCode: 'Postleitzahl',
    phone: 'Telefon',
    deliveryNotes: 'Lieferhinweise (Optional)',
    paymentMethod: 'Zahlungsmethode',
    creditCard: 'Kreditkarte',
    bankTransfer: 'Überweisung',
    cashOnDelivery: 'Zahlung bei Lieferung',
    placeOrder: 'Bestellung abschließen',
    placingOrder: 'Bestellung wird erstellt...',
    orderSummary: 'Bestellübersicht',
    
    // Orders
    orders: 'Bestellungen',
    noOrders: 'Sie haben noch keine Bestellungen',
    noOrdersDesc: 'Beginnen Sie jetzt mit dem Einkaufen und geben Sie Ihre erste Bestellung auf!',
    orderNumber: 'Bestellung Nr.',
    customer: 'Kunde',
    deliveryAddressLabel: 'Lieferadresse',
    contact: 'Kontakt',
    notes: 'Hinweise',
    
    // Common
    error: 'Ein Fehler ist aufgetreten',
    loading: 'Lädt...',
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    
    // Home
    heroTitle: 'Frisches Obst & Gemüse',
    heroSubtitle: 'Direkt vom Großhändler, frische Produkte bis an Ihre Haustür',
    viewProductsBtn: 'Produkte ansehen',
    fastDelivery: 'Schnelle Lieferung',
    fastDeliveryDesc: 'Ihre Bestellung in 24 Stunden bei Ihnen',
    freshProducts: 'Frische Produkte',
    freshProductsDesc: 'Direkt vom Feld, täglich frische Produkte',
    fairPrices: 'Faire Preise',
    fairPricesDesc: 'Qualitätsprodukte zu Großhandelspreisen',
    popularProducts: 'Beliebte Produkte',
    noProducts: 'Es sind noch keine Produkte vorhanden.',
    
    // Categories
    all: 'Alle',
    fruit: 'Obst',
    vegetable: 'Gemüse',
    organic: 'Bio',
    
    // Status
    pending: 'Ausstehend',
    confirmed: 'Bestätigt',
    preparing: 'In Vorbereitung',
    shipped: 'Versendet',
    delivered: 'Zugestellt',
    cancelled: 'Storniert',
  },
  en: {
    // Navbar
    home: 'Home',
    products: 'Products',
    myOrders: 'My Orders',
    adminPanel: 'Admin Panel',
    login: 'Login',
    signup: 'Sign Up',
    
    // Product
    addToCart: 'Add to Cart',
    adding: 'Adding...',
    minOrder: 'Minimum order',
    productAdded: 'Product added to cart!',
    
    // Cart
    myCart: 'My Cart',
    clearCart: 'Clear Cart',
    emptyCart: 'Your cart is empty',
    emptyCartDesc: 'Start shopping now and discover fresh products!',
    viewProducts: 'View Products',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    minOrderWarning: 'Minimum order value is €500.',
    addMore: 'more to add.',
    checkout: 'Proceed to Checkout',
    continueShopping: 'Continue Shopping',
    
    // Checkout
    payment: 'Checkout',
    deliveryInfo: 'Delivery Information',
    deliveryAddress: 'Delivery Address',
    city: 'City',
    postalCode: 'Postal Code',
    phone: 'Phone',
    deliveryNotes: 'Delivery Notes (Optional)',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    bankTransfer: 'Bank Transfer',
    cashOnDelivery: 'Cash on Delivery',
    placeOrder: 'Place Order',
    placingOrder: 'Placing order...',
    orderSummary: 'Order Summary',
    
    // Orders
    orders: 'Orders',
    noOrders: 'You have no orders yet',
    noOrdersDesc: 'Start shopping now and place your first order!',
    orderNumber: 'Order No.',
    customer: 'Customer',
    deliveryAddressLabel: 'Delivery Address',
    contact: 'Contact',
    notes: 'Notes',
    
    // Common
    error: 'An error occurred',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    
    // Home
    heroTitle: 'Fresh Fruits & Vegetables',
    heroSubtitle: 'Directly from the wholesaler, fresh products to your doorstep',
    viewProductsBtn: 'View Products',
    fastDelivery: 'Fast Delivery',
    fastDeliveryDesc: 'Your order delivered within 24 hours',
    freshProducts: 'Fresh Products',
    freshProductsDesc: 'Directly from the field, daily fresh products',
    fairPrices: 'Fair Prices',
    fairPricesDesc: 'Quality products at wholesale prices',
    popularProducts: 'Popular Products',
    noProducts: 'No products available yet.',
    
    // Categories
    all: 'All',
    fruit: 'Fruit',
    vegetable: 'Vegetable',
    organic: 'Organic',
    
    // Status
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return {
    t: (key: keyof typeof translations.de) => translations[language][key] || key,
    language,
  };
};
