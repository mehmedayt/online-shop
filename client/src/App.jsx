import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavbarComponent/NavbarComponent';
import Footer from './Components/FooterComponent/FooterComponent';
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kid_banner from './assets/banner_kids.png';
import ShopPage from './Pages/ShopPage';
import ShopCategoryPage from './Pages/ShopCategoryPage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import LoginSignupPage from './Pages/LoginSignupPage';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<ShopPage/>} />
      <Route path='/mens' element={<ShopCategoryPage banner={men_banner} category="men"/>}/>
          <Route path='/womens' element={<ShopCategoryPage  banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategoryPage  banner={kid_banner} category="kid"/>}/>
          <Route path="/product" element={<ProductPage/>}>
            <Route path=':productId' element={<ProductPage/>}/>
          </Route>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/login' element={<LoginSignupPage/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
