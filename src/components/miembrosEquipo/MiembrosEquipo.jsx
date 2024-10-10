import { XCircleIcon, PencilSquareIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import useMiembrosEquipo from '../../hooks/useMiembrosEquipo';

const MiembrosEquipo = ({ miembrosEquipo, zonas }) => {
  console.log(zonas);
  console.log(miembrosEquipo);

  const { bloquearMiembro } = useMiembrosEquipo();
  const obtenerNombreZona = (locacionId) => {
    const zona = zonas.find((zona) => zona._id === locacionId);
    return zona ? zona.nombreZona : null;
  };

  const handleEditarMiembro = (miembroId) => {
    // Aquí puedes implementar la lógica para asignar una zona
    console.log(`Editar miembro con ID: ${miembroId}`);
  };

  const handleBloquearMiembro = (miembroId) => {
    bloquearMiembro(miembroId);
  };

  const handleEliminarMiembro = (miembroId) => {
    console.log(`Eliminar miembro con ID: ${miembroId}`);
  };
  
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombre</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Puesto</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Zonas</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estatus</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {miembrosEquipo.map((miembro) => (
            <tr key={miembro._id} className='group'>
              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{miembro.nombre}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{miembro.puesto.charAt(0).toUpperCase() + miembro.puesto.slice(1)}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{zonas.find((zona) => zona._id === miembro.locacion)?.nombreZona || 'Zona no asignada'}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{miembro.bloqueado ? 'Bloqueado' : 'Activo'}</td>
              <td className="relative py-4 pl-3 text-right text-sm font-semibold flex gap-2">
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex content-center gap-2"
                  onClick={() => {
                    handleEditarMiembro(miembro._id);
                  }}
                >
                  <PencilSquareIcon className="text-indigo-600 group-hover:text-indigo-900 h-6 w-6 shrink-0" />
                </button>
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex content-center gap-2"
                  onClick={() => {
                    handleBloquearMiembro(miembro._id);
                  }}
                >
                  <LockClosedIcon className="text-indigo-600 group-hover:text-indigo-900 h-6 w-6 shrink-0" />
                </button>
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex content-center gap-2"
                  onClick={() => {
                    handleEliminarMiembro(miembro._id);
                  }}
                >
                  <XCircleIcon className="text-red-600 group-hover:text-red-500 h-6 w-6 shrink-0" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MiembrosEquipo