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

const navigation = [
  { name: 'Inicio', href: '/inicio', icon: HomeIcon, current: false },
  { name: 'Inventario', href: '/inventario', icon: ListBulletIcon, current: false },
  { name: 'Programación', href: '/programacion', icon: IdentificationIcon, current: false },
  // { name: 'Calendario de Equipo', href: '/calendario', icon: CalendarIcon, current: false },
  { name: 'Miembros de Equipo', href: '/equipo', icon: UserGroupIcon, current: false },
  { name: 'Razón Social', href: '/razon-social', icon: BuildingOfficeIcon, current: false },
  { name: 'Reportes', href: '/reportes', icon: ChartPieIcon, current: false },
]

const PrincipalDashboard = () => {
  
  const { auth, ejecutivo, locacion, setLocacion } = useAuth();
  const { obtenerLocaciones, locaciones } = useProductos();
  const { zonas } = useZonas();
  const [pathname, setPathname] = useState('');
  
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

    if(ejecutivo) {
      obtenerLocaciones();
    }

    if(locacion === ''){
      setLocacion(auth.locacion);
    }
  },[history, auth]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>    
      <div>
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

        <div className="lg:pl-72">
          <Header 
            setSidebarOpen={setSidebarOpen}
          />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    
        

    </>
  )
}

export default PrincipalDashboard