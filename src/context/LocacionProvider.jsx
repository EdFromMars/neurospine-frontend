import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const LocacionContext = createContext();

export const LocacionProvider = ({ children }) => {
  const [locacion, setLocacion] = useState({});
  
  const { auth } = useAuth();
  const token = localStorage.getItem("neurospinetoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  const obtenerLocaciones = async () => {
    try {
      const { data } = await clienteAxios.get('/locaciones', config);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  const obtenerLocacion = async (id) => {
    try {
      const { data } = await clienteAxios.get(`/locaciones/${id}`, config);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LocacionContext.Provider value={{ 
      locacion, 
      setLocacion, 
      obtenerLocaciones, 
      obtenerLocacion
    }}>
      {children}
    </LocacionContext.Provider>
  );
}

export default LocacionContext;