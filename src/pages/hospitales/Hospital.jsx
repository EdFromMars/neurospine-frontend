import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useHospitales from "../../hooks/useHospitales";
import useDoctores from "../../hooks/useDoctores";
import ContactCard from "../../components/ui/ContactCard";
import AlertaPopup from "../../components/ui/AlertaPopup";
import { PlusCircleIcon } from '@heroicons/react/20/solid';

const Hospital = () => {
  const { obtenerHospital } = useHospitales();
  const { obtenerDoctoresHospital, doctores } = useDoctores();

  const { id } = useParams();
  const [hospital, setHospital] = useState({});
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const mostrarHospital = async () => {
      const data = await obtenerHospital(id);
      setHospital(data);
    }

    const mostrarDoctores = async () => {
      const data = await obtenerDoctoresHospital(id);
    }
    
    mostrarHospital();
    mostrarDoctores();
  }, [id]);
  
  const { nombreHospital, _id } = hospital;

  return (
    <>
      <AlertaPopup
        open={open}
        setOpen={setOpen}
        titulo= 'Eliminar Zona'
        mensaje='¿Estás seguro de eliminar este Doctor? Esta acción no podrá deshacerse.'
        // accion={() => {
        //   eliminarZona(zona)
        //   navigate('/inventario')
        // }}
      />
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {nombreHospital}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
        <Link
          to={`/hospital/${_id}/agregar-doctor`}
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agregar Doctor
          <PlusCircleIcon  className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </Link>
        </div>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-8">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900 capitalize">{nombreHospital}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Información de doctores asignados a este hospital</p>
        </div>
      </div>
      {doctores.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg font-semibold text-gray-500">No hay doctores asignados a este hospital</p>
        </div>
        ) : (
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctores.map(doctor => (
              <ContactCard 
                key={doctor._id}
                id={doctor._id}
                nombre={doctor.nombreDoctor}
                email={doctor.email}
                telefono={doctor.telefono}
                horario={doctor.horario}
                hospital={id}
              />
            ))}
          </ul>
        )
      }
    </>
  )
}

export default Hospital