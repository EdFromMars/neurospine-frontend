import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const MiembrosEquipoContext = createContext();

export const MiembrosEquipoProvider = ({ children }) => {
  const [miembrosEquipo, setMiembrosEquipo] = useState([]);
  const { auth } = useAuth();
  const token = localStorage.getItem("neurospinetoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    obtenerMiembrosEquipo();
  }, []);

  const obtenerMiembrosEquipo = async () => {
    try {
      const { data } = await clienteAxios.get('/equipo/lista-usuarios', config);
      setMiembrosEquipo(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const bloquearMiembro = async (miembroId) => {
    try {
      const miembro = miembrosEquipo.find((miembro) => miembro._id === miembroId);
      const miembroBloqueado = { ...miembro, bloqueado: !miembro.bloqueado };    
      const { data } = await clienteAxios.put(`/equipo/bloquear-usuario/${miembroId}`, miembroBloqueado, config);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MiembrosEquipoContext.Provider value={{
      miembrosEquipo,
      obtenerMiembrosEquipo,
      bloquearMiembro
    }}>
      {children}
    </MiembrosEquipoContext.Provider>
  );
};

export default MiembrosEquipoContext;