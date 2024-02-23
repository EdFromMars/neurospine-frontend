import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useProductos from '../../hooks/useProductos';

import { Outlet, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ListBulletIcon,
  CalendarIcon,
  ChartPieIcon,
  IdentificationIcon 
} from '@heroicons/react/24/outline';

import Header from '../Header';
import Sidebar from '../Sidebar';
import MobileSidebar from '../MobileSidebar';



const navigation = [
  { name: 'Inicio', href: '/inicio', icon: HomeIcon, current: false },
  { name: 'Inventario', href: '/inventario', icon: ListBulletIcon, current: false },
  { name: 'Programación', href: '/programacion', icon: IdentificationIcon, current: false },
  { name: 'Calendario de Equipo', href: '/calendario', icon: CalendarIcon, current: false },
  { name: 'Reportes', href: '/reportes', icon: ChartPieIcon, current: false },
]

const PrincipalDashboard = () => {
  
  const { ejecutivo } = useAuth();
  const { obtenerLocaciones, locaciones } = useProductos();
  const [pathname, setPathname] = useState('');
  
  const teams = locaciones.map(locacion => {
    return {
      id: locacion._id,
      name: locacion.nombre,
      href: '#',
      initial: locacion.nombre.charAt(0),
      current: false
    }
  });

  const history = useLocation();
  
  useEffect(() => {
    setPathname(history.pathname);

    if(ejecutivo) {
      obtenerLocaciones();
    }
    
  },[history]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>    
      <div>
        <MobileSidebar 
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          navigation={navigation}
          teams={teams}
          pathname={pathname}
        />

        <Sidebar 
          navigation={navigation}
          teams={teams}
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