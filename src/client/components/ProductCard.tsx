import React, { useState } from 'react';
import { addToCart } from 'wasp/client/operations';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string | null;
    price: any; // Decimal type from Prisma
    unit: string;
    category: string;
    imageUrl: string | null;
    minOrderQuantity: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart({ productId: product.id, quantity });
      alert('Produkt wurde zum Warenkorb hinzugefügt!');
    } catch (error: any) {
      alert(error.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-6xl">
            {product.category === 'Meyve' ? '🍎' : '🥬'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-600">
              {Number(product.price).toFixed(2)} ₺
            </span>
            <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
          </div>
        </div>

        {/* Quantity Input */}
        <div className="flex items-center space-x-2 mb-3">
          <button
            onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
            className="w-20 text-center border rounded py-1"
            min={product.minOrderQuantity}
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            +
          </button>
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {adding ? 'Wird hinzugefügt...' : 'In den Warenkorb'}
        </button>

        {product.minOrderQuantity > 1 && (
          <p className="text-xs text-gray-500 mt-2">
            Mindestbestellmenge: {product.minOrderQuantity} {product.unit}
          </p>
        )}
      </div>
    </div>
  );
}
