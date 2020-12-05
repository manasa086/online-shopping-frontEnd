import './App.css';
import Home from './Pages/Home';
import AdminPage from './Pages/AdminPage';
import {Route,Switch } from 'react-router-dom';
import routes from "./routes";
import Email from './Pages/Email';
import Cart from './Pages/Cart';
import Seller from './Pages/Seller';
import SellerCart from './Pages/SellerCart';

import AdminContent from './Pages/AdminContent';
import ChangeStatus from './Pages/ChangeStatus';
import DetailsCart from "./Pages/DetailsCart"
import PDF from './Pages/PDF';
import SellerPage from './Pages/SellerPage';
import EditCart from './Pages/EditCart';
import ForgotPassword from './Pages/ForgotPassword';


function App() {
  return (
    <Switch>
    <Route path={routes.admin}>
      <AdminPage/>
    </Route>
    <Route path={routes.email}>
      <Email/>
    </Route>
    <Route path={routes.seller}>
      <Seller/>
    </Route>
    <Route path={routes.sellercart}>
      <SellerCart/>
    </Route>
  
    <Route path={routes.sellerPage}>
      <SellerPage></SellerPage>
    </Route>
    <Route path={routes.forgotPassword}>
      <ForgotPassword/>
    </Route>
    <Route path={routes.adminContent}>
      <AdminContent/>
    </Route>
    <Route path={routes.changeStatus}>
      <ChangeStatus/>
    </Route>
    <Route path={routes.cart}>
      <Cart/>
    </Route>
    <Route path={routes.detailsCart}>
     <DetailsCart/>
    </Route>
    <Route path={routes.pdf}>
      <PDF/>
    </Route>
    <Route path={routes.editCart}>
      <EditCart></EditCart>
    </Route>
    <Route path="/">
      <Home className="app"></Home>
    </Route>
    </Switch>
  );
}

export default App;
