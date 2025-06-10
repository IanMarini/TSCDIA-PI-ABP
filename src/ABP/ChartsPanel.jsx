import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57'];

const ChartsPanel = ({ products }) => {
  // Productos por Categoría
  const porCategoria = {};
  products.forEach(p => {
    porCategoria[p.category] = (porCategoria[p.category] || 0) + 1;
  });
  const dataCategorias = Object.entries(porCategoria).map(([cat, count]) => ({
    category: cat,
    cantidad: count,
  }));

  // Proporción por stock (Alto vs Bajo)
  const stockAlto = products.filter(p => p.stock > 50).length;
  const stockBajo = products.length - stockAlto;
  const dataStock = [
    { name: 'Stock > 50', value: stockAlto },
    { name: 'Stock ≤ 50', value: stockBajo }
  ];

  // Evolución de Precios
  const dataLinea = products.slice(0, 10).map((p, i) => ({
    name: `Día ${i + 1}`,
    precio: Number(p.price),
  }));

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Visualizaciones</h3>

      <div className="mb-8">
        <h4 className="font-bold mb-2">Productos por CATEGORÍA</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataCategorias}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h4 className="font-bold mb-2">Proporción por STOCK</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dataStock} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {dataStock.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4 className="font-bold mb-2">Evolución Temporal de PRECIOS</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataLinea}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="precio" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsPanel;
