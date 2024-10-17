import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMiembrosEquipo from '../../hooks/useMiembrosEquipo';
import FlatPillDot from '../ui/FlatPillDot';
import ModalAlert from '../ui/ModalAlert';
import ModalAccept from '../ui/ModalAccept';

const ListaMiembrosEquipo = ({ miembrosEquipo, zonas, locaciones }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAcceptOpen, setModalAcceptOpen] = useState(false);
  const [selectedMiembroId, setSelectedMiembroId] = useState(null);
  const { bloquearMiembro } = useMiembrosEquipo();

  const obtenerNombreZona = (zonaId) => {
    const zona = zonas.find((zona) => zona._id === zonaId);
    return zona ? zona.nombreZona : null;
  };

  const obtenerNombreLocacion = (locacionId) => {
    const locacion = locaciones.find((locacion) => locacion._id === locacionId);
    return locacion ? locacion.nombre : null;
  };

  const obtenerNombreZonas = (miembro) => {
    if(miembro.puesto !== 'vendedor') 
      return '-';
    return miembro.zonas.length > 0 ? miembro.zonas.map(zona => obtenerNombreZona(zona)).join(', ') : 'Zonas no asignadas';
  };


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
      bloquearMiembro(selectedMiembroId);
    }
    setModalOpen(false);
    setModalAcceptOpen(false);
  };

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
  
  console.log(locaciones);
  
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombre</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Puesto</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Locación</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Zonas</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estatus</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {miembrosEquipo.map((miembro) => (
            <tr key={miembro._id} className='group'>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{miembro.nombre}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{miembro.puesto ? miembro.puesto.charAt(0).toUpperCase() + miembro.puesto.slice(1) : 'Puesto no asignado'}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{miembro.locacion ? obtenerNombreLocacion(miembro.locacion) : 'Locación no asignada'}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{obtenerNombreZonas(miembro)}</td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <FlatPillDot {...(miembro.bloqueado ? statusBloqueado : statusActivo)} />
                <button 
                  type='button'
                  className="opacity-0 group-hover:opacity-100 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-8"
                  onClick={() => {
                    handleCambiarEstatus(miembro._id, miembro.bloqueado);
                  }}
                >Cambiar Estatus</button>
              </td>
              <td className="relative py-4 pl-3 text-right text-sm font-semibold flex gap-2">
                <Link 
                  to={`/equipo/${miembro._id}`}
                  type='button'
                  className="opacity-0 group-hover:opacity-100 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-8"
                >Ver Detalles</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  )
}

export default ListaMiembrosEquipo