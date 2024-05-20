import { useState, useEffect } from 'react';
import { formatearDinero } from '../../helpers';

import ListaProductos from './ListaProductos';

const AgregarProgramacionProductos = ({enabledProductos, productos, productosProgramacion, setProductosProgramacion, programacion}) => {
  const [comboBoxElements, setComboBoxElements] = useState([]);
  const tipoMaterial = programacion.tipoMaterial;
  const productosTipoMaterial = productos.filter(producto => producto.tipoMaterial === tipoMaterial);
    
  useEffect(() => {    
    const productosConMenorExistencia = productosTipoMaterial.reduce((map, producto) => {
      const {nombreMaterial: nombre, _id: id, existencias, materialPrincipal } = producto;
      
      if (!map[nombre]) {
        map[nombre] = {nombre, id, existencias, materialPrincipal, multiple: false};
      }else if (map[nombre] && existencias < map[nombre].existencias){
        map[nombre] = {nombre, id, existencias, materialPrincipal, multiple: true};
      }
      return map;
    }, {});
    
    let comboBoxProducts = Object.values(productosConMenorExistencia);
    
    // Filtrar los productos que ya están en productosProgramacion
    comboBoxProducts = comboBoxProducts.filter(producto => {
      return !productosProgramacion.some(productoProgramacion => {
        /* Validar si productoProgramacion es un array o un objeto */
        if(Array.isArray(productoProgramacion)){
          return productoProgramacion[0].nombreMaterial === producto.nombre;
        }
        return productoProgramacion.producto === producto.id;
      });
    });

    
    setComboBoxElements(comboBoxProducts);
    
  }, [productos, productosProgramacion, tipoMaterial]);
  
  const valoresProducto = ( id, propiedad ) => {
    const producto = productos.find((item) => item._id === id);    
    return producto ? producto[propiedad] : '';
  }

  const mostrarPrecio = (id, productoParent) => {
    if(!id) return '';
    let precio = '';
    console.log(productoParent);
    console.log(id);
    const tipoProgramacion = programacion.tipoProgramacion;
    const tipoVenta = programacion.tipoVenta;
    const producto = productos.find((item) => item._id === id);

    /*Validar tipo de programación y tipo de venta para mostrar el precio correcto*/
    if(tipoProgramacion === 'demostracion' || tipoVenta === 'directa'){
      precio = producto.precioEstandar;
    } else if(tipoVenta === 'angeles'){
      precio = producto.precioAngeles;
    } else {
      precio = '';
    }
    
    const newProductos = [...productos];
    
    /* Aquí se actualiza el precio */
    newProductos.find((item) => item._id === id).precio = precio;
    
    /* Aquí se regresa el precio para mostrar en pantalla */
    return precio;
  }

  return (
    <div className={`space-y-12 datos-programacion ${enabledProductos}`}>
      <div className="mt-10 border-b border-gray-900/10 pb-12 w-full">
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
                <ListaProductos 
                  productosProgramacion={productosProgramacion} 
                  comboBoxElements={comboBoxElements}
                  setProductosProgramacion={setProductosProgramacion}
                  productosTipoMaterial={productosTipoMaterial}
                  valoresProducto={valoresProducto}
                  mostrarPrecio={mostrarPrecio}
                />
              </tbody>
            </table>
            <div className="flex border-t border-gray-100 pt-6">
              <button 
                type="button" 
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setProductosProgramacion([
                  /* Aquí se agrega un nuevo array vacío para productosProgramacion */
                  ...(productosProgramacion || []), 
                  { cantidad: 0, precio: 0, producto: '', materialPrincipal: ''}
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