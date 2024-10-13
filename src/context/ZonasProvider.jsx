import { createContext, useEffect, useState } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ZonasContext = createContext();

export const ZonasProvider = ({ children }) => {
  const { auth, guardarBitacora, locacion } = useAuth();
  const [zonas, setZonas] = useState([]);
  
  const token = localStorage.getItem("neurospinetoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  
  const obtenerZonas = async () => {
    if(!auth) {
      console.log('No hay token');
      return;
    }

    if(!locacion) return;
    try {
      const { data } = await clienteAxios.get("/zonas", config);
      setZonas(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerZona = async (id) => {
    if(!auth) return;
    try {
      const { data } = await clienteAxios.get(`/zonas/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const crearZona = async (zona) => {
    try {
      const { data } = await clienteAxios.post("/zonas", zona, config);
      setZonas([...zonas, data]);
      guardarBitacora(`Se creó una zona nueva: ${data.nombreZona}`, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarZona = async (zonaEliminar) => {
    try {
      const { data } = await clienteAxios.delete(`/zonas/${zonaEliminar._id}`, config);
      const nuevasZonas = zonas.filter(zona => zona._id !== zonaEliminar._id);
      setZonas(nuevasZonas);
      guardarBitacora(`Se eliminó una zona: ${data.nombreZona}`, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtenerZonas();
  }, [auth, locacion]);

  return (
    <ZonasContext.Provider value={{
      obtenerZonas,
      obtenerZona,
      zonas,
      setZonas,
      crearZona,
      eliminarZona
    }}>
      {children}
    </ZonasContext.Provider>
  );
}

export default ZonasContext;