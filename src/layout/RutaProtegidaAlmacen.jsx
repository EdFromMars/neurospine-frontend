import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegidaAlmacen = () => {

  const { auth, cargando } = useAuth();

  if(cargando) return 'Cargando...';
   
  if(auth.puesto === 'almacen' || auth.puesto === 'ejecutivo'){
    return (
      <>
          <Header />
              <main>
                <Outlet />
              </main>
          <Footer />
      </>
    )
  } else {
    return (
      <Navigate to='/' />
    )
  }
}

export default RutaProtegidaAlmacen