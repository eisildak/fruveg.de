import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getCart } from 'wasp/client/operations';
import { updateCartItem, removeFromCart, clearCart } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import Navbar from '../components/Navbar';

export default function Sepet() {
  const { data: cart, isLoading, refetch } = useQuery(getCart);

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItem({ cartItemId, quantity });
      refetch();
    } catch (error: any) {
      alert(error.message || 'Bir hata oluştu');
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    if (!confirm('Bu ürünü sepetten çıkarmak istediğinize emin misiniz?')) {
      return;
    }
    try {
      await removeFromCart({ cartItemId });
      refetch();
    } catch (error: any) {
      alert(error.message || 'Bir hata oluştu');
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Sepeti tamamen temizlemek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await clearCart();
      refetch();
    } catch (error: any) {
      alert(error.message || 'Bir hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Mein Warenkorb</h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800"
            >
              Warenkorb leeren
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-4">Ihr Warenkorb ist leer</h2>
            <p className="text-gray-600 mb-8">
              Beginnen Sie jetzt mit dem Einkaufen und entdecken Sie frische Produkte!
            </p>
            <Link
              to="/urunler"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition inline-block"
            >
              Produkte ansehen
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center mr-6">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-4xl">
                          {item.product.category === 'Meyve' ? '🍎' : '🥬'}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{item.product.name}</h3>
                      <p className="text-gray-600 mb-2">
                        {Number(item.product.price).toFixed(2)} ₺ / {item.product.unit}
                      </p>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              Math.max(item.product.minOrderQuantity, item.quantity - 1)
                            )
                          }
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border rounded">
                          {item.quantity} {item.product.unit}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        {(Number(item.product.price) * item.quantity).toFixed(2)} ₺
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zwischensumme</span>
                    <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Versand</span>
                    <span className="font-semibold text-green-600">Kostenlos</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Gesamt</span>
                      <span className="text-green-600">{totalPrice.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                {totalPrice < 500 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                      Mindestbestellwert beträgt 500 €. 
                      <span className="font-semibold ml-1">
                        {(500 - totalPrice).toFixed(2)} €
                      </span> noch hinzufügen.
                    </p>
                  </div>
                )}

                <Link
                  to="/odeme"
                  className={`block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center ${
                    totalPrice < 500 ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  Zur Kasse gehen
                </Link>

                <Link
                  to="/urunler"
                  className="block text-center text-green-600 hover:text-green-800 mt-4"
                >
                  Weiter einkaufen
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
