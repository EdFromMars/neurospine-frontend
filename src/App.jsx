import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import RutaProtegidaAlmacen from "./layout/RutaProtegidaAlmacen";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/usuario/Login";
import Registrar from "./pages/usuario/Registrar";
import ConfirmarCuenta from "./pages/usuario/ConfirmarCuenta";
import OlvidePassword from "./pages/usuario/OlvidePassword";
import NuevoPassword from "./pages/usuario/NuevoPassword";

import Inventario from "./pages/inventario/Inventario";
import Producto from "./pages/inventario/Producto";
import AgregarProducto from "./pages/inventario/AgregarProducto";
import EditarProducto from "./pages/inventario/EditarProducto";

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
              <Route path="producto/:id" element={<Producto/>}/>
              <Route path="editar-producto/:id" element={<EditarProducto/>}/>
            </Route>
          </Routes>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
