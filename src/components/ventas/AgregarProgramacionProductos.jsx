import { useState, useEffect } from 'react';
import ComboBoxRepeater from '../ui/ComboBoxRepeater';
import { formatearDinero } from '../../helpers';
import { XCircleIcon } from "@heroicons/react/24/outline";

const AgregarProgramacionProductos = ({visibility, productos, productosProgramacion, setProductosProgramacion}) => {
  const [comboBoxElements, setComboBoxElements] = useState([]);

  
  useEffect(() => {
    const productosConMenorExistencia = productos.reduce((map, producto) => {
      const {nombreMaterial: nombre, _id: id, existencias: existencias} = producto;
      
      if (!map[nombre] || existencias < map[nombre].existencias) {
        map[nombre] = {nombre, id, existencias};
      }
      
      return map;
    }, {});
    
    let comboBoxProducts = Object.values(productosConMenorExistencia);
    
    // Filtrar los productos que ya están en productosProgramacion
    comboBoxProducts = comboBoxProducts.filter(producto => {
      return !productosProgramacion.some(productoProgramacion => productoProgramacion.producto === producto.id);
    });
    
    setComboBoxElements(comboBoxProducts);
    
  }, [productos, productosProgramacion]);
  
  const valoresProducto = ( id, propiedad ) => {
    const producto = productos.find((item) => item._id === id);    
    return producto ? producto[propiedad] : '';
  }

  const mostrarPrecio = (id) => {
    if(!id) return '';
    const producto = productos.find((item) => item._id === id);
    const precio = producto.precioEstandar;
    const newProductosProgramacion = [...productosProgramacion];
    /* Aquí se actualiza el precio */
    newProductosProgramacion.find((item) => item.producto === id).precio = precio;
    /* Aquí se regresa el precio para mostrar en pantalla */
    return precio;
  }

  const calcularMonto = (index) => {
    const monto = productosProgramacion[index].cantidad * valoresProducto(productosProgramacion[index].producto, "precioEstandar") || '0';
    return formatearDinero(monto);
  }

  const eliminarProducto = (index) => {
    const newProductosProgramacion = [...productosProgramacion];
    newProductosProgramacion.splice(index, 1);
    setProductosProgramacion(newProductosProgramacion);
  }

  const materialSugerido = (producto) => {
    console.log(producto);
    console.log(comboBoxElements);
    // console.log(comboBoxElements.filter((item) => item.id === producto))
  }

  return (
    <div className={`space-y-12 datos-programacion ${visibility.datos}`}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Productos del Pedido</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Agrega los productos que serán parte de la programación.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Material</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Existencias</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cantidad</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productosProgramacion.length > 0 && (Array.isArray(productosProgramacion) ? productosProgramacion : []).map((producto, index) => (
                  <>
                    <tr key={index} className='group'>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <ComboBoxRepeater 
                          elementos={comboBoxElements}
                          titulo={""}
                          state={productosProgramacion}
                          setState={setProductosProgramacion}
                          posicion={index}
                          propiedad={"producto"}
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
                    <p>
                      {materialSugerido(valoresProducto(productosProgramacion[index].producto, "materialPrincipal"))}
                    </p>
                  </>
                ))}
              </tbody>
            </table>
            <div className="flex border-t border-gray-100 pt-6">
                <button 
                  type="button" 
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() => setProductosProgramacion([
                    /* Aquí se agrega un nuevo array vacío para prodcutosProgramacion */
                    ...(productosProgramacion || []), 
                    { cantidad: 0, precio: 0, producto: '' }
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