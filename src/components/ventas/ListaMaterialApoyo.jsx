import { Fragment } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import ComboBoxRepeater from "../ui/ComboBoxRepeater";
import { formatearDinero } from '../../helpers';
import MostrarPiezasSet from "./MostrarPiezasSet";
import useMaterialApoyo from "../../hooks/useMaterialApoyo";

const ListaMaterialApoyo = ({
  materialProgramacion,
  setMaterialProgramacion,
  comboBoxElements,
  productosTipoMaterial,
  formatearDinero,
  mostrarPrecio,
  tipoVenta
}) => {
  const { materialesApoyo } = useMaterialApoyo();
  
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
    console.log('materialProgramación:', index, materialProgramacion[index]);
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
              className="block w-full pl-3 pr-10 py-2 mt-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <fieldset>
              <div className="space-y-6 sm:flex text-center items-center content-center sm:space-x-10 sm:space-y-0">
                <div key="completo" className="flex items-center self-center">
                  <input
                    checked={materialProgramacion[index].setCompleto === true}
                    id="completo"
                    name="completo"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => {
                      producto.setCompleto = true; 
                      setMaterialProgramacion([...materialProgramacion])
                    }}
                  />
                  <label htmlFor="completo" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    Set Completo
                  </label>
                </div>
                <div key="piezas" className="flex items-center self-center">
                  <input
                    checked={materialProgramacion[index].setCompleto === false}
                    id="piezas"
                    name="piezas"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => {
                      producto.setCompleto = false; 
                      setMaterialProgramacion([...materialProgramacion])
                    }}
                  />
                  <label htmlFor="piezas" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    Piezas
                  </label>
                </div>
              </div>
            </fieldset>
          </td>
          {producto.setCompleto === true && (
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              Costo
          </td>
          )}
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
        {producto.setCompleto === false && (
          <tr>
            <td colSpan="4">
              <table className="w-full">
                <tbody>
                  <MostrarPiezasSet
                    producto={producto}
                    materialesApoyo={materialesApoyo}
                    materialProgramacion={materialProgramacion}
                    tipoVenta={tipoVenta}
                    formatearDinero={formatearDinero}
                  />
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </Fragment>
    )
  }
  
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Tipo Precio</th>
          <th>Tipo de Venta</th>
          <th>Costo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {materialProgramacion.map((producto, index) => renderProducto(producto, index))}
      </tbody>
    </table>
  );
}

export default ListaMaterialApoyo;