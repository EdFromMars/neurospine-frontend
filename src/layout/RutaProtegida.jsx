import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {

  const { auth, cargando } = useAuth();

  if(cargando) return 'Cargando...';
  
  return (
    <>
      <h1>RutaProtegida</h1>
      {console.log('auth:', auth)}
      { auth?._id ? <Outlet /> : <Navigate to='/' /> }
    </>
  )
}

export default RutaProtegida