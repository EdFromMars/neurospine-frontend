import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useMiembrosEquipo from "../../hooks/useMiembrosEquipo";

const Equipo = () => {
  const { auth } = useAuth();
  const { miembrosEquipo, obtenerMiembrosEquipo } = useMiembrosEquipo();

  useEffect(() => {
    obtenerMiembrosEquipo();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="w-full">
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Miembros del Equipo
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equipo