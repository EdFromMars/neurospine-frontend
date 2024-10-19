import { useEffect, useState } from "react";
import AutoCompleteInput from "../ui/AutoCompleteInput";
import PiezasMaterialApoyo from "./PiezasMaterialApoyo";

const MaterialApoyo = ({ materialApoyo, setMaterialApoyo, comboBoxElements, ejecutivo }) => {
  const [nuevaPiezaSet, setNuevaPiezaSet] = useState([{ 
    nombre: '', 
    cantidad: 0, 
    precioAngeles: 0, 
    precioEstandar: 0,
    rentaAngeles: 0,
    rentaEstandar: 0
  }]);

  console.log(nuevaPiezaSet);
  
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
            Clave APB
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

      <div className="col-span-full mt-10 border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Registrar contenido del set</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Agrega las piezas que conforman el set, así como la cantidad que lleva de cada pieza.</p>

        <div className="mt-10 space-y-2">
          <div className="sticky top-14 bg-white border-b border-gray-900/10 grid grid-cols-9 gap-4 items-center pt-4">
            <div className="col-span-3 font-semibold text-sm text-gray-900">Material</div>
            <div className="col-span-1 font-semibold text-sm text-gray-900">Cantidad</div>
            {ejecutivo && (
              <>
                <div className="col-span-1 font-semibold text-sm text-gray-900">Precio Ángeles</div>
                <div className="col-span-1 font-semibold text-sm text-gray-900">Precio Estándar</div>
                <div className="col-span-1 font-semibold text-sm text-gray-900">Renta Ángeles</div>
                <div className="col-span-1 font-semibold text-sm text-gray-900">Renta Estándar</div>
              </>
            )}
            <div className="col-span-1"></div>
          </div>
          {nuevaPiezaSet.map((pieza, index) => (
            <PiezasMaterialApoyo 
              key={index}
              pieza={pieza}
              index={index}
              piezasSet={nuevaPiezaSet}
              setPiezasSet={setNuevaPiezaSet}
              ejecutivo={ejecutivo}
            />
          ))}
          </div>
          <div className="flex border-t border-gray-100 pt-6">
            <button 
              type="button" 
              className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={e => {
                e.preventDefault();
                setNuevaPiezaSet([
                  ...nuevaPiezaSet,
                  { nombre: '', cantidad: 0, precioAngeles: 0, precioEstandar: 0, rentaAngeles: 0, rentaEstandar: 0 }
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
