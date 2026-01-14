import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function AnaSayfa() {
  const { data: products, isLoading } = useQuery(getProducts);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Frisches Obst & Gemüse</h1>
          <p className="text-xl mb-8">
            Direkt vom Großhändler, frische Produkte bis an Ihre Haustür
          </p>
          <a
            href="#urunler"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition inline-block"
          >
            Produkte ansehen
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Schnelle Lieferung</h3>
              <p className="text-gray-600">
                Ihre Bestellung in 24 Stunden bei Ihnen
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Frische Produkte</h3>
              <p className="text-gray-600">
                Direkt vom Feld, täglich frische Produkte
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Faire Preise</h3>
              <p className="text-gray-600">
                Qualitätsprodukte zu Großhandelspreisen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="urunler" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Beliebte Produkte</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Es sind noch keine Produkte vorhanden.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Fruveg Market. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
