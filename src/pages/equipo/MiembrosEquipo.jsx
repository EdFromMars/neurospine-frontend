import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useMiembrosEquipo from "../../hooks/useMiembrosEquipo";
import ListaMiembrosEquipo from "../../components/miembrosEquipo/ListaMiembrosEquipo";
import useZonas from "../../hooks/useZonas";
import useLocacion from "../../hooks/useLocacion";
const MiembrosEquipo = () => {
  const [locaciones, setLocaciones] = useState([]);
  const { auth } = useAuth();
  const { miembrosEquipo, obtenerMiembrosEquipo } = useMiembrosEquipo();
  const { zonas } = useZonas();
  const { obtenerLocaciones } = useLocacion();
  
  const navigate = useNavigate();
  const token = localStorage.getItem("neurospinetoken");
  
  useEffect(() => {
    if(!token) {
      navigate('/');
    }

    if (auth.puesto !== 'ejecutivo') {
      navigate('/inicio');
      return;
    }
    if(auth.puesto === 'ejecutivo') {
      obtenerMiembrosEquipo();
    }

    const fetchLocaciones = async () => {
      const locaciones = await obtenerLocaciones();
      setLocaciones(locaciones);
    }
    fetchLocaciones();
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
        <ListaMiembrosEquipo 
          miembrosEquipo={miembrosEquipo}
          zonas={zonas}
          locaciones={locaciones}
        />
      </div>
    </div>
  )
}

export default MiembrosEquipo