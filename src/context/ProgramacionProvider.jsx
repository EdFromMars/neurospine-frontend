import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ProgramacionContext = createContext();

export const ProgramacionProvider = ({ children }) => {
  const [programaciones, setProgramaciones] = useState([]);

  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const obtenerProgramaciones = async () => {
    try {
      if(!token) return;

      const { data } = await clienteAxios.get('/programacion', config);
      setProgramaciones(data);
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerProgramacion = async (id) => {
    try {
      if(!token) return;

      const { data } = await clienteAxios.get(`/programacion/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const agregarProgramacion = async (programacion) => {
    try {
      if(!token) return;

      const { data } = await clienteAxios.post('/programacion', programacion, config);
      setProgramaciones([...programaciones, data]);
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarProgramacion = async (programacion) => {
    try {
      if(!token) return;

      const { data } = await clienteAxios.put(`/programacion/${programacion._id}`, programacion, config);
      const programacionesActualizadas = programaciones.map(programacion => programacion._id === data._id ? data : programacion);
      setProgramaciones(programacionesActualizadas);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarProgramacion = async (id) => {
    try {
      if(!token) return;

      await clienteAxios.delete(`/programacion/${id}`, config);
      const programacionesFiltradas = programaciones.filter(programacion => programacion._id !== id);
      setProgramaciones(programacionesFiltradas);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProgramacionContext.Provider value={{ 
      programaciones, 
      obtenerProgramaciones,
      obtenerProgramacion,
      agregarProgramacion, 
      actualizarProgramacion, 
      eliminarProgramacion 
    }}>
      {children}
    </ProgramacionContext.Provider>
  );
}

export default ProgramacionContext;