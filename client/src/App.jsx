import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Shop/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
