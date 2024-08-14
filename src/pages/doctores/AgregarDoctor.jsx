import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHospitales from "../../hooks/useHospitales";
import FormularioAgregarDoctores from "../../components/doctores/FormularioAgregarDoctores";

const AgregarDoctor = () => {

  const [hospital, setHospital] = useState({});
  const { hospitales, obtenerHospital } = useHospitales();
  const id = useParams().id;

  const {nombreHospital} = hospital;
  
  useEffect(() => {
    const mostrarHospital = async () => {
      if(hospitales.length === 0) {
        const hospitalActual = await obtenerHospital(id);
        setHospital(hospitalActual);
        return;
      }
      
      const hospitalActual = await hospitales.find(hospital => hospital._id === id);
      setHospital(hospitalActual);
    }

    mostrarHospital();
  }, []);

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Agregar Registro en {nombreHospital || '...'}
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full">
          <FormularioAgregarDoctores hospital={hospital} />
        </div>
      </div>
    </>
  )
}

export default AgregarDoctor