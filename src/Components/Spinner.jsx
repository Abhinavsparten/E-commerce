import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="loader"></div>
  </div>
);

// CSS for Spinner
const styles = `
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Append styles to the document
const appendStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

appendStyles();

export default Spinner;
