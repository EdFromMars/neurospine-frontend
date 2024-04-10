import { useState, useEffect } from 'react'
import ComboBoxRepeater from '../ui/ComboBoxRepeater'

const AgregarProgramacionProductos = ({visibility, productos, productosProgramacion, setProductosProgramacion}) => {
  const [productosLength, setProductosLength] = useState(0);
  const comboBoxProductos = productos.map((item) => {
    const {nombreMaterial: nombre, _id: id} = item;
    return {nombre, id};
  });

  useEffect(() => {
    setProductosLength(productosProgramacion ? productosProgramacion.length : 0);
  }, [productosProgramacion]);

  console.log(productosLength)
  console.log(productosProgramacion)

  return (
    <div className={`space-y-12 datos-programacion ${visibility.datos}`}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Productos del Pedido</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Agrega los productos que serán parte de la programación.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <div className="mt-2">
              {productosLength > 0 && (Array.isArray(productosProgramacion) ? productosProgramacion : []).map((producto, index) => (
                <div key={index}>
                  <ComboBoxRepeater 
                    elementos={comboBoxProductos}
                    titulo={""}
                    state={productosProgramacion}
                    setState={setProductosProgramacion}
                    posicion={index}
                    propiedad={"producto"}
                  />
                </div>
              ))}
            </div>
            <div className="flex border-t border-gray-100 pt-6">
                <button 
                  type="button" 
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() => setProductosProgramacion([
                    ...(productosProgramacion || []), 
                    { catidad: 0, precio: 0, producto: '' }
                  ])}
                >
                  <span aria-hidden="true">+</span> Agregar otro producto
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgregarProgramacionProductos