import "./App.css"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./components/Home";
import Products from "./components/Products";
import { useEffect } from "react";
import LoginProtected from "./components/LoginProtected";
import Payment from "./components/Payment";
import ChangePassword from "./components/ChangePassword";
import Admin from "./components/Admin";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Feedbacks from "./components/Feedbacks";


function App() {

  

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={Admin} />
        <LoginProtected exact path="/products" component={Products} />
        <LoginProtected exact path="/payment" component={Payment} />
        <LoginProtected exact path="/changePassword" component={ChangePassword} />
        <LoginProtected exact path="/cart" component={Cart} />
        <LoginProtected exact path="/contact" component={Contact} />
        <LoginProtected exact path="/feedbacks" component={Feedbacks} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
