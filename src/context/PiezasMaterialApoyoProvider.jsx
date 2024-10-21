import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const PiezasMaterialApoyoContext = createContext();

export const PiezasMaterialApoyoProvider = ({ children }) => {
  const [piezasMaterialApoyo, setPiezasMaterialApoyo] = useState([]);
  const { auth, locacion } = useAuth();

  useEffect(() => {
    obtenerPiezasMaterialApoyo();
  }, [auth, locacion]);

  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const obtenerPiezasMaterialApoyo = async (id) => {
    try {
      if(!token) return;
      
      const { data } = await clienteAxios.get('/piezas-material-apoyo', {
        ...config,
        params: {
          locacion: locacion,
          materialApoyo: id
        }});
      setPiezasMaterialApoyo(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const guardarPiezaMaterialApoyo = async (piezaMaterialApoyo) => {
    try {
      const { data } = await clienteAxios.post('/piezas-material-apoyo', piezaMaterialApoyo, config);
      setPiezasMaterialApoyo([...piezasMaterialApoyo, data]);
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarPiezaMaterialApoyo = async (piezaMaterialApoyo) => {
    try {
      const { data } = await clienteAxios.put(`/piezas-material-apoyo/${piezaMaterialApoyo._id}`, piezaMaterialApoyo, config);
      setPiezasMaterialApoyo(piezasMaterialApoyo.map(pieza => pieza._id === data._id ? data : pieza));
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarPiezaMaterialApoyo = async (id) => {
    try {
      await clienteAxios.delete(`/piezas-material-apoyo/${id}`, config);
      setPiezasMaterialApoyo(piezasMaterialApoyo.filter(pieza => pieza._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PiezasMaterialApoyoContext.Provider value={{
      piezasMaterialApoyo,
      obtenerPiezasMaterialApoyo,
      guardarPiezaMaterialApoyo,
      actualizarPiezaMaterialApoyo,
      eliminarPiezaMaterialApoyo
    }}>
      {children}
    </PiezasMaterialApoyoContext.Provider>
  )
}

export default PiezasMaterialApoyoContext;