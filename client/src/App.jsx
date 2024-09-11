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
import ProfilePage from './Pages/ProfilePage';

const appRoutes = {
  home: { path: '/', element: <ShopPage /> },
  mens: { path: '/mens', element: <ShopCategoryPage banner={men_banner} category="men" /> },
  womens: { path: '/womens', element: <ShopCategoryPage banner={women_banner} category="women" /> },
  kids: { path: '/kids', element: <ShopCategoryPage banner={kid_banner} category="kid" /> },
  product: { path: '/product/:productId', element: <ProductPage /> },
  cart: { path: '/cart', element: <CartPage /> },
  login: { path: '/login', element: <LoginSignupPage /> },
  profile: { path: '/profile', element: <ProfilePage /> }
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {Object.values(appRoutes).map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
