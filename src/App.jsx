import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import RutaProtegidaAlmacen from "./layout/RutaProtegidaAlmacen";
import RutaProtegidaVentas from "./layout/RutaProtegidaVentas";

import Inicio from "./pages/Inicio";

import Login from "./pages/usuario/Login";
import Registrar from "./pages/usuario/Registrar";
import ConfirmarCuenta from "./pages/usuario/ConfirmarCuenta";
import OlvidePassword from "./pages/usuario/OlvidePassword";
import NuevoPassword from "./pages/usuario/NuevoPassword";
import Perfil from "./pages/usuario/Perfil";

import Inventario from "./pages/inventario/Inventario";
import Producto from "./pages/inventario/Producto";
import AgregarProducto from "./pages/inventario/AgregarProducto";
import EditarProducto from "./pages/inventario/EditarProducto";

import AgregarPedido from "./pages/ventas/AgregarPedido";

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
              <Route path="perfil/:token" element={<Perfil/>}/>
            </Route>
            
            <Route path="/inicio" element={<RutaProtegida />}>
              <Route index element={<Inicio />}/>
            </Route>

            <Route path="/inventario" element={<RutaProtegida />}>
              <Route index element={<Inventario />}/>
              <Route path="agregar-producto" element={<AgregarProducto/>}/>
              <Route path="producto/:id" element={<Producto/>}/>
              <Route path="editar-producto/:id" element={<EditarProducto/>}/>
            </Route>

            <Route path="/programacion" element={<RutaProtegidaVentas />} >
              <Route index element={<AgregarPedido />}/>
            </Route>
          </Routes>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
