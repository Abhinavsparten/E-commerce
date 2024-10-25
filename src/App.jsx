import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import Spinner from './Components/Spinner'; 
import ProductList from './Components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const productsPerPage = 20;
  const API_URL = 'https://dummyjson.com/products';

 //fetching api
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=${productsPerPage}&skip=${(page - 1) * productsPerPage}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
 //search 
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
//menu 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // navbar
    <div>
      <nav className="bg-black sticky top-0 z-10 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center p-4">
          <span className="text-white font-montserrat text-sm ps-1">
            <b>No.1 Shopping App</b>
          </span>
          <span className="text-white font-montserrat ps-2 me-1 pe-1 flex items-center">
            <IoPerson className="text-white me-3" /> <b>Login | Register</b>
          </span>
        </div>

        <div className="bg-gray-100 shadow-md w-full md:px-20">
          <div className="flex justify-between items-center p-6">
            <span className="text-2xl font-bold text-green-500">OfficeDotCom</span>
            <div className="hidden md:flex space-x-6 text-lg">
              <a href="#" className="hover:text-orange-300">Home</a>
              <a href="#" className="hover:text-orange-300">About Us</a>
              <a href="#" className="hover:text-orange-300">Product</a>
              <a href="#" className="hover:text-orange-300">Service & Support</a>
              <a href="#" className="hover:text-orange-300">FAQ</a>
              <a href="#" className="hover:text-orange-300">Contact Us</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-2 py-1"
              />
              <button className="bg-transparent border rounded px-2 py-1">
                <FaSearch />
              </button>
              <span className="ml-2">
                <BsCart3 />
              </span>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-dark focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* for menu bar in small screen */}
          {isMenuOpen && (
            <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">About Us</a>
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Product</a>
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Service & Support</a>
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">FAQ</a>
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
              <a href="#" className="block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Log In</a>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <button className="bg-transparent border rounded px-2 py-1">
                  <FaSearch />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto py-8">
        {loading ? (
          //spinner
          <Spinner />
        ) : (
          //product component
          <ProductList
            products={filteredProducts}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
      </main>
    </div>
  );
};

export default App;
