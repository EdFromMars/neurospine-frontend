import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMiembrosEquipo from "../../hooks/useMiembrosEquipo";
import useAuth from "../../hooks/useAuth";
import useLocacion from "../../hooks/useLocacion";
import useZonas from "../../hooks/useZonas";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

const FormularioEditarMiembroEquipo = ({ miembroInicial }) => {
  const [ locaciones, setLocaciones ] = useState([]);
  const [ zonasLocacion, setZonasLocacion ] = useState([]);
  
  const { obtenerLocaciones } = useLocacion();
  const { zonas, obtenerZonas } = useZonas();
  const { actualizarMiembro } = useMiembrosEquipo();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [miembro, setMiembro] = useState({
    _id: miembroInicial._id || '',
    nombre: miembroInicial.nombre || '',
    email: miembroInicial.email || '',
    telefono: miembroInicial.telefono || '',
    direccion: miembroInicial.direccion || '',
    puesto: miembroInicial.puesto || '',
    locacion: miembroInicial.locacion || '',
    zonas: miembroInicial.zonas || [],
    bloqueado: miembroInicial.bloqueado || false,
    documentos: miembroInicial.documentos || [],
  });

  useEffect(() => {
    if (miembroInicial) {
      setMiembro(miembroInicial);
    }
  }, [miembroInicial]);

  useEffect(() => {
    const listaLocaciones = async () => {
      const locaciones = await obtenerLocaciones();
      setLocaciones(locaciones);
    }

    const listaZonas = async () => {
      const zonas = await obtenerZonas();
    }
    
    listaLocaciones();
    listaZonas();
  }, []);
  
  useEffect(() => {
    const zonaLocacion = zonas.filter(zona => zona.locacion === miembro.locacion);
    setZonasLocacion(zonaLocacion);
  }, [miembro.locacion]);
  
  const validar = () => {
    const camposRequeridos = ['nombre', 'telefono', 'direccion', 'puesto'];
    const camposFaltantes = camposRequeridos.filter(campo => !miembro[campo]);

    if (camposFaltantes.length > 0) {
      alert(`Los siguientes campos son obligatorios: ${camposFaltantes.join(', ')}`);
      return false;
    }

    if (miembro.puesto === 'vendedor' && miembro.zonas.length === 0) {
      alert('Un vendedor debe tener al menos una zona asignada');
      return false;
    }

    if (miembro.puesto !== 'ejecutivo' && !miembro.locacion) {
      alert('Debe seleccionar una locación para este puesto');
      return false;
    }

    return true;
  };

  const handleZonaChange = (zonaId) => {
    setMiembro(prevMiembro => {
      const nuevasZonas = prevMiembro.zonas.includes(zonaId)
        ? prevMiembro.zonas.filter(id => id !== zonaId)
        : [...prevMiembro.zonas, zonaId];      
      return {
        ...prevMiembro,
        zonas: nuevasZonas
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      console.log('Miembro a actualizar:', miembro);
      actualizarMiembro(miembro);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Datos del miembro del equipo</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Edita los campos que necesites actualizar
              </p>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-12">
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre Completo
                </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={miembro.nombre || ''}
                  onChange={e => setMiembro({ ...miembro, nombre: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <p>{miembro.email}</p>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="telefono"
                  id="telefono"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={miembro.telefono || ''}
                  onChange={e => setMiembro({ ...miembro, telefono: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="descripcion-extendida" className="block text-sm font-medium leading-6 text-gray-900">
                Dirección
              </label>  
              <div className="mt-2">
                <input 
                  type="text"
                  id="direccion"
                  name="direccion"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={miembro.direccion || ''}
                  onChange={e => setMiembro({ ...miembro, direccion: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-2">
              <label htmlFor="puesto" className="block text-sm font-medium leading-6 text-gray-900">
                Puesto
              </label>
              <div className="mt-2">
                <select
                  name="puesto"
                  id="puesto"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={miembro.puesto || ''}
                  onChange={e => setMiembro({ 
                    ...miembro, 
                    puesto: e.target.value,
                    locacion: null,
                    zonas: []
                  })}
                >
                  <option value="">Seleccione un puesto</option>
                  <option value="almacen">Almacenista</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="administrador">Administrador</option>
                  {auth.puesto === 'ejecutivo' && (
                    <option value="ejecutivo">Ejecutivo</option>
                  )}
                </select>
              </div>
            </div>
            {miembro.puesto !== 'ejecutivo' && miembro.puesto !== null && (
              <>
                <div className="sm:col-span-2">
                  <label htmlFor="locacion" className="block text-sm font-medium leading-6 text-gray-900">
                    Locación
                  </label>
                  <div className="mt-2">
                    <select 
                      name="locacion"
                      id="locacion"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={miembro.locacion || ''}
                      onChange={e => { 
                      setMiembro({ 
                        ...miembro, 
                        locacion: e.target.value,
                        zonas: []
                      });
                    }}
                    >
                      <option value="">Seleccione una locación</option>
                      {locaciones.map(locacion => (
                        <option key={locacion._id} value={locacion._id}>{locacion.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            {miembro.puesto === 'vendedor' && miembro.locacion !== null && (
              <>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Zonas - Selecciona las zonas a las que pertenece
                  </label>
                  <div className="mt-2">
                    {zonasLocacion.map(zona => (
                      <div key={zona._id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`zona-${zona._id}`}
                          checked={miembro.zonas.includes(zona._id)}
                          onChange={() => handleZonaChange(zona._id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`zona-${zona._id}`} className="ml-2 block text-sm text-gray-900">
                          {zona.nombreZona}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-12">
            <div className="col-span-full">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Documentos</h2>
              <div className="mt-2 flex items-center gap-x-3">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 border border-dashed border-gray-900/25 px-6 py-10 flex flex-col items-center justify-center col-span-full"
                >
                  <DocumentArrowUpIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                  <span>Subir Documento...</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button 
              onClick={() => { navigate(-1) }}
              type="button" 
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Actualizar Miembro
            </button>
          </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormularioEditarMiembroEquipo
