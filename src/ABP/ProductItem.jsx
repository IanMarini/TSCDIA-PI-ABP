// src/components/ProductItem.jsx
const ProductItem = ({ product }) => (
  <div className="border border-gray-300 rounded-md p-4 shadow-sm bg-white dark:bg-gray-800 text-center hover:shadow-md transition duration-300 transform hover:scale-105">
    <h2 className="font-medium text-md text-gray-900 dark:text-white">{product.title}</h2>
    <p className="text-blue-600 font-semibold mt-1">${product.price}</p>
  </div>
);

export default ProductItem;
