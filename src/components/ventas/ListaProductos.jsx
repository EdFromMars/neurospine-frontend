import { Fragment } from "react";
import ComboBoxRepeater from '../ui/ComboBoxRepeater';
import { formatearDinero } from '../../helpers';
import { XCircleIcon } from "@heroicons/react/24/outline";


const ListaProductos = ({ productosProgramacion, comboBoxElements, setProductosProgramacion, productosTipoMaterial, valoresProducto, mostrarPrecio }) => {

  const calcularMonto = (index) => {
    const monto = productosProgramacion[index].cantidad * valoresProducto(productosProgramacion[index].producto, "precioEstandar") || '0';
    return formatearDinero(monto);
  }

  const eliminarProducto = (index) => {
    const newProductosProgramacion = [...productosProgramacion];
    newProductosProgramacion.splice(index, 1);
    setProductosProgramacion(newProductosProgramacion);
  }

  const renderProducto = (producto, index) => {
    if(Array.isArray(producto) && producto.length > 0){
      console.log(producto);
      return (
        <Fragment key={index}>
          <tr className='group'>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
              <ComboBoxRepeater 
                key={index}
                elementos={comboBoxElements}
                titulo={""}
                state={productosProgramacion}
                setState={setProductosProgramacion}
                posicion={index}
                propiedad={"producto"}
                productos={productosTipoMaterial}
              />
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
          {producto.map((item, index2) => {
            return (
              <Fragment key={index2}>
                <tr className='group'>
                  <td className="whitespace-nowrap py-4 pl-8 pr-3 text-sm font-medium text-gray-900">
                    <p>{item.nombreMaterial}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{valoresProducto(producto[index2]._id, "existencias") || 0}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatearDinero(mostrarPrecio(producto[index2]._id))}</td>
                </tr>
              </Fragment>
            )
          })}
        </Fragment>
      )
    } else {
      return (
        <Fragment key={index}>
          <tr className='group'>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
              <ComboBoxRepeater 
                key={index}
                elementos={comboBoxElements}
                titulo={""}
                state={productosProgramacion}
                setState={setProductosProgramacion}
                posicion={index}
                propiedad={"producto"}
                productos={productosTipoMaterial}
                />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{valoresProducto(productosProgramacion[index].producto, "existencias") || 0}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatearDinero(mostrarPrecio(productosProgramacion[index].producto))}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <input
                type='number'
                value={productosProgramacion[index].cantidad}
                min={0}
                max={valoresProducto(productosProgramacion[index].producto, "existencias") || 0}
                onChange={(e) => {
                  /* Aquí se actualiza la cantidad */
                  let newProductosProgramacion = [...productosProgramacion];
                  newProductosProgramacion[index].cantidad = e.target.value;
                  setProductosProgramacion(newProductosProgramacion);
                }}
                className="w-20 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {calcularMonto(index)}
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
        </Fragment>
      )
    }
  }
  
  return (
    <>
      {productosProgramacion.length > 0 && (Array.isArray(productosProgramacion) ? productosProgramacion : []).map((producto, index) => (
        renderProducto(producto, index)
      ))}
    </>
  )
}

export default ListaProductos