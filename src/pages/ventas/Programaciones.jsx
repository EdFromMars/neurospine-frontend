import { Link } from "react-router-dom";
import { PlusCircleIcon  } from "@heroicons/react/20/solid";

const Programaciones = () => {
  
  return (
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
  )
}

export default Programaciones