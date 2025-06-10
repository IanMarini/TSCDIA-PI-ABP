import { saveAs } from 'file-saver';

const ExportPanel = ({ products }) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'productos.json');
  };

  const exportCSV = () => {
    const headers = ['Id', 'Title', 'Precio', 'Rating', 'Categoría', 'Stock'];
    const rows = products.map(p => [p.id, p.title, p.price, p.rating, p.category, p.stock]);
    const csvContent =
      headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'Planilla_Productos.csv');
  };

  return (
    <div className="mb-6 flex gap-4">
      <button
        onClick={exportJSON}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Exportar JSON
      </button>
      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Exportar CSV
      </button>
    </div>
  );
};

export default ExportPanel;
