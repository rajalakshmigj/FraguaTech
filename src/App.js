import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/header.jsx';
import Main from './Components/main.jsx';
import Sidebar from './Components/sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Master from './pages/Master.jsx';
import Product from './Product/product.jsx';
import Industry from './Master/industry.jsx';
import ImportProduct from './Product/importProduct.jsx';
import Expense from './Master/Expense.jsx';
import Flag from './Master/flag.jsx';
import SOStatus from './Master/SOStatus.jsx';
import SOSource from './Master/SoSource.jsx';
import Category from './Master/category.jsx';
import Variant from './Master/variant.jsx';
import '../src/App.css'
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
             <Route path="/industry" element={<Industry />} />
            <Route path="/importproduct" element={<ImportProduct />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/flag" element={<Flag />} />
            <Route path="/sostatus" element={<SOStatus />} />
            <Route path="/sosource" element={<SOSource />} />           
            <Route path="/category" element={<Category />} />
            <Route path="/variant" element={<Variant />} />
            
            {/*
            <Route path="/gstrfilings" element={<Gstrfilings />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        {/* </Header> */}
      </Router>
    </div>
  );
}

export default App;
