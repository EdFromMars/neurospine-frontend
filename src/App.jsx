import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import RutaProtegidaAlmacen from "./layout/RutaProtegidaAlmacen";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import AgregarProducto from "./pages/AgregarProducto";

import { AuthProvider } from "./context/AuthProvider";
import { ProductosProvider } from "./context/ProductosProvider";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="nuevo-password/:token" element={<NuevoPassword/>}/>
            </Route>
            
            <Route path="/dashboard" element={<RutaProtegida />}>
              <Route index element={<Dashboard />}/>
            </Route>

            <Route path="/inventario" element={<RutaProtegidaAlmacen />}>
              <Route index element={<Inventario />}/>
              <Route path="agregar-producto" element={<AgregarProducto/>}/>
            </Route>
          </Routes>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
