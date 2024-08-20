import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import './Admin.css';
import ListProduct from '../../Components/ListProduuct/ListProduct';
import AddProduct from '../../Components/AddProduct/AddProduct';

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar/>
            <Routes>
                <Route path='/listproduct' element={<ListProduct/>}/>
                <Route path='/addproduct' element={<AddProduct/>} />
            </Routes>
        </div>
    );
};

export default Admin;