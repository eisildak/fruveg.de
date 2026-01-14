import React, { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getCart } from 'wasp/client/operations';
import { createOrder } from 'wasp/client/operations';
import Navbar from '../components/Navbar';

export default function Odeme() {
  const { data: cart, isLoading } = useQuery(getCart);

  const [formData, setFormData] = useState({
    deliveryAddress: '',
    deliveryCity: '',
    deliveryPostalCode: '',
    deliveryPhone: '',
    deliveryNotes: '',
    paymentMethod: 'Kredi Kartı',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.deliveryAddress || !formData.deliveryCity || !formData.deliveryPostalCode || !formData.deliveryPhone) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    try {
      setSubmitting(true);
      const order = await createOrder(formData);
      alert(`Siparişiniz başarıyla oluşturuldu! Sipariş No: ${order.orderNumber}`);
      window.location.href = '/siparislerim';
    } catch (error: any) {
      alert(error.message || 'Sipariş oluşturulurken bir hata oluştu');
    } finally {
      setSubmitting(false);
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

  if (cartItems.length === 0) {
    window.location.href = '/sepet';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Kasse</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Lieferinformationen</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Lieferadresse *
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Straße, Hausnummer"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Stadt *</label>
                    <input
                      type="text"
                      name="deliveryCity"
                      value={formData.deliveryCity}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Postleitzahl *</label>
                    <input
                      type="text"
                      name="deliveryPostalCode"
                      value={formData.deliveryPostalCode}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="deliveryPhone"
                    value={formData.deliveryPhone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="0170 123 45 67"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Lieferhinweise (Optional)
                  </label>
                  <textarea
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    rows={3}
                    placeholder="Zusätzliche Anweisungen, Wegbeschreibung usw."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Zahlungsmethode</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="Kredi Kartı">Kreditkarte</option>
                    <option value="Havale">Überweisung</option>
                    <option value="Kapıda Ödeme">Zahlung bei Lieferung</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {submitting ? 'Bestellung wird erstellt...' : 'Bestellung abschließen'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {(Number(item.product.price) * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Zwischensumme</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Versand</span>
                  <span className="font-semibold text-green-600">Kostenlos</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Gesamt</span>
                    <span className="text-green-600">{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
