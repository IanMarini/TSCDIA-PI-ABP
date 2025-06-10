import React from 'react';

const ComparacionPanel = ({ products, comparacion, toggleComparacion }) => {
  const productosComparacion = products.filter(p => comparacion.includes(p.id));

  if (productosComparacion.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f9fafb',
        borderTop: '2px solid #3b82f6',
        padding: '1rem',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">Comparación de Productos</h2>
      <div className="flex justify-center gap-6 max-w-6xl mx-auto">
        {productosComparacion.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '300px',
              backgroundColor: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating}</p>
            <button
              onClick={() => toggleComparacion(product.id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparacionPanel;
