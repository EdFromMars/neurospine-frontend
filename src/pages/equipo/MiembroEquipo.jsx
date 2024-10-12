import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FlatPillDot from "../../components/ui/FlatPillDot";
import useMiembrosEquipo from "../../hooks/useMiembrosEquipo";
import useAuth from "../../hooks/useAuth";
import useLocacion from "../../hooks/useLocacion";

import ModalAlert from "../../components/ui/ModalAlert";
import ModalAccept from "../../components/ui/ModalAccept";

const MiembroEquipo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ejecutivo } = useAuth();
  const [miembro, setMiembro] = useState([]);
  const { obtenerMiembro, actualizarMiembro } = useMiembrosEquipo();
  const { obtenerLocaciones } = useLocacion();
  const [locaciones, setLocaciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAcceptOpen, setModalAcceptOpen] = useState(false);
  const [selectedMiembroId, setSelectedMiembroId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMiembro = async () => {
      const miembro = await obtenerMiembro(id);
      setMiembro(miembro || {});
    }
    fetchMiembro();

    if (!ejecutivo) {
      navigate('/inicio');
      return;
    }
  }, [id, obtenerMiembro]);

  useEffect(() => {
    const fetchAlmacenes = async () => {
      try {
        const locaciones = await obtenerLocaciones();
        setLocaciones(locaciones || []);
      } catch (error) {
        console.log(error);
        setLocaciones([]);
      }
    }
    fetchAlmacenes();
  }, [obtenerLocaciones]);

  const { nombre, puesto, zonas, bloqueado, email, locacion } = miembro;

  const locacionFiltrada = locaciones.filter(locacionOption => locacionOption._id === locacion)[0];
  const nombreLocacion = locacionFiltrada ? locacionFiltrada.nombre : '';

  const statusBloqueado = {
    statusBgColor: 'bg-red-100',
    statusColor: 'fill-red-400',
    statusText: 'Bloqueado',
  }

  const statusActivo = {
    statusBgColor: 'bg-green-100',
    statusColor: 'fill-green-400',
    statusText: 'Activo',
  }

  const handleCambiarEstatus = (miembroId, bloqueado) => {
    setSelectedMiembroId(miembroId);
    if (bloqueado) {
      setModalAcceptOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  const confirmarActualizacion = () => {
    if (selectedMiembroId) {
      actualizarMiembro(selectedMiembroId);
    }
    setModalOpen(false);
    setModalAcceptOpen(false);
  };
  
  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900 capitalize">Editar Miembro de Equipo</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Tabla de información del miembro de equipo</p>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Nombre</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{nombre || 'Sin nombre'}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Puesto</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{puesto || 'Sin puesto'}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email || 'Sin email'}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Locación</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{nombreLocacion || 'Sin locación'}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Zonas</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{zonas || 'Sin zonas'}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Estatus</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <FlatPillDot {...(bloqueado ? statusBloqueado : statusActivo)} />
              </dd>
            </div>
          </dl>
        </div>
          <div className="px-4 py-6 gap-4 grid grid-flow-col justify-end">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => { 
                handleCambiarEstatus(id, bloqueado)
              }}
            >
              Bloquear Miembro
            </button>
            <Link
              to={`/equipo/editar/${id}`}
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Editar Datos Miembro
            </Link>
          </div>
      </div>
      <ModalAlert 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmarActualizacion}
        title="Bloquear Miembro"
        message="¿Estás seguro de que quieres bloquear a este miembro del sistema?"
      />
      <ModalAccept
        open={modalAcceptOpen}
        onClose={() => setModalAcceptOpen(false)}
        onConfirm={confirmarActualizacion}
        title="Desbloquear Miembro"
        message="¿Estás seguro de que quieres desbloquear a este miembro del sistema?"
      />
    </>
  )
}

export default MiembroEquipo