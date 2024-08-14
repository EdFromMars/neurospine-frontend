import { useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

import useMaterialApoyo from "../../hooks/useMaterialApoyo"
import useAuth from "../../hooks/useAuth";

import { formatearDinero } from "../../helpers";
import AlertaPopup from "../../components/ui/AlertaPopup";

const MaterialApoyo = () => {
  const [materialApoyo, setMaterialApoyo] = useState({});
  const [open, setOpen] = useState(false);
  
  const { id } = useParams();
  const { ejecutivo } = useAuth();
  
  const { mostrarMaterialApoyo, eliminarMaterialApoyo } = useMaterialApoyo();

  useEffect(() => {
    const obtenerMaterialApoyo = async () => {
      const data = await mostrarMaterialApoyo(id);
      setMaterialApoyo(data);
    }

    obtenerMaterialApoyo();
  }, []);
  
  const {
    nombreMaterial,
    descripcionExtendida,
    existencias,
    medida,
    alg,
    materialPrincipal,
    precioAngeles,
    precioEstandar,
    precioRentaAngeles,
    precioRentaEstandar,
    piezasSet
  } = materialApoyo;

  let contenidoSet = [];
  
  if(piezasSet){
    contenidoSet = JSON.parse(piezasSet)
  }


  return (
    <>
      <AlertaPopup
        open={open}
        setOpen={setOpen}
        titulo='Eliminar Material de Apoyo'
        mensaje='¿Estás seguro de eliminar este material de apoyo? Esta acción no podrá deshacerse.'
        accion={() => {
          eliminarMaterialApoyo(id, materialApoyo)
          navigate('/inventario')
        }}
      />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-base font-semibold leading-7 text-gray-900 capitalize">{nombreMaterial + ' ' + (medida ? medida:'')}</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Tabla de información de producto</p>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Existencias</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between">
                {existencias}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Descripción Extendida</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{descripcionExtendida}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Clave APB</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{alg}</dd>
            </div>
            {materialPrincipal && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Material Principal</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{mostrarMaterialPrincipal(materialPrincipal)}</dd>
              </div>
            )}

            {ejecutivo && (
              <>
                <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Precio Grupo Ángeles</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{precioAngeles ? formatearDinero(precioAngeles): 'No Asignado'}</dd>
                  <dt className="text-sm font-medium text-gray-900">Precio Renta Grupo Ángeles</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{precioRentaAngeles ? formatearDinero(precioRentaAngeles): 'No Asignado'}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Precio Estándar</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{precioEstandar ? formatearDinero(precioEstandar): 'No Asignado'}</dd>
                  <dt className="text-sm font-medium text-gray-900">Precio Renta Estándar</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{precioRentaEstandar ? formatearDinero(precioRentaEstandar): 'No Asignado'}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                </div>
              </>
            )}

            <div className="px-4 py-6 sm:px-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900 capitalize">Contenido del Set</h2>
            </div>

            <div className="px-4 py-6 sm:grid sm:gap-4 sm:px-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Material</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Piezas</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio Ángeles</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio Renta Ángeles</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio Estándar</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio Renta Estándar</th>
                  </tr>
                </thead>
                  {/* <ListaProductos 
                    productosProgramacion={productosProgramacion} 
                    comboBoxElements={comboBoxElements}
                    setProductosProgramacion={setProductosProgramacion}
                    productosTipoMaterial={productosTipoMaterial}
                    valoresProducto={valoresProducto}
                    mostrarPrecio={mostrarPrecio}
                  /> */}
                  <tbody className="divide-y divide-gray-200">
                  {contenidoSet.length > 0 && (
                    contenidoSet.map((item, index) => (
                      <tr key={index} className="group">
                        <td className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{item.nombre}</td>
                        <td className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-center">{item.cantidad}</td>
                        <td className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-center">{item.precioAngeles}</td>
                        <td className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-center">{item.rentaAngeles}</td>
                        <td className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-center">{item.precioEstandar}</td>
                        <td className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-center">{item.rentaEstandar}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>

            </div>

            {ejecutivo ? (
              <>
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
                    to={`/inventario/editar-material/${id}`}
                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Editar Material
                  </Link>
                </div>
              </>
            ): (
              <>
                <div className="px-4 py-6 gap-4 grid grid-flow-col justify-end">
                  <Link
                    to={`/inventario/editar-material/${id}`}
                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Editar Material
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

export default MaterialApoyo