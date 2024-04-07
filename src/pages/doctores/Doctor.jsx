import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDoctores from "../../hooks/useDoctores";
import WeekCalendar from "../../components/ui/WeekCalendar";

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
  
  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {nombreDoctor}
          </h2>
        </div>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-8">
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Consultorio</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{consultorio}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Teléfono</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 uppercase">{telefono}</dd>
            </div>
            {comentarios && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Comentarios</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{comentarios}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <WeekCalendar 
          horario={horario} 
        />
      </div>
    </>
  )
}

export default Doctor