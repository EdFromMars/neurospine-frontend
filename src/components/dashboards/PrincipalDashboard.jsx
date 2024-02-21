import { useState, useEffect } from 'react';
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

const teams = [
  { id: 1, name: 'CDMX', href: '#', initial: 'C', current: false },
  { id: 2, name: 'Monterrey', href: '#', initial: 'M', current: false },
]



const PrincipalDashboard = () => {
  const [pathname, setPathname] = useState('');
  
  const history = useLocation();

  useEffect(() => {
    setPathname(history.pathname);
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