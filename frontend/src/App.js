import './App.css';
import {  BrowserRouter ,Routes, Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import SignUp from './component/Signup';
import SignIn from './component/Signin';
import Home from './component/Home';
import AddItem from './component/AddItem';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes >
        <Route exect path="/" element = {<Home/>}></Route>
        <Route path="/signup" element = {<SignUp/>}></Route>
        <Route path="/signin" element = {<SignIn/>}></Route>
        <Route path="/AddItem" element = {<AddItem/>}></Route>
      </Routes>
      <ToastContainer theme="dark"/>
      </div>
    </BrowserRouter>
  );
}

export default App;
