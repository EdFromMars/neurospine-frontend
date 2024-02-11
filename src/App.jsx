import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="registrar" element={<Registrar/>}/>
          <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
          <Route path="olvide-password" element={<OlvidePassword/>}/>
          <Route path="nuevo-password/:token" element={<NuevoPassword/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
