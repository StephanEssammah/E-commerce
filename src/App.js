import './App.scss';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Menu } from './components/Menu';
import { Product } from './components/Product';
import { Category } from './components/Category';

function App() {
  const [menu, setMenu] = useState(false)
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await axios.get('https://frend-ecom-api.azurewebsites.net/Category')
      setCategories(categories.data)
    }
    fetchCategories();
  }, [])


  return <div className="app">
      <Navbar  menu={menu} setMenu={setMenu}/>
      {menu && <Menu categories={categories} setMenu={setMenu} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:product" element={<Product />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </div>
}

export default App;
