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

import Programaciones from "./pages/ventas/Programaciones";
import AgregarProgramacion from "./pages/ventas/AgregarProgramacion";

import Zonas from "./pages/zonas/Zonas";
import AgregarZona from "./pages/zonas/AgregarZona";
import Zona from "./pages/zonas/Zona";

import AgregarHospital from "./pages/hospitales/AgregarHospital";

import { AuthProvider } from "./context/AuthProvider";
import { ProductosProvider } from "./context/ProductosProvider";
import { ZonasProvider } from "./context/ZonasProvider";
import { HospitalesProvider } from "./context/HospitalesProvider";


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ZonasProvider>
          <HospitalesProvider>
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
                  <Route path="agregar-material" element={<AgregarProducto/>}/>
                  <Route path="producto/:id" element={<Producto/>}/>
                  <Route path="editar-material/:id" element={<EditarProducto/>}/>
                </Route>

                <Route path="/programacion" element={<RutaProtegida />} >
                  <Route index element={<Programaciones />}/>
                  <Route path="agregar-programacion" element={<AgregarProgramacion/>}/>
                </Route>

                <Route path="/zonas" element={<RutaProtegida />} >
                  <Route index element={<Zonas />}/>
                  <Route path="/zonas/agregar" element={<AgregarZona/>}/>
                  <Route path="/zonas/:id" element={<Zona/>}/>
                  <Route path="/zonas/agregar-hospital/:id" element={<AgregarHospital/>}/>
                </Route>
              </Routes>
            </ProductosProvider>
          </HospitalesProvider>
        </ZonasProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
