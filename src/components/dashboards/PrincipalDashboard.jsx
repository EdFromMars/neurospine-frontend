import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProductos from '../../hooks/useProductos';
import useZonas from '../../hooks/useZonas';

import { Outlet, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ListBulletIcon,
  CalendarIcon,
  ChartPieIcon,
  IdentificationIcon,
  UserGroupIcon, 
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

import Header from '../Header';
import Sidebar from '../Sidebar';
import MobileSidebar from '../MobileSidebar';

import ModalSingleAction from '../ui/ModalSingleAction';

const PrincipalDashboard = () => {
  
  const { auth, locacion, setLocacion, cerrarSesion } = useAuth();
  const { obtenerLocaciones, locaciones } = useProductos();
  const { zonas } = useZonas();
  const [pathname, setPathname] = useState('');
  const [openModal, setOpenModal] = useState(true);

  const navigation = auth.puesto === 'ejecutivo' ? [
    { name: 'Inicio', href: '/inicio', icon: HomeIcon, current: false },
    { name: 'Inventario', href: '/inventario', icon: ListBulletIcon, current: false },
    { name: 'Programación', href: '/programacion', icon: IdentificationIcon, current: false },
    // { name: 'Calendario de Equipo', href: '/calendario', icon: CalendarIcon, current: false },
    { name: 'Miembros de Equipo', href: '/equipo', icon: UserGroupIcon, current: false },
    { name: 'Razón Social', href: '/razon-social', icon: BuildingOfficeIcon, current: false },
    { name: 'Reportes', href: '/reportes', icon: ChartPieIcon, current: false },
  ] : [
    { name: 'Inicio', href: '/inicio', icon: HomeIcon, current: false },
    { name: 'Inventario', href: '/inventario', icon: ListBulletIcon, current: false },
    { name: 'Programación', href: '/programacion', icon: IdentificationIcon, current: false },
    { name: 'Reportes', href: '/reportes', icon: ChartPieIcon, current: false },
  ]
  
  const almacenes = locaciones.map(locacion => {
    return {
      id: locacion._id,
      nombre: locacion.nombre,
      href: '#',
      initial: locacion.nombre.charAt(0),
      current: false
    }
  });

  const zonasLocacion = zonas.filter(zona => zona.locacion === locacion);

  const history = useLocation();
  
  useEffect(() => {
    setPathname(history.pathname);

    if(auth.puesto === 'ejecutivo') {
      obtenerLocaciones();
    }

    if(locacion === ''){
      setLocacion(auth.locacion);
    }
  },[history, auth]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>    
      {auth.bloqueado ? (
        <ModalSingleAction
          alertType="warning"
          title="Cuenta Bloqueda"
          message="Tu cuenta ha sido bloqueada, contacta al administrador"
          buttonText="Cerrar Sesión"
          open={openModal}
          setOpen={setOpenModal}
          onConfirm={cerrarSesion}
        />
      ) : (
        <div>
          {auth.puesto && (
            <>
              <MobileSidebar 
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
                navigation={navigation}
                almacenes={almacenes}
                zonas = {zonasLocacion}
                pathname={pathname}
              />

              <Sidebar 
                navigation={navigation}
                almacenes={almacenes}
                zonas = {zonasLocacion}
                pathname={pathname}
              />
            </>
          )}
          <div className="lg:pl-72">
            {auth.puesto ? (
              <>
                <Header 
                  setSidebarOpen={setSidebarOpen}
              />

                <main className="py-10">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <Outlet />
                  </div>
                </main>
              </>
            ) : (
              <ModalSingleAction 
                alertType="warning"
                title="Registro Incompleto"
                message="Solicita a un administrador completar tu registro"
                buttonText="Cerrar Sesión"
                open={openModal}
                setOpen={setOpenModal}
                onConfirm={cerrarSesion}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PrincipalDashboard