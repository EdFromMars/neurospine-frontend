import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import PrincipalDashboard from "../components/dashboards/PrincipalDashboard";

const RutaProtegida = () => {

  const { auth, cargando } = useAuth();

  if(cargando) return 'Cargando...';
  
  return (
    <>
      { auth?._id ? (
        <main>
          <PrincipalDashboard />
        </main>
      ) : <Navigate to='/' /> }
    </>
  )
}

export default RutaProtegida