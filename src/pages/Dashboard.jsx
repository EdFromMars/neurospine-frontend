import { useState } from 'react';
import { 
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

import useAuth from "../hooks/useAuth"

import AlmacenDashboard from "./dashboards/AlmacenDashboard";
import VendedorDashboard from "./dashboards/VendedorDashboard";
import EjecutivoDashboard from "./dashboards/EjecutivoDashboard";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';

const navigation = [
  { name: 'Inicio', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendario', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documentos', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reportes', href: '#', icon: ChartPieIcon, current: false },
]

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { auth } = useAuth();
  const { puesto } = auth;

  const DashboardDisplay = ( puesto ) => {
    if(puesto === 'almacen'){
      return <AlmacenDashboard />
    } else if(puesto === 'vendedor'){
      return <VendedorDashboard />
    } else {
      return <EjecutivoDashboard />
    }
  }
  
  return (
    <>
      <div>
        <MobileSidebar 
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          navigation={navigation}
          teams={teams}
        />

        <Sidebar 
          navigation={navigation}
          teams={teams}
        />

        <div className="lg:pl-72">
          <Header 
            setSidebarOpen={setSidebarOpen}
          />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {DashboardDisplay(puesto)}
            </div>
          </main>
        </div>
      </div>
    
        

    </>
  )
}

export default Dashboard