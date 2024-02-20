import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegidaVentas = () => {
  const { auth, cargando } = useAuth();

  if(cargando) return 'Cargando...';
   
  if(auth.puesto === 'vendedor' || auth.puesto === 'ejecutivo'){
    return (
      <>
          <Header />
              <main className="container mx-auto mt-10">
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

export default RutaProtegidaVentas