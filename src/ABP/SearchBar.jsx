import React from 'react';

const SearchBar = ({
  search,
  setSearch,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  ordenSeleccionado,
  setOrdenSeleccionado,
  categorias,
  categoryTranslations
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                   bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
        placeholder="Buscar Productos:"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro por categoría */}
      <select
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                   bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'Todos' ? 'Todos' : categoryTranslations[cat] || cat}
          </option>
        ))}
      </select>

      {/* Ordenamiento */}
      <select
        value={ordenSeleccionado}
        onChange={(e) => setOrdenSeleccionado(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                   bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
      >
        <option value="">Ordenar:</option>
        <option value="precioAsc">Precio: Menor a Mayor</option>
        <option value="precioDesc">Precio: Mayor a Menor</option>
        <option value="ratingAsc">Rating: Menor a Mayor</option>
        <option value="ratingDesc">Rating: Mayor a Mayor</option>
      </select>
    </div>
  );
};

export default SearchBar;

