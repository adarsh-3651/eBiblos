// src/admin/components/Sidebar.jsx
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">Products</Link>
        <Link to="/admin/products/add" className="hover:bg-gray-700 p-2 rounded">Add Product</Link>
        <Link to="/admin/products/edit" className="hover:bg-gray-700 p-2 rounded">Edit Product</Link>

      </nav>
    </div>
  );
};

export default Sidebar;
