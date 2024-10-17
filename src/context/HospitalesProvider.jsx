import { createContext, useState } from "react";

import clienteAxios from "../config/clienteAxios";

const HospitalesContext = createContext();

export const HospitalesProvider = ({ children }) => {

  const [hospitales, setHospitales] = useState([]);

  const token = localStorage.getItem("neurospinetoken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const obtenerHospitales = async (id) => {
    try {
      if (!token) return;

      if (id) {
      const { data } = await clienteAxios.get("/hospitales", {
        ...config,
        params: {
          locacion: id
        }
        });
        setHospitales(data);
      } else {
        const { data } = await clienteAxios.get("/hospitales", config);
        setHospitales(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerHospital = async (id) => {
    try {
      if (!token) return;

      const { data } = await clienteAxios.get(`/hospitales/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const crearHospital = async (hospital) => {
    try {
      if (!token) return;

      const { data } = await clienteAxios.post("/hospitales", hospital, config);
      setHospitales([...hospitales, data]);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarHospital = async (hospitalEliminar) => {
    try {
      if (!token) return;

      const { data } = await clienteAxios.delete(`/hospitales/${hospitalEliminar._id}`, config);
      const nuevosHospitales = hospitales.filter(hospital => hospital._id !== hospitalEliminar._id);
      setHospitales(nuevosHospitales);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HospitalesContext.Provider value={{ 
      hospitales, 
      setHospitales,
      obtenerHospitales, 
      obtenerHospital, 
      crearHospital, 
      eliminarHospital 
    }}>
      {children}
    </HospitalesContext.Provider>
  )
}

export default HospitalesContext;