import React from 'react';

const ProductList = ({
  products,
  favoritos,
  toggleFavorito,
  comparacion,
  toggleComparacion,
  categoryTranslations
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => {
        const esFavorito = favoritos.includes(product.id);
        const enComparacion = comparacion.includes(product.id);
        const categoriaTraducida = categoryTranslations[product.category] || product.category;

        return (
          <div
            key={product.id}
            className={`border rounded p-4 shadow-md flex flex-col justify-between ${
              esFavorito ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'
            }`}
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-2 capitalize">
                Categoría: {categoriaTraducida}
              </p>
              <p className="mb-2">
                Precio: <span className="font-bold">${product.price}</span>
              </p>
              <p>Rating: {product.rating}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {/* Botón favorito */}
              <button
                onClick={() => toggleFavorito(product.id)}
                className={`px-3 py-1 rounded ${
                  esFavorito
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-300 text-gray-700 hover:bg-yellow-300'
                }`}
                title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {esFavorito ? '★ Favorito' : '☆ Favorito'}
              </button>

              {/* Checkbox comparación */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={enComparacion}
                  onChange={() => toggleComparacion(product.id)}
                  disabled={!enComparacion && comparacion.length >= 2}
                />
                <span>Comparar</span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
