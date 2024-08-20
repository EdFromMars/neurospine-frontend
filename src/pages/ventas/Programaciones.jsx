import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircleIcon  } from "@heroicons/react/20/solid";

import useProgramacion from "../../hooks/useProgramacion";
import ProgramacionCard from "../../components/ventas/ProgramacionCard";
import { useEffect } from "react";
import { isPast, isToday, isFuture, format } from "date-fns";

const Programaciones = () => {
  const { obtenerProgramaciones, programaciones, setProgramaciones } = useProgramacion();

  useEffect(() => {
    obtenerProgramaciones();
  }, []);
  
  const programacionesFecha = programaciones.sort((a, b) => {
    if (a.fechaCirugia < b.fechaCirugia) {
      return -1;
    }
    if (a.fechaCirugia > b.fechaCirugia) {
      return 1;
    }
    return 0;
  });

  const programacionesFuturas = programaciones.map((programacion) => {
    const date = new Date(programacion.fechaCirugia.replace(/-/g, '/'))
    if(isToday(date) || isFuture(date)){
      return programacion;
    }
  });

  const programacionesActivas = programaciones.map((programacion) => {
    const date = new Date(programacion.fechaCirugia.replace(/-/g, '/'))
    if(isPast(date) && !isToday(date)){
      return programacion;
    }
  });

  const arrayFilter = array => {
    return array.filter((item) => {
      return item !== undefined;
    });
  }
  
  programaciones.map((programacion) => {
    const date = new Date(programacion.fechaCirugia.replace(/-/g, '/'))
    console.log(date);
    console.log(isPast(date));
    console.log(isToday(date));
    console.log(isFuture(date));
  });

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
          <PlusCircleIcon  className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-1/2">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 p-6">Próximas</h2>
          <ul>
            {arrayFilter(programacionesFuturas).map((programacion) => (
              <ProgramacionCard 
              key={programacion._id}
              programacion={programacion}
              />
            ))}
          </ul>
        </div>
        <div role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-1/2">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 p-6">Activas</h2>
          <ul>
            {arrayFilter(programacionesActivas).map((programacion) => (
              <ProgramacionCard 
              key={programacion._id}
              programacion={programacion}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Programaciones