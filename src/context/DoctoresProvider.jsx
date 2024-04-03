import { createContext, useState } from "react";

import clienteAxios from "../config/clienteAxios";

const DoctoresContext = createContext();

export const DoctoresProvider = ({ children }) => {

  const [doctores, setDoctores] = useState([]);

  const token = localStorage.getItem("neurospinetoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const obtenerDoctores = async (id) => {
    console.log('Obteniendo doctores');
    try {
      if (!token) return;

      const { data } = await clienteAxios.get("/doctores", config);
      setDoctores(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDoctor = async (id) => {
    try {
      const { data } = await clienteAxios.get(`/doctores/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const crearDoctor = async (doctor) => {
    try {
      const { data } = await clienteAxios.post("/doctores", doctor, config);
      setDoctores([...doctores, data]);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarDoctor = async (doctorEliminar) => {
    try {
      const { data } = await clienteAxios.delete(`/doctores/${doctorEliminar._id}`, config);
      const nuevosDoctores = doctores.filter(doctor => doctor._id !== doctorEliminar._id);
      setDoctores(nuevosDoctores);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DoctoresContext.Provider value={{ 
      doctores, 
      setDoctores,
      obtenerDoctores,
      obtenerDoctor,
      crearDoctor,
      eliminarDoctor
    }}>
      {children}
    </DoctoresContext.Provider>
  )
}

export default DoctoresContext;
