import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDoctores from "../../hooks/useDoctores"

const Doctor = () => {
  const [currentDoctor, setCurrentDoctor] = useState({});
  const { doctores, obtenerDoctor } = useDoctores();
  const { id, hospital } = useParams();

  
  useEffect(() => {
    if(doctores === undefined || doctores.length === 0 ) {
      const mostrarDoctor = async () => {
        const data = await obtenerDoctor(id);
        setCurrentDoctor(data);
      }
      mostrarDoctor();
    }else{
      const doctor = doctores.find(doctor => doctor._id === id);
      if(doctor){
        setCurrentDoctor(doctor);
      }
    }
  }, [doctores, hospital, id]);
    
  
  const { _id, nombreDoctor, consultorio, comentarios, email, telefono, horario } = currentDoctor;
  console.log(currentDoctor);
  
  return (
    <div className="md:flex md:items-center md:justify-between mb-10">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {nombreDoctor}
        </h2>
      </div>
    </div>

  )
}

export default Doctor