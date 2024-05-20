import { useEffect, useState } from "react";
import AutoCompleteInput from "../ui/AutoCompleteInput";
import PiezasSet from "./PiezasSet";

const MaterialApoyo = ({ materialApoyo, setMaterialApoyo, comboBoxElements, ejecutivo }) => {
  const [piezasSet, setPiezasSet] = useState([{ 
    nombre: '', 
    cantidad: 0, 
    precioAngeles: 0, 
    precioEstandar: 0,
    rentaAngeles: 0,
    rentaEstandar: 0
  }]);

  useEffect(() => {
    setMaterialApoyo({ ...materialApoyo, piezasSet: piezasSet });
  }, [piezasSet]);
  
  return (
    <div className="pb-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="nombre-material" className="block text-sm font-medium leading-6 text-gray-900">
            Nombre del Set de Material
          </label>
          <div className="mt-2">
            <AutoCompleteInput 
              elementos={comboBoxElements}
              initialValue={materialApoyo.nombreMaterial}
              state={materialApoyo}
              setState={setMaterialApoyo}
              propiedad={"nombreMaterial"}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="existencias" className="block text-sm font-medium leading-6 text-gray-900">
            Existencias
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="existencias"
              id="existencias"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={materialApoyo.existencias || 0}
              onChange={e => setMaterialApoyo({ ...materialApoyo, existencias: (+e.target.value) })}
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="tipo-material" className="block text-sm font-medium leading-6 text-gray-900">
            Tipo de Material
          </label>
          <div className="mt-2">
            <select
              id="tipo-material"
              name="tipo-material"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={materialApoyo.tipoMaterial || 'cervical'}
              onChange={e => setMaterialApoyo({ ...materialApoyo, tipoMaterial: e.target.value })}
            >
              <option value="cervical">Cervical</option>
              <option value="lumbar">Lumbar</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="nombre-material" className="block text-sm font-medium leading-6 text-gray-900">
            Clave ALG
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="alg"
              id="alg"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={materialApoyo.alg || ''}
              onChange={e => setMaterialApoyo({ ...materialApoyo, alg: e.target.value })}
            />
          </div>
        </div>

        {ejecutivo && (
          <>
            <div className="sm:col-span-2">
              <label htmlFor="precio-ga" className="block text-sm font-medium leading-6 text-gray-900">
                Precio Grupo Ángeles
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="precio-ga"
                  id="precio-ga"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={materialApoyo.precioAngeles || 0}
                  onChange={e => setMaterialApoyo({ ...materialApoyo, precioAngeles: (+e.target.value) })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="precio-estandar" className="block text-sm font-medium leading-6 text-gray-900">
                Precio Estándar
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="precio-estandar"
                  id="precio-estandar"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={materialApoyo.precioEstandar || 0}
                  onChange={e => setMaterialApoyo({ ...materialApoyo, precioEstandar: (+e.target.value) })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="precio-renta-ga" className="block text-sm font-medium leading-6 text-gray-900">
                Precio Renta Grupo Ángeles
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="precio-renta-ga"
                  id="precio-renta-ga"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={materialApoyo.precioRentaAngeles || 0}
                  onChange={e => setMaterialApoyo({ ...materialApoyo, precioRentaAngeles: (+e.target.value) })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="precio-renta-estandar" className="block text-sm font-medium leading-6 text-gray-900">
                Precio Renta Estándar
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="precio-renta-estandar"
                  id="precio-renta-estandar"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={materialApoyo.precioRentaEstandar || 0}
                  onChange={e => setMaterialApoyo({ ...materialApoyo, precioRentaEstandar: (+e.target.value) })}
                />
              </div>
            </div>
          </>  
        )}
        
        <div className="col-span-full">
          <label htmlFor="descripcion-extendida" className="block text-sm font-medium leading-6 text-gray-900">
            Descripción Extendida
          </label>
          <div className="mt-2">
            <textarea
              id="descripcion-extendida"
              name="descripcion-extendida"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={materialApoyo.descripcionExtendida || ''}
              onChange={e => setMaterialApoyo({ ...materialApoyo, descripcionExtendida: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Registrar contenido del set</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Agrega las piezas que conforman el set, así como la cantidad que lleva de cada pieza.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <table className="w-full divide-y divide-gray-300 col-span-6">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Material</th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Cantidad</th>
                {ejecutivo && (
                  <>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Precio Ángeles</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Precio Estándar</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Renta Ángeles</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Renta Estándar</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Aquí se mapean las piezas del set */
              piezasSet.map((pieza, index) => {
                return (
                  <PiezasSet 
                    key={index}
                    pieza={pieza}
                    index={index}
                    piezasSet={piezasSet}
                    setPiezasSet={setPiezasSet}
                    ejecutivo={ejecutivo}
                  />
                )
              })
              }
            </tbody>
          </table>
          <div className="flex border-t border-gray-100 pt-6 col-span-6">
            <button 
              type="button" 
              className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={e => {
                e.preventDefault();
                setPiezasSet([
                  ...piezasSet,
                  { nombre: '', cantidad: 0, precio: 0 }
                ])
              
              }}
            >
              <span aria-hidden="true">+</span> Agregar otra pieza
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialApoyo