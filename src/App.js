import React from 'react';
import Mycom from './component/Mycom'; 
import ProductList from './component/ProductList'; 


const App = () => {
  return (
    <div className="App">
      <h1>Top Products App</h1>
      <Mycom /> 
      <ProductList/>
    </div>
  );
};

export default App;
