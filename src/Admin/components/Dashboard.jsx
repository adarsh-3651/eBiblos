import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const products = await appwriteService.getPosts(); // active products
        const allProducts = products?.documents || [];
        setProductCount(allProducts.length);

        // Latest 5 products
        const latest = [...allProducts]
          .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
          .slice(0, 5);
        setLatestProducts(latest);

        // Category stats
        const categoryCounts = {};
        allProducts.forEach((product) => {
          const category = product.category || "Uncategorized";
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        setCategoryStats(categoryCounts);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const userData = await appwriteService.getUsers(); // Fetch users
        setUsers(userData?.documents || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    loadDashboardData();
    fetchUsers();
  }, []);

  if (loading) return <div className="p-6 text-lg font-medium">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">📊 Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl shadow-md hover:shadow-lg transition p-6">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Total Products</h2>
          <p className="text-4xl font-extrabold text-green-800">{productCount}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl shadow-md hover:shadow-lg transition p-6">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Categories</h2>
          <p className="text-4xl font-extrabold text-purple-800">{Object.keys(categoryStats).length}</p>
        </div>
      </div>

      {/* Latest Products */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🆕 Latest Products</h2>
        {latestProducts.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {latestProducts.map((product) => (
              <li key={product.$id} className="py-3 flex justify-between items-center hover:bg-gray-50 rounded-lg px-2 transition">
                <div>
                  <h3 className="font-medium text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    Rs. {product.rate} | Category:{" "}
                    <span className="italic">{product.category || "Uncategorized"}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(product.$createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category Stats */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📂 Products by Category</h2>
        {Object.keys(categoryStats).length === 0 ? (
          <p className="text-gray-600">No categories found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {Object.entries(categoryStats).map(([category, count]) => (
              <li key={category} className="py-3 flex justify-between items-center hover:bg-gray-50 rounded-lg px-2 transition">
                <span className="font-medium text-gray-800">{category}</span>
                <span className="font-bold text-gray-700">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">👥 Registered Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.$id} className="py-3 flex justify-between items-center hover:bg-gray-50 rounded-lg px-2 transition">
                <div>
                  <h3 className="font-medium text-gray-900">{user.name || "No Name"}</h3>
                  <p className="text-sm text-gray-600">{user.email || "No Email"}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(user.$createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
