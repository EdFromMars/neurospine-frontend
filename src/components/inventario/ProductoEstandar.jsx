import AutoCompleteInput from "../ui/AutoCompleteInput";
import ComboBoxSimple from "../ui/ComboBoxSimple";
import SelectSimple from "../ui/SelectSimple";
import { medidas } from "../../helpers";

const ProductoEstandar = ({producto, setProducto, comboBoxElements, ejecutivo}) => {
  return (
    <>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="nombre-material" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre del Material
            </label>
            <div className="mt-2">
              <AutoCompleteInput 
                elementos={comboBoxElements}
                initialValue={producto.nombreMaterial}
                state={producto}
                setState={setProducto}
                propiedad={"nombreMaterial"}
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="medida" className="block text-sm font-medium leading-6 text-gray-900">
              Medida
            </label>
            <div className="mt-2">
              <SelectSimple
                selectOptions={medidas}
                value={producto.medida || ''}
                onChange={(e) => setProducto({ ...producto, medida: e.target.value })}
                target={'medida'}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="tipo-material" className="block text-sm font-medium leading-6 text-gray-900">
              Tipo de Material
            </label>
            <div className="mt-2">
              <select
                id="tipo-material"
                name="tipo-material"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={producto.tipoMaterial || ''}
                onChange={e => setProducto({ ...producto, tipoMaterial: e.target.value })}
              >
                <option value="">Selecciona el tipo de material</option>
                <option value="cervical">Cervical</option>
                <option value="lumbar">Lumbar</option>
              </select>
            </div>
          </div>
          
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
                value={producto.descripcionExtendida || ''}
                onChange={e => setProducto({ ...producto, descripcionExtendida: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Registrar valores para inventario</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Agrega las existencias. La cantidad mínima y la cantidad máxima son las existencias mínimas y máximas que se deberá tener en inventario</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="existencias" className="block text-sm font-medium leading-6 text-gray-900">
              Existencias
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="existencias"
                id="existencias"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={producto.existencias || 0}
                onChange={e => setProducto({ ...producto, existencias: (+e.target.value) })}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="cantidad-min" className="block text-sm font-medium leading-6 text-gray-900">
              Cantidad Mínima
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="cantidad-min"
                id="cantidad-min"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={producto.cantidadMin || 0}
                onChange={e => setProducto({ ...producto, cantidadMin: (+e.target.value) })}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="cantidad-max" className="block text-sm font-medium leading-6 text-gray-900">
              Cantidad Máxima
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="cantidad-max"
                id="cantidad-max"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={producto.cantidadMax || 0}
                onChange={e => setProducto({ ...producto, cantidadMax: (+e.target.value) })}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div /*className="border-b border-gray-900/10 pb-12"*/>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">                
          <div className="sm:col-span-3">
            <label htmlFor="alg" className="block text-sm font-medium leading-6 text-gray-900">
              Clave ALG
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="alg"
                id="alg"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={producto.alg || ''}
                onChange={e => setProducto({ ...producto, alg: e.target.value })}
              />
            </div>
          </div>

          {ejecutivo && (
            <>
              <div className="sm:col-span-3">
                <label htmlFor="precio-angeles" className="block text-sm font-medium leading-6 text-gray-900">
                  Precio Grupo Ángeles
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="precio-angeles"
                    id="precio-angeles"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    value={producto.precioAngeles || 0}
                    onChange={e => setProducto({ ...producto, precioAngeles: +e.target.value })}
                    />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="precio-estandar" className="block text-sm font-medium leading-6 text-gray-900">
                  Precio Estándar
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="precio-estandar"
                    id="precio-estandar"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    value={producto.precioEstandar || 0}
                    onChange={e => setProducto({ ...producto, precioEstandar: +e.target.value })}
                    />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Material Complementario</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <fieldset className="col-span-full">
            <div className="relative flex">
              <ToggleButton 
                enabled={materialComplementario || false} 
                setEnabled={e => {
                  setMaterialComplementario(e)
                }}
                copy={"Selecciona esta opción para volverlo un material complementario"}
              />
            </div>
          </fieldset>

          {materialComplementario && <div className="col-span-full">
            <div className="mt-2">
              <ComboBoxSimple
                elementos={comboBoxElementsPrincipal}
                titulo={"Material Principal"}
                state={producto}
                setState={setProducto}
                propiedad={"materialPrincipal"}
              />
            </div>
          </div>}
        </div>
      </div> */}
    </>
  )
}

export default ProductoEstandar