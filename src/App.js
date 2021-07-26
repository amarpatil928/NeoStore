import './App.css';
import Header from './commonComponent/Header';
import Footer from './commonComponent/Footer';
import Registration from './Registration';
import Login from './Login';
import Forgot from './Forgot';
import Dashboard from './Dashboard';
import AllProducts from './AllProducts';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import Order from './Order';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Profile from './Profile';
import Address from './Address';
import ChangePassword from './ChangePassword';
import ProfileForm from './ProfileForm';
import Email from './Email';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  const PrivateRoute = ({ component: Component, ...rest }) => 
      (  
        <Route {...rest} render={props => 
        (
          localStorage.getItem("auth") ? <Component {...props} /> 
          : 
          <div>
            {toast.error("You are not logged in")}
            <Redirect to={{pathname: '/'}}/>
          </div>
        )}/>
      );
  
  return (

    // BEM 
    <div>
      <Router>
        <div className="App">
          <Header />
            <div >
              <Switch>
                <PrivateRoute path="/profileForm" exact component={ProfileForm} />
                <PrivateRoute path="/changePassword" exact component={ChangePassword} />
                <PrivateRoute path="/address" exact component={Address} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/checkout" exact component={Checkout} />
                <PrivateRoute path="/order" exact component={Order} />
                <PrivateRoute path="/productDetail/:productId" exact component={ProductDetail} />
                <PrivateRoute path="/cart" exact component={Cart} />
                <PrivateRoute path="/products" exact component={AllProducts} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <Route path="/email" exact component={Email} />
                <Route path="/forgot" exact component={Forgot} />
                <Route path="/registration" exact component={Registration} />
                <Route path="/" exact component={Login} />
                <Route >404 Not Found!</Route>
              </Switch>
            </div>
          <Footer />
        </div>
      </Router>

      <ToastContainer
          position="top-center"
          style={{top: '0px', padding:'0'}}
          autoClose={3000}
        />
    </div>
    
  );
}

export default App;
