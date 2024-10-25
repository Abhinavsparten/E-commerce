import React from 'react';

const ProductList = ({ products, onPageChange, totalPages, currentPage }) => (
  <>
    <div className="grid bg-slate-50 gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="card flex flex-col items-center p-4 bg-white shadow-lg hover:scale-105 transition-transform max-w-xs mx-4"
          >
            <img src={product.thumbnail} alt={product.title} className="h-40 w-3/4 object-cover mb-4" />
            <h6 className="text-lg font-semibold text-gray-800 mt-2">{product.title}</h6>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Rating: {product.rating}</p>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
              ENQUIRE
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>

    {/* Pagination Controls */}
    <div className="flex flex-wrap justify-center mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-1/5 md:w-auto px-3 py-1 mx-1 my-1 text-sm md:text-base ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </>
);

export default ProductList;
