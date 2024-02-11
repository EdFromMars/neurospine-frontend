import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

const Header = () => {

  const { auth } = useAuth();
  const { nombre } = auth;
  
  const firstLetter = nombre?.charAt(0).toUpperCase();
  
  return (
    <header className="py-5 border-b-2 border-gray-200">
      <div className="container mx-auto flex justify-between">
        <div className="flex">
          <Link
            to={ '/dashboard'}
          >
            <img src="/public/padfra-logo.svg" alt="Padfra"  className="w-24"/>
          </Link>
          <nav className="ml-10">
            <Link 
              to="/ordenes"
              className="mr-5"
            >Órdenes</Link>
            <Link 
              to="/inventario"
              className="mr-5"
            >Inventario</Link>
          </nav>
        </div>
        <div className="flex">
          <div>
            Notificaciones
          </div>
          <div className="ml-5" >
            <span className="block rounded-full bg-slate-700 w-8 h-8 text-center font-bold text-white">{firstLetter}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header