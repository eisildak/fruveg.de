import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getMyOrders } from 'wasp/client/operations';
import Navbar from '../components/Navbar';

export default function Siparislerim() {
  const { data: orders, isLoading } = useQuery(getMyOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return 'bg-yellow-100 text-yellow-800';
      case 'Onaylandı':
        return 'bg-blue-100 text-blue-800';
      case 'Hazırlanıyor':
        return 'bg-purple-100 text-purple-800';
      case 'Kargoda':
        return 'bg-indigo-100 text-indigo-800';
      case 'Teslim Edildi':
        return 'bg-green-100 text-green-800';
      case 'İptal Edildi':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Meine Bestellungen</h1>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold mb-4">Sie haben noch keine Bestellungen</h2>
            <p className="text-gray-600">
              Beginnen Sie jetzt mit dem Einkaufen und geben Sie Ihre erste Bestellung auf!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Bestellung Nr.: {order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        {Number(order.totalPrice).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <h4 className="font-semibold mb-3">Produkte:</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gray-200 rounded mr-4 flex items-center justify-center">
                            {item.product.imageUrl ? (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <span className="text-2xl">
                                {item.product.category === 'Meyve' ? '🍎' : '🥬'}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} {item.unit} x {Number(item.price).toFixed(2)} ₺
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">
                          {(Number(item.price) * item.quantity).toFixed(2)} ₺
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Lieferadresse:</p>
                      <p className="text-gray-600">
                        {order.deliveryAddress}, {order.deliveryCity} {order.deliveryPostalCode}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Kontakt:</p>
                      <p className="text-gray-600">{order.deliveryPhone}</p>
                    </div>
                  </div>
                  {order.deliveryNotes && (
                    <div className="mt-2">
                      <p className="font-semibold mb-1 text-sm">Hinweise:</p>
                      <p className="text-gray-600 text-sm">{order.deliveryNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
