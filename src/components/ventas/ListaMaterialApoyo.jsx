import { Fragment } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import ComboBoxRepeater from "../ui/ComboBoxRepeater";
import { formatearDinero } from '../../helpers';

import useMaterialApoyo from "../../hooks/useMaterialApoyo";

const ListaMaterialApoyo = ({
  tipoVenta,
  materialProgramacion,
  comboBoxElements,
  setMaterialProgramacion,
  productosTipoMaterial,
  valoresProducto,
  mostrarPrecio
}) => {
  const { materialesApoyo } = useMaterialApoyo();

  console.log(materialesApoyo);
  
  const calcularMonto = (index) => {
    const monto = materialProgramacion[index].cantidad * mostrarPrecio(materialProgramacion[index].producto) || '0';
    return formatearDinero(monto);
  }

  const eliminarProducto = (index) => {
    const newMaterialProgramacion = [...materialProgramacion];
    newMaterialProgramacion.splice(index, 1);
    setMaterialProgramacion(newMaterialProgramacion);
  }


  const renderProducto = (producto, index) => {
    return (
      <Fragment key={index}>
        <tr className='group'>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            <ComboBoxRepeater 
              key={index}
              elementos={comboBoxElements}
              titulo={""}
              state={materialProgramacion}
              setState={setMaterialProgramacion}
              posicion={index}
              propiedad={"producto"}
              productos={productosTipoMaterial}
              />
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={producto.tipoPrecio}
              onChange={(e) => {
                const newMaterial = [...materialProgramacion];
                newMaterial[index].tipoPrecio = e.target.value;
                setMaterialProgramacion(newMaterial);
              }}
            >
              <option value="renta">Renta</option>
              <option value="venta">Venta</option>
            </select>
          </td>
          <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            <fieldset>
              <div className="space-y-6 sm:flex items-center sm:space-x-10 sm:space-y-0">
                <div key="completo" className="flex items-center">
                  <input
                    checked={producto.setCompleto === 'true'}
                    id="completo"
                    name="completo"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => {producto.setCompleto = 'true'; setMaterialProgramacion([...materialProgramacion])}}
                  />
                  <label htmlFor="completo" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    Set Completo
                  </label>
                </div>
                <div key="piezas" className="flex items-center">
                  <input
                    checked={producto.setCompleto === 'false'}
                    id="piezas"
                    name="piezas"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => {producto.setCompleto = 'false'; setMaterialProgramacion([...materialProgramacion])}}
                  />
                  <label htmlFor="piezas" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    Piezas de Set
                  </label>
                </div>
              </div>
            </fieldset>
          </td>
          <td className="relative py-4 pl-3 text-right text-sm font-semibold">
            <button
              type="button"
              className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex content-center gap-2"
              onClick={() => {
                eliminarProducto(index);
              }}
            >
              <XCircleIcon className="text-gray-400 group-hover:text-indigo-600 h-8 w-8 shrink-0" />
            </button>
          </td>
        </tr>
        {producto.setCompleto === 'false' && (
          mostrarPiezasSet(producto)
        )}
      </Fragment>
    )
  }

  const mostrarPiezasSet = (producto) => {
    console.log(producto);
    let piezasSet = [];
    //Iterar dentro de los materiales de apoyo para encontrar el material por ID
    const materialSet = materialesApoyo.filter(material => material._id === producto.producto).map((material, index) => (
      piezasSet = JSON.parse(material.piezasSet),
      //Iterar dentro de las piezas del set
      piezasSet.map((pieza, index) => (
        <tr key={index}>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {pieza.nombre}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {pieza.cantidad}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {/* Se agrega el precio dependiendo del tipo de venta */}
            {tipoVenta === 'angeles' ? formatearDinero(pieza.precioAngeles) : formatearDinero(pieza.precioEstandar)}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            Cantidad
            <input 
              type="number"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              step={1}
              min={0}
              max={pieza.cantidad}
              onChange={(e) => {
                // Crear un nuevo objeto con los valores del material de apoyo
                const newMaterial = {...pieza, pedido: +e.target.value};
                // Encontrar el índice de la pieza que se está actualizando
                const index = piezasSet.findIndex(p => p.nombre === pieza.nombre);
                // Reemplazar la pieza en piezasSet con el nuevo objeto
                piezasSet[index] = newMaterial;
                // Actualizar el estado del componente si es necesario
                console.log(piezasSet);
              }}
            />
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {tipoVenta === 'angeles' ? (piezasSet.precioAngeles * piezasSet.pedido) : (piezasSet.precioEstandar * piezasSet.pedido) }
          </td>
        </tr>
      ))
    ))
    return (
      <tr className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombre</th>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Piezas</th>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Precio</th>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Cantidad</th>
                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {materialSet}
            </tbody>
          </table>
        </div>
      </tr>
    )
    
  }
  
  return (
    <>
      {materialProgramacion.length > 0 && (Array.isArray(materialProgramacion) ? materialProgramacion : []).map((producto, index) => (
        renderProducto(producto, index)
      ))}
    </>
  )
}

export default ListaMaterialApoyo