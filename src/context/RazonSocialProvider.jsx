import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const RazonSocialContext = createContext();

export const RazonSocialProvider = ({ children }) => {
  const [razonSocial, setRazonSocial] = useState([]);
  const { auth, ejecutivo, locacion } = useAuth();

  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const obtenerRazonSocial = async (id) => {
    try {
      if(!token) return;

      if( ejecutivo ) {
        const { data } = await clienteAxios.get('/razon-social', config);
        if( !id ) {
          return data;
        }
        const razonSocialActual = await data.filter( razonSocial => razonSocial._id === id );
        return razonSocialActual;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const agregarRazonSocial = async (razonSocial) => {
    try {
      const { data } = await clienteAxios.post('/razon-social', razonSocial, config);
      setRazonSocial([...razonSocial, data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtenerRazonSocial();
  }, [auth, locacion]);

  return (
    <RazonSocialContext.Provider 
      value={{ 
        razonSocial, 
        setRazonSocial,
        obtenerRazonSocial,
        agregarRazonSocial
      }}
    >
      {children}
    </RazonSocialContext.Provider>
  )
}

export default RazonSocialContext;