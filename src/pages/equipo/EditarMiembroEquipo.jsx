import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useMiembrosEquipo from "../../hooks/useMiembrosEquipo";
import FormularioEditarMiembroEquipo from "../../components/miembrosEquipo/FormularioEditarMiembroEquipo";

const EditarMiembroEquipo = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const { obtenerMiembro } = useMiembrosEquipo();
	

  const [miembro, setMiembro] = useState(null);

  useEffect(() => {
    if(auth.puesto === 'ejecutivo' || auth.puesto === 'administrador') {
      obtenerMiembro(id).then(setMiembro);
    } else {
      navigate('/inicio');
    }
  }, [id]);
  
  console.log(miembro);
  
  if (!miembro) return <div>Cargando...</div>;
  
  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Editar Miembro
          </h2>
        </div>
      </div>
      <FormularioEditarMiembroEquipo
        miembroInicial={ miembro }
      />
    </>
  )
}

export default EditarMiembroEquipo