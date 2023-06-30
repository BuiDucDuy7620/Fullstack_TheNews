import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './page/Login/login.js'
import Signup from './page/SignUp/signup.js'
import Home from './page/Home/home.js'
import Detail from './page/Detail/detail.js'
import Option from './page/Option/option.js'
import Update from './page/Update/update';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/option/:id" element={<Option />}></Route>
        

        </Routes>
    </Router>
    
  );
}

export default App;
