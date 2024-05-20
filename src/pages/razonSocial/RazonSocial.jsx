import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useRazonSocial from "../../hooks/useRazonSocial"
import { useEffect } from "react";

const RazonSocial = () => {
  const [razonSocial, setRazonSocial] = useState([]);
  const { obtenerRazonSocial } = useRazonSocial();
  const { id } = useParams();

  useEffect(() => {
    const mostrarRazonSocial = async () => {
      const data = await obtenerRazonSocial(id);
      setRazonSocial(data);
    }
    mostrarRazonSocial();
  }, [id]);

  console.log(razonSocial);
  const { nombre, rfc, email, telefono, direccion, _id } = razonSocial[0] || [];
  
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900 capitalize">{nombre}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Tabla de información</p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Nombre</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{nombre}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">RFC</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rfc}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Teléfono</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{telefono}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 uppercase">{email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Dirección</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{direccion}</dd>
          </div>

          <div className="px-4 py-6 gap-4 grid grid-flow-col justify-end">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => { 
                setOpen(true)
              }}
            >
              Eliminar Material
            </button>
            <Link
              to={`/razon-social/editar/${_id}`}
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Editar Material
            </Link>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default RazonSocial