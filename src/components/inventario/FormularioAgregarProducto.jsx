import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../Alerta";
import useProductos from "../../hooks/useProductos";
import useAuth from "../../hooks/useAuth";
import AutoCompleteInput from "../ui/AutoCompleteInput";
import ToggleButton from "../ui/ToggleButton";
import ComboBoxSimple from "../ui/ComboBoxSimple";
import SelectSimple from "../ui/SelectSimple";
import { medidas } from "../../helpers";

const FormularioAgregarProducto = ( productoEditar ) => {

  const [producto, setProducto] = useState({
    nombreMaterial: '',
    tipoMaterial: 'cervical',
    materialApoyo: false,
    descripcionExtendida: '',
    existencias: 0,
    cantidadMin: 0,
    cantidadMax: 0,
    medida: '',
    alg: '',
    precioAngeles: 0,
    precioEstandar: 0,
    materialPrincipal: '',
  });

  const [materialComplementario, setMaterialComplementario] = useState(false);
  const [comboBoxNombreValue, setComboBoxNombreValue] = useState('');
  
  const { productos, guardarProducto, actualizarProducto } = useProductos();
  const { auth, locacion, setLocacion, ejecutivo } = useAuth();
  const navigate = useNavigate();
  
  const modoEdicion = productoEditar.producto?.nombreMaterial ? true : false;

  useEffect(() => {
    if(modoEdicion) {
      setProducto(productoEditar.producto);
      setLocacion(productoEditar.producto.locacion);
    }
  }, [productoEditar]);

  const [alerta, setAlerta] = useState({});

  const comboBoxElements = productos.map((item) => {
    const {nombreMaterial: label, nombreMaterial: year} = item;
    return {label, year};
  })

  const comboBoxElementsPrincipal = productos.map((item) => {
    const {nombreMaterial: nombre, _id: id} = item;
    return {nombre, id};
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      producto.nombreMaterial.trim() === '' ||
      producto.tipoMaterial.trim() === '' ||
      producto.descripcionExtendida.trim() === '' ||
      producto.existencias <= 0 ||
      producto.cantidadMin <= 0 ||
      producto.cantidadMax <= 0 ||
      producto.alg.trim() === ''
    ) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      return;
    }

    if(producto.cantidadMin >= producto.existencias) {
      setAlerta({
        error: true,
        msg: 'La cantidad mínima no puede ser mayor a las existencias'
      })
      return;
    }

    if(producto.cantidadMax < producto.existencias) {
      setAlerta({
        error: true,
        msg: 'La cantidad máxima no puede ser menor a las existencias'
      })
      return;
    }

    const productoGuardar = {
      ...producto, 
      locacion: modoEdicion ? (productoEditar.producto.locacion) : (locacion || auth.locacion), 
      usuario: auth._id
    };
        
    modoEdicion ? actualizarProducto( productoEditar.producto, productoGuardar ) : guardarProducto( productoGuardar );

    setAlerta({
      msg: 'El material se ha agregado correctamente'
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 3000);
  }
  
  const { msg } = alerta;
  
  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Datos del material</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {modoEdicion ? 'Edita los campos que necesites actualizar.' : 'Completa el formulario para agregar un nuevo material al inventario.'}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="nombre-material" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre del Material
                  </label>
                  <div className="mt-2">
                    <AutoCompleteInput 
                      elementos={comboBoxElements}
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
                      value={producto.tipoMaterial || 'cervical'}
                      onChange={e => setProducto({ ...producto, tipoMaterial: e.target.value })}
                    >
                      <option value="cervical">Cervical</option>
                      <option value="lumbar">Lumbar</option>
                    </select>
                  </div>
                </div>

                <fieldset className="col-span-full">
                  <div className="relative flex">
                    <ToggleButton 
                      enabled={producto.materialApoyo || false} 
                      setEnabled={e => setProducto({ ...producto, materialApoyo: e })}
                      title={"Es material de apoyo"}
                      copy={"Selecciona esta opción si el material será registrado como material de apoyo."}
                    />
                  </div>
                </fieldset>

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

            <div className="border-b border-gray-900/10 pb-12">
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
            
            <div className="border-b border-gray-900/10 pb-12">
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
                          onChange={e => setProducto({ ...producto, precioAngeles: e.target.value })}
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
                          onChange={e => setProducto({ ...producto, precioEstandar: e.target.value })}
                          />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Material Complementario</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <fieldset className="col-span-full">
                  <div className="relative flex">
                    <ToggleButton 
                      enabled={materialComplementario || false} 
                      setEnabled={e => {
                        setMaterialComplementario(e)
                        setProducto({...producto, materialPrincipal: ''})
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
              {modoEdicion ? 'Actualizar Material' : 'Guardar Material'}
            </button>
          </div>
        </form>
        {msg && <Alerta alerta={alerta} />}
      </div>
    </>
  )
}

export default FormularioAgregarProducto