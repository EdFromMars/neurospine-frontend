import { createContext, useState, useEffect } from "react";
import ModalAlert from "../components/ui/ModalAlert";

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
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerMiembro = async (miembroId) => {
    try {
      const { data } = await clienteAxios.get(`/equipo/obtener-usuario/${miembroId}`, config);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const actualizarMiembro = async (miembroId) => {
    try {
      const miembro = miembrosEquipo.find((miembro) => miembro._id === miembroId);
      const miembroActualizado = { ...miembro, bloqueado: !miembro.bloqueado };    
      const { data } = await clienteAxios.put(`/equipo/actualizar-usuario/${miembroId}`, miembroActualizado, config);
      obtenerMiembrosEquipo();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MiembrosEquipoContext.Provider value={{
      miembrosEquipo,
      obtenerMiembrosEquipo,
      obtenerMiembro,
      actualizarMiembro
    }}>
      {children}
    </MiembrosEquipoContext.Provider>
  );
};

export default MiembrosEquipoContext;