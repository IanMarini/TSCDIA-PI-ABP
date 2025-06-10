import { BarChart, Star, TrendingUp, TrendingDown, Package, ThumbsUp } from 'lucide-react';

const StatsPanel = ({ products, categoryTranslations }) => {
  if (products.length === 0)
    return <p className="mb-4 text-gray-600">No hay productos para analizar.</p>;

  const precios = products.map(p => p.price);
  const ratings = products.map(p => p.rating);
  const categorias = [...new Set(products.map(p => p.category))];

  const precioPromedio = precios.length > 0
    ? (precios.reduce((sum, p) => sum + p, 0) / precios.length).toFixed(2)
    : '0.00';

  const precioMax = precios.length > 0 ? Math.max(...precios).toFixed(2) : '0.00';
  const precioMin = precios.length > 0 ? Math.min(...precios).toFixed(2) : '0.00';

  const stockMayor50 = products.filter(p => p.stock >= 50).length;
  const ratingMayor45 = products.filter(p => p.rating >= 4.5).length;

  const ratingPromedioGeneral = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2)
    : '0.00';

  const productosPorCategoria = {};
  const preciosPorCategoria = {};
  const ratingPorCategoria = {};
  const porCategoria = {};

  categorias.forEach(cat => {
    const productosCat = products.filter(p => p.category === cat);
    const totalCat = productosCat.length;

    productosPorCategoria[cat] = totalCat;

    preciosPorCategoria[cat] =
      totalCat > 0
        ? (productosCat.reduce((sum, p) => sum + p.price, 0) / totalCat).toFixed(2)
        : '0.00';

    ratingPorCategoria[cat] =
      totalCat > 0
        ? (productosCat.reduce((sum, p) => sum + p.rating, 0) / totalCat).toFixed(2)
        : '0.00';

    porCategoria[cat] =
      totalCat > 0
        ? {
            max: productosCat.reduce((a, b) => (a.price > b.price ? a : b)),
            min: productosCat.reduce((a, b) => (a.price < b.price ? a : b)),
          }
        : { max: null, min: null };
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-md shadow-md mb-6">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Estadísticas Detalladas</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <BarChart className="text-blue-500" />
          <div>
            <p className="text-gray-600 text-sm">Precio promedio</p>
            <p className="font-bold text-gray-800">${precioPromedio}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <TrendingUp className="text-green-500" />
          <div>
            <p className="text-gray-600 text-sm">Precio máximo</p>
            <p className="font-bold text-gray-800">${precioMax}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <TrendingDown className="text-red-500" />
          <div>
            <p className="text-gray-600 text-sm">Precio mínimo</p>
            <p className="font-bold text-gray-800">${precioMin}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <Package className="text-yellow-600" />
          <div>
            <p className="text-gray-600 text-sm">Stock ≥ 50</p>
            <p className="font-bold text-gray-800">{stockMayor50}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <ThumbsUp className="text-emerald-600" />
          <div>
            <p className="text-gray-600 text-sm">Rating ≥ 4.5</p>
            <p className="font-bold text-gray-800">{ratingMayor45}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <Star className="text-purple-600" />
          <div>
            <p className="text-gray-600 text-sm">Rating promedio</p>
            <p className="font-bold text-gray-800">{ratingPromedioGeneral}</p>
          </div>
        </div>
      </div>

      <h4 className="mt-6 mb-4 text-xl font-semibold text-gray-800">CATEGORÍAS</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categorias.map(cat => (
          <div
            key={cat}
            className="bg-white border border-gray-200 rounded-md p-4 shadow hover:shadow-lg transition-shadow"
          >
            <p className="font-semibold text-gray-900 mb-2">
              {categoryTranslations[cat] || cat}:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Productos: {productosPorCategoria[cat]}</li>
              <li>Precio promedio: ${preciosPorCategoria[cat]}</li>
              <li>Rating promedio: {ratingPorCategoria[cat]}</li>
              <li>
                Más caro:{' '}
                {porCategoria[cat].max
                  ? `${porCategoria[cat].max.title} ($${porCategoria[cat].max.price})`
                  : 'N/A'}
              </li>
              <li>
                Más barato:{' '}
                {porCategoria[cat].min
                  ? `${porCategoria[cat].min.title} ($${porCategoria[cat].min.price})`
                  : 'N/A'}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
