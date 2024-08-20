import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import './Admin.css';
import ListProduct from '../../Components/ListProduuct/ListProduct';

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar/>
            <Routes>
                <Route path='/listproduct' element={<ListProduct/>}/>
            </Routes>
        </div>
    );
};

export default Admin;