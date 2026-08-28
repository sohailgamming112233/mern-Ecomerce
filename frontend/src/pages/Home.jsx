import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Find your favorite products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 border border-gray-300 bg-white rounded-lg py-3 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 bg-white rounded-lg py-3 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              All Categories
            </option>

            <option value="laptop">
              Laptops
            </option>

            <option value="tablet">
              Tablets
            </option>

            <option value="mobile">
              Mobile
            </option>
          </select>

        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition"
              >

                <div className="h-56 bg-gray-100 overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />

                </div>

                <div className="p-5">

                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <h2 className="text-lg font-bold text-gray-800 mt-3">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">

                    <span className="text-xl font-bold text-blue-600">
                      Rs. {product.price}
                    </span>

                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>

                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
                  >
                    View Product
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Home;