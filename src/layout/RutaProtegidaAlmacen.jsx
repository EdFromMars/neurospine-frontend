import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegidaAlmacen = () => {

  const { cargando, ejecutivo, almacen } = useAuth();

  if(cargando) return 'Cargando...';
   
  if( almacen || ejecutivo ){
    return (
      <>
        <main>
          <Outlet />
        </main>
      </>
    )
  } else {
    return (
      <Navigate to='/' />
    )
  }
}

export default RutaProtegidaAlmacen