import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./context/AuthProvider";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="registrar" element={<Registrar/>}/>
            <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            <Route path="olvide-password" element={<OlvidePassword/>}/>
            <Route path="nuevo-password/:token" element={<NuevoPassword/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
