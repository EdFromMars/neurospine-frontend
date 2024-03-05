import { Link } from "react-router-dom";
import { PlusCircleIcon  } from "@heroicons/react/20/solid";
import AgregarZonaFormulario from "../../components/zonas/AgregarZonaFormulario";

const AgregarZona = () => {
  
  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Agregar Zona
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full">
          <AgregarZonaFormulario />
        </div>
      </div>
    </>
  )
}

export default AgregarZona