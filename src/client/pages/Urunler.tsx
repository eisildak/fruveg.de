import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function Urunler() {
  const { data: products, isLoading } = useQuery(getProducts);

  const [selectedCategory, setSelectedCategory] = React.useState<string>('Alle');

  const categories = ['Alle', 'Obst', 'Gemüse', 'Bio'];

  const filteredProducts = products?.filter(
    (p) => selectedCategory === 'Alle' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Alle Produkte</h1>

        {/* Category Filter */}
        <div className="mb-8 flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">In dieser Kategorie sind noch keine Produkte vorhanden.</p>
          </div>
        )}
      </div>
    </div>
  );
}
