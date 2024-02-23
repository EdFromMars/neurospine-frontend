import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import useProductos from '../../hooks/useProductos'
import useAuth from '../../hooks/useAuth';

import { formatearDinero } from '../../helpers';
import AgregarExistencias from '../../components/inventario/AgregarExistencias';
import AlertaPopup from '../../components/ui/AlertaPopup';

const Producto = () => {
  const [agregarExistencias, setAgregarExistencias] = useState('hidden');
  const [producto, setProducto] = useState({});  
  const [open, setOpen] = useState(false);

  const { mostrarProducto, eliminarProducto } = useProductos();
  const { auth, ejecutivo } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const obtenerProducto = async () => {
      const data = await mostrarProducto(id);
      setProducto(data);
    }
    obtenerProducto();
  },[]);
  
  const { 
    nombreMaterial,
    tipoMaterial,
    materialApoyo,
    descripcionExtendida,
    existencias,
    cantidadMin,
    cantidadMax,
    medida,
    alg,
    precioAngeles,
    precioEstandar,
    usuario
  } = producto;

  return (
    <>
      <AlertaPopup 
        open={open}
        setOpen={setOpen}
        titulo= 'Eliminar Producto'
        mensaje='¿Estás seguro de eliminar este producto? Esta acción no podrá deshacerse.'
        accion={() => {
          eliminarProducto(id, producto)
          navigate('/inventario')
        }}
      />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900 capitalize">{nombreMaterial}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Tabla de información de producto</p>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Nombre</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{nombreMaterial}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Tipo de Material</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{tipoMaterial}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">¿Es Material de Apoyo?</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 uppercase">{materialApoyo ? 'SI':'NO'}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Descripción Extendida</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{descripcionExtendida}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Existencias</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between">
                {existencias}
                <button 
                  type='button'
                  className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-8"
                  onClick={() => setAgregarExistencias('block')}
                >Agregar Existencias</button>
              </dd>
            </div>
            <AgregarExistencias
              existencias={existencias}
              cantidadMax={cantidadMax}
              agregarExistencias={agregarExistencias}
              setAgregarExistencias={setAgregarExistencias}
              producto={producto}
            />
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Cantidad Mínima</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cantidadMin}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Cantidad Máxima</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cantidadMax}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Medida</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{medida}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Clave ALG</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{alg}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Clave ALG</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{alg}</dd>
            </div>

            {ejecutivo && (
              <>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Precio Grupo Ángeles</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formatearDinero(precioAngeles)}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Precio Grupo Ángeles</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formatearDinero(precioEstandar)}</dd>
                </div>

                <div className="px-4 py-6 gap-4 grid grid-flow-col justify-end">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => { 
                      setOpen(true)
                    }}
                  >
                    Eliminar Producto
                  </button>
                  <Link
                    to={`/inventario/editar-producto/${id}`}
                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Editar Producto
                  </Link>
                </div>
              </>
            )}

          </dl>
        </div>
      </div>
    </>
  )
}

export default Producto