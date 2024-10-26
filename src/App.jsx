import React, { useState, useEffect } from 'react';
import Spinner from './Components/Spinner';
import ProductList from './Components/ProductList';
import Header from './Components/Header';

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const productsPerPage = 20;
  const API_URL = 'https://dummyjson.com/products';//api

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto py-8">
        {loading ? (
          <Spinner />
        ) : (
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
