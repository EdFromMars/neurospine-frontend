import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const MiembrosEquipoContext = createContext();

export const MiembrosEquipoProvider = ({ children }) => {
  const [miembrosEquipo, setMiembrosEquipo] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    obtenerMiembrosEquipo();
  }, []);

  const obtenerMiembrosEquipo = async () => {
    try {
      const { data } = await clienteAxios.get('/lista-usuarios', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setMiembrosEquipo(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MiembrosEquipoContext.Provider value={{
      miembrosEquipo,
      obtenerMiembrosEquipo
    }}>
      {children}
    </MiembrosEquipoContext.Provider>
  );
};

export default MiembrosEquipoContext;