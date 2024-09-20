import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from './index'
import Authenticate from './components/authenticate'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./stores/user";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index  />}></Route>
        <Route path='/auth' element={<Authenticate/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
