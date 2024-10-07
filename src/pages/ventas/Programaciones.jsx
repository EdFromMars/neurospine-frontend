import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import useProgramacion from "../../hooks/useProgramacion";
import ProgramacionCard from "../../components/ventas/ProgramacionCard";
import { isPast, isToday, isFuture, parseISO } from "date-fns";

const Programaciones = () => {
  const { obtenerProgramaciones, programaciones } = useProgramacion();
  const [programacionesFuturas, setProgramacionesFuturas] = useState([]);
  const [programacionesActivas, setProgramacionesActivas] = useState([]);
  const [programacionesPasadas, setProgramacionesPasadas] = useState([]);

  useEffect(() => {
    obtenerProgramaciones();
  }, []);

  useEffect(() => {
    if (programaciones.length > 0) {
      const futuras = [];
      const activas = [];
      const pasadas = [];

      programaciones.forEach((programacion) => {
        const date = parseISO(programacion.fechaCirugia);
        if (isToday(date) || isFuture(date)) {
          futuras.push(programacion);
        }
        if (programacion.activa) {
          activas.push(programacion);
        }
        if (isPast(date) && !isToday(date)) {
          pasadas.push(programacion);
        }
      });

      setProgramacionesFuturas(futuras);
      setProgramacionesActivas(activas);
      setProgramacionesPasadas(pasadas);
    }
  }, [programaciones]);

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Programaciones
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            to="agregar-programacion"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Agregar Programación
            <PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-12">
        <div role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full md:w-1/2">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 p-6">Próximas</h2>
          <ul>
            {programacionesFuturas.map((programacion) => (
              <ProgramacionCard 
                key={programacion._id}
                programacion={programacion}
              />
            ))}
          </ul>
        </div>
        <div role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full md:w-1/2">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 p-6">Activas</h2>
          <ul>
            {programacionesActivas.map((programacion) => (
              <ProgramacionCard 
                key={programacion._id}
                programacion={programacion}
              />
            ))}
          </ul>
        </div>
      </div>

      <div role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full">
        <h2 className="text-xl font-semibold leading-7 text-gray-900 p-6">Programaciones Pasadas</h2>
        <ul>
          {programacionesPasadas.map((programacion) => (
            <ProgramacionCard 
              key={programacion._id}
              programacion={programacion}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Programaciones