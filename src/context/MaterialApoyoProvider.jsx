import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const MaterialApoyoContext = createContext();

export const MaterialApoyoProvider = ({ children }) => {
  const [materialesApoyo, setMaterialesApoyo] = useState([]);
  const { auth, locacion, ejecutivo, almacen, vendedor } = useAuth();

  useEffect(() => {
    obtenerMaterialesApoyo();
  }, [auth, locacion]);

  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const obtenerMaterialesApoyo = async (id) => {
    try {
      if(!token) return;
      
      if(ejecutivo || vendedor || almacen) {
        const { data } = await clienteAxios.get('/material-apoyo', {
          ...config,
          params: {
            locacion: id
          }});
        const materialPorLocacion = data.filter( producto => producto.locacion === locacion );
        setMaterialesApoyo(materialPorLocacion);
        return materialPorLocacion;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const guardarMaterialApoyo = async (materialApoyo) => {
    try {
      const { data } = await clienteAxios.post('/material-apoyo', materialApoyo, config);
      setMaterialesApoyo([...materialesApoyo, data]);
    } catch (error) {
      console.log(error);
    }
  }

  const mostrarMaterialApoyo = async (id) => {
    try {
      const { data } = await clienteAxios.get(`/material-apoyo/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const editarMaterialApoyo = async (materialApoyo) => {
    try {
      const { data } = await clienteAxios.put(`/material-apoyo/${materialApoyo._id}`, materialApoyo, config);
      const nuevoArray = materialesApoyo.map( material => material._id === materialApoyo._id ? materialApoyo : material);
      setMaterialesApoyo(nuevoArray);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarMaterialApoyo = async (id) => {
    try {
      await clienteAxios.delete(`/material-apoyo/${id}`, config);
      const nuevoArray = materialesApoyo.filter( material => material._id !== id);
      setMaterialesApoyo(nuevoArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MaterialApoyoContext.Provider value={{
      materialesApoyo,
      setMaterialesApoyo,
      obtenerMaterialesApoyo,
      guardarMaterialApoyo,
      mostrarMaterialApoyo,
      editarMaterialApoyo,
      eliminarMaterialApoyo
    }}>
      {children}
    </MaterialApoyoContext.Provider>
  )
}

export default MaterialApoyoContext;