import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductList from './ABP/ProductList';
import StatsPanel from './ABP/StatsPanel';
import ChartsPanel from './ABP/ChartsPanel';
import ExportPanel from './ABP/ExportPanel';
import SearchBar from './ABP/SearchBar';
import ComparacionPanel from './ABP/ComparacionPanel';


const customTitles = [
  "Auriculares LunaStorm", "EcoBotella Prisma", "Reloj Solar NovaTime",
  "Lámpara Boreal", "Teclado Fantasma", "Café del Alba", "Pulsera Viento Norte",
  "Drone Zafiro", "Guitarra LavaRock", "Cámara Bruma", "Sudadera Dragón Rojo",
  "Vinilo Aurora", "Zapatillas Eclipse", "Mochila Nebulosa", "Mouse Ónix",
  "Agenda Vértigo", "Tablet Estelar", "Micrófono Eclipse Pro", "Pintura Cósmica", "Libro Lumen"
];

const categoryTranslations = {
  beauty: "Belleza",
  fragrances: "Perfumes",
  furniture: "Muebles",
  groceries: "Comestibles",
  "home-decoration": "Decoración",
  "kitchen-accessories": "Accesorios de Cocina",
  laptops: "Portátiles",
  "mens-shirts": "Camisas de hombre",
  "mens-shoes": "Zapatos de hombre",
  "mens-watches": "Relojes de hombre",
  "mobile-accessories": "Accesorios móviles",
  motorcycle: "Motocicletas",
  "skin-care": "Cuidado de la piel",
  smartphones: "Celulares",
  "sports-accessories": "Accesorios deportivos",
  sunglasses: "Anteojos de sol",
  tablets: "Tablets",
  tops: "Remeras",
  vehicle: "Vehículos",
  "womens-bags": "Bolsos de mujer",
  "womens-dresses": "Vestidos de mujer",
  "womens-jewellery": "Joyería de mujer",
  "womens-shoes": "Zapatos de mujer",
  "womens-watches": "Relojes de mujer",
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('');
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  const [modoOscuro, setModoOscuro] = useState(false);
  const appRef = useRef(null);

  const [favoritos, setFavoritos] = useState(() => {
    const favsGuardados = localStorage.getItem('favoritos');
    return favsGuardados ? JSON.parse(favsGuardados) : [];
  });

  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);
  const [comparacion, setComparacion] = useState([]);

  const toggleModoOscuro = () => {
    if (appRef.current) {
      appRef.current.classList.toggle('dark');
      setModoOscuro(prev => !prev);
    }
  };

  const toggleFavorito = (productId) => {
    setFavoritos(prev => {
      let nuevos;
      if (prev.includes(productId)) {
        nuevos = prev.filter(id => id !== productId);
      } else {
        nuevos = [...prev, productId];
      }
      localStorage.setItem('favoritos', JSON.stringify(nuevos));
      return nuevos;
    });
  };

  const toggleComparacion = (productId) => {
    setComparacion(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length < 2) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=2000')
      .then(res => {
        const renamed = res.data.products.map((prod, i) => ({
          ...prod,
          title: customTitles[i % customTitles.length],
          price: parseFloat((Math.random() * 450 + 50).toFixed(2)),
        }));
        setProducts(renamed);
        setFiltered(renamed);
      });
  }, []);

  useEffect(() => {
    const query = search.trim().toLowerCase();

    let filtrado = products.filter(p => {
      const coincideBusqueda = p.title.toLowerCase().includes(query);
      const coincideCategoria = categoriaSeleccionada === 'Todos' || p.category === categoriaSeleccionada;
      const esFavorito = favoritos.includes(p.id);

      if (mostrarSoloFavoritos && !esFavorito) {
        return false;
      }

      return coincideBusqueda && coincideCategoria;
    });

    if (ordenSeleccionado === 'precioAsc') {
      filtrado.sort((a, b) => a.price - b.price);
    } else if (ordenSeleccionado === 'precioDesc') {
      filtrado.sort((a, b) => b.price - a.price);
    } else if (ordenSeleccionado === 'ratingAsc') {
      filtrado.sort((a, b) => a.rating - b.rating);
    } else if (ordenSeleccionado === 'ratingDesc') {
      filtrado.sort((a, b) => b.rating - a.rating);
    }

    setFiltered(filtrado);
    setPaginaActual(1);
  }, [search, categoriaSeleccionada, ordenSeleccionado, products, favoritos, mostrarSoloFavoritos]);

  const categorias = ['Todos', ...new Set(products.map(p => p.category))];

  const totalPaginas = Math.ceil(filtered.length / productosPorPagina);
  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosPaginados = filtered.slice(inicio, inicio + productosPorPagina);

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div
      ref={appRef}
      className={`p-6 min-h-screen transition-colors duration-300 ${modoOscuro ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Catálogo de Productos</h1>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          onClick={toggleModoOscuro}
        >
          {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
        >
          {mostrarEstadisticas ? 'Ocultar Estadísticas' : 'Mostrar Estadísticas'}
        </button>

        <button
          className={`px-4 py-2 rounded ${mostrarSoloFavoritos ? 'bg-yellow-500 text-black' : 'bg-gray-300 text-black'} hover:bg-yellow-600`}
          onClick={() => setMostrarSoloFavoritos(!mostrarSoloFavoritos)}
        >
          {mostrarSoloFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos'}
        </button>
      </div>

      {/* PASAMOS EL DICCIONARIO DE TRADUCCIONES */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        ordenSeleccionado={ordenSeleccionado}
        setOrdenSeleccionado={setOrdenSeleccionado}
        categorias={categorias}
        categoryTranslations={categoryTranslations}
      />

      <ExportPanel products={filtered} />

      {mostrarEstadisticas && <StatsPanel products={filtered} categoryTranslations={categoryTranslations} />}
      <ChartsPanel products={filtered} />

      <ProductList
        products={productosPaginados}
        favoritos={favoritos}
        toggleFavorito={toggleFavorito}
        comparacion={comparacion}
        toggleComparacion={toggleComparacion}
        categoryTranslations={categoryTranslations}
      />

      <div className="mt-6 flex justify-center gap-4 items-center">
        <button
          onClick={irPaginaAnterior}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700 dark:text-gray-200">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={irPaginaSiguiente}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <ComparacionPanel
        products={products}
        comparacion={comparacion}
        toggleComparacion={toggleComparacion}
      />
    </div>
  );
};

export default App;
