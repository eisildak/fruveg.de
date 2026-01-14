import React, { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getAllOrders, getProducts } from 'wasp/client/operations';
import { updateOrderStatus, createProduct, updateProduct } from 'wasp/client/operations';
import Navbar from '../components/Navbar';

export default function Admin() {
  const { data: orders, isLoading: ordersLoading, refetch: refetchOrders } = useQuery(getAllOrders);
  const { data: products, isLoading: productsLoading, refetch: refetchProducts } = useQuery(getProducts);

  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    unit: 'kg',
    category: 'Sebze',
    stock: 0,
    minOrderQuantity: 1,
    imageUrl: '',
  });

  const handleStatusUpdate = async (orderId: number, status: string) => {
    try {
      await updateOrderStatus({ orderId, status });
      refetchOrders();
      alert('Bestellstatus wurde aktualisiert');
    } catch (error: any) {
      alert(error.message || 'Ein Fehler ist aufgetreten');
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct({ productId: editingProduct.id, ...productForm });
        alert('Produkt wurde aktualisiert');
      } else {
        await createProduct(productForm);
        alert('Produkt wurde erstellt');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: 0,
        unit: 'kg',
        category: 'Sebze',
        stock: 0,
        minOrderQuantity: 1,
        imageUrl: '',
      });
      refetchProducts();
    } catch (error: any) {
      alert(error.message || 'Bir hata oluştu');
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      unit: product.unit,
      category: product.category,
      stock: product.stock,
      minOrderQuantity: product.minOrderQuantity,
      imageUrl: product.imageUrl || '',
    });
    setShowProductForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin-Panel</h1>

        {/* Tabs */}
        <div className="mb-8 border-b">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'orders'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Bestellungen
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'products'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Produkte
            </button>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {ordersLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600">Es sind noch keine Bestellungen vorhanden.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Bestellung: {order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">Kunde: {order.user.email}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {Number(order.totalPrice).toFixed(2)} €
                        </p>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className="mt-2 border rounded px-3 py-1 text-sm"
                        >
                          <option value="Beklemede">Ausstehend</option>
                          <option value="Onaylandı">Bestätigt</option>
                          <option value="Hazırlanıyor">In Vorbereitung</option>
                          <option value="Kargoda">Versendet</option>
                          <option value="Teslim Edildi">Zugestellt</option>
                          <option value="İptal Edildi">Storniert</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Adresse: {order.deliveryAddress}, {order.deliveryCity}</p>
                      <p>Telefon: {order.deliveryPhone}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => {
                  setShowProductForm(true);
                  setEditingProduct(null);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Neues Produkt hinzufügen
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-6">
                    {editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt hinzufügen'}
                  </h2>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Produktname</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Beschreibung</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full border rounded px-4 py-2"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Preis (€)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                          className="w-full border rounded px-4 py-2"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Einheit</label>
                        <select
                          value={productForm.unit}
                          onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                          className="w-full border rounded px-4 py-2"
                        >
                          <option value="kg">kg</option>
                          <option value="adet">Stück</option>
                          <option value="demet">Bund</option>
                          <option value="kasa">Kiste</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Kategorie</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full border rounded px-4 py-2"
                        >
                          <option value="Obst">Obst</option>
                          <option value="Gemüse">Gemüse</option>
                          <option value="Bio">Bio</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Lagerbestand</label>
                        <input
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) })}
                          className="w-full border rounded px-4 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Mindestbestellmenge</label>
                      <input
                        type="number"
                        value={productForm.minOrderQuantity}
                        onChange={(e) => setProductForm({ ...productForm, minOrderQuantity: parseInt(e.target.value) })}
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Bild-URL (optional)</label>
                      <input
                        type="url"
                        value={productForm.imageUrl}
                        onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                        className="w-full border rounded px-4 py-2"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      >
                        {editingProduct ? 'Aktualisieren' : 'Erstellen'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowProductForm(false);
                          setEditingProduct(null);
                        }}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products List */}
            {productsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products?.map((product: any) => (
                  <div key={product.id} className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      {Number(product.price).toFixed(2)} € / {product.unit}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">Lagerbestand: {product.stock}</p>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Bearbeiten
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
