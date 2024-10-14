import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'eventsource-polyfill';

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import useNotificaciones from "./hooks/useNotificaciones";
import useAuth from "./hooks/useAuth";

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
import MaterialApoyo from "./pages/inventario/MaterialApoyo";

import Programaciones from "./pages/ventas/Programaciones";
import AgregarProgramacion from "./pages/ventas/AgregarProgramacion";
import Programacion from "./pages/ventas/Programacion";

import Zonas from "./pages/zonas/Zonas";
import AgregarZona from "./pages/zonas/AgregarZona";
import Zona from "./pages/zonas/Zona";

import AgregarHospital from "./pages/hospitales/AgregarHospital";
import Hospital from "./pages/hospitales/Hospital";

import AgregarDoctor from "./pages/doctores/AgregarDoctor";
import Doctor from "./pages/doctores/Doctor";

import RazonesSociales from "./pages/razonSocial/RazonesSociales";
import RazonSocial from './pages/razonSocial/RazonSocial';
import AgregarRazonSocial from "./pages/razonSocial/AgregarRazonSocial";

import MiembrosEquipo from "./pages/equipo/MiembrosEquipo";
import MiembroEquipo from "./pages/equipo/MiembroEquipo";
import EditarMiembroEquipo from "./pages/equipo/EditarMiembroEquipo";

import { AuthProvider } from "./context/AuthProvider";
import { ProductosProvider } from "./context/ProductosProvider";
import { ZonasProvider } from "./context/ZonasProvider";
import { HospitalesProvider } from "./context/HospitalesProvider";
import { DoctoresProvider } from "./context/DoctoresProvider";
import { RazonSocialProvider } from "./context/RazonSocialProvider";
import { MaterialApoyoProvider } from "./context/MaterialApoyoProvider";
import { ProgramacionProvider } from "./context/ProgramacionProvider";
import { MiembrosEquipoProvider } from "./context/MiembrosEquipoProvider";
import { LocacionProvider } from "./context/LocacionProvider";


function App() {
  const { actualizarAuth } = useAuth();
  const { setNotificaciones, notificaciones } = useNotificaciones();
  
  //Notificaciones SSE
  const [eventSource, setEventSource] = useState(null);
  
  const handleSSEMessage = useCallback((event) => {
    const data = JSON.parse(event.data);
    setNotificaciones(prevNotificaciones => [...prevNotificaciones, data]);
  }, [setNotificaciones]);

  const conectarSSE = useCallback(() => {
    const token = localStorage.getItem('neurospinetoken');
    if (!token) return;

    const nuevoEventSource = new EventSource(`http://localhost:4000/events`, {
      withCredentials: false
    });

    nuevoEventSource.onopen = () => {
      console.log('Conectado al servidor SSE');
    }
    
    nuevoEventSource.onmessage = handleSSEMessage;

    nuevoEventSource.onerror = () => {
      console.log('Error al conectar con el servidor SSE');
      nuevoEventSource.close();
      setTimeout(conectarSSE, 5000); // Intenta reconectar después de 5 segundos
    }

    setEventSource(nuevoEventSource);
  }, [handleSSEMessage]);
  
  useEffect(() => {
    const token = localStorage.getItem('neurospinetoken');
    if(!token) return;

    conectarSSE();
    
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [conectarSSE, eventSource]);

  useEffect(() => {
    if(notificaciones && notificaciones.length > 0){
      const ultimaNotificacion = notificaciones[notificaciones.length - 1];
      actualizarAuth(ultimaNotificacion);
    }
  }, [notificaciones, actualizarAuth]);
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificacionesProvider>
          <HospitalesProvider>
          <ProductosProvider>
            <MaterialApoyoProvider>
              <LocacionProvider>
                <Routes>
                  <Route path="/" element={<AuthLayout/>}>
                  <Route index element={<Login/>}/>
                  <Route path="registrar" element={<Registrar/>}/>
                  <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
                  <Route path="olvide-password" element={<OlvidePassword/>}/>
                  <Route path="nuevo-password/:token" element={<NuevoPassword/>}/>
                  <Route path="perfil/:token" element={<Perfil/>}/>
                </Route>
                
                <Route path="/inicio" element={
                  <ZonasProvider>
                    <RutaProtegida />
                  </ZonasProvider>}
                >
                  <Route index element={<Inicio />}/>
                </Route>

                <Route path="/inventario" element={
                  <ZonasProvider>
                    <RutaProtegida />
                  </ZonasProvider>}
                >
                  <Route index element={<Inventario />}/>
                  <Route path="agregar-material" element={<AgregarProducto/>}/>
                  <Route path="producto/:id" element={<Producto/>}/>
                  <Route path="editar-material/:id" element={<EditarProducto/>}/>
                  <Route path="material-apoyo/:id" element={<MaterialApoyo/>}/>
                </Route>

                <Route path="/programacion" element={
                  <ZonasProvider>
                    <RazonSocialProvider>
                      <ProgramacionProvider>
                        <RutaProtegida />
                      </ProgramacionProvider>
                    </RazonSocialProvider>
                  </ZonasProvider>} 
                >
                  <Route index element={<Programaciones />}/>
                  <Route path="agregar-programacion" element={<AgregarProgramacion/>}/>
                  <Route path=":id" element={<Programacion/>}/>
                </Route>

                <Route path="/zonas" element={
                  <ZonasProvider>
                    <RutaProtegida />
                  </ZonasProvider>} 
                >
                  <Route index element={<Zonas />}/>
                  <Route path="/zonas/agregar" element={<AgregarZona/>}/>
                  <Route path="/zonas/:id" element={<Zona/>}/>
                  <Route path="/zonas/agregar-hospital/:id" element={<AgregarHospital/>}/>
                </Route>

                <Route path="/hospital" element={
                  <ZonasProvider>
                    <DoctoresProvider>
                      <RutaProtegida />
                    </DoctoresProvider>
                  </ZonasProvider>
                }>
                  <Route index element={<Zonas />}/>
                  <Route path="/hospital/:id" element={<Hospital/>}/>
                  <Route path="/hospital/:id/agregar-doctor" element={<AgregarDoctor/>}/>
                  <Route path="/hospital/:hospital/doctor/:id" element={<Doctor/>}/>
                </Route>

                <Route path="/razon-social" element={
                  <ZonasProvider>
                    <RazonSocialProvider>
                      <RutaProtegida />
                    </RazonSocialProvider>
                  </ZonasProvider>
                }>
                  <Route index element={<RazonesSociales/>}/>
                  <Route path=":id" element={<RazonSocial/>}/>
                  <Route path="agregar-razon-social" element={<AgregarRazonSocial/>}/>
                </Route>

                <Route path="/equipo" element={
                  <ZonasProvider>
                    <MiembrosEquipoProvider>
                      <RutaProtegida />
                    </MiembrosEquipoProvider>
                  </ZonasProvider>
                }>
                  <Route index element={<MiembrosEquipo/>}/>
                  <Route path=":id" element={<MiembroEquipo/>}/>
                  <Route path="editar/:id" element={<EditarMiembroEquipo/>}/>
                </Route>
                
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
              </LocacionProvider>
            </MaterialApoyoProvider>
          </ProductosProvider>
          </HospitalesProvider>
        </NotificacionesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
