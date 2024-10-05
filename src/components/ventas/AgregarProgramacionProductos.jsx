import { useState, useEffect } from 'react';

import ListaProductos from './ListaProductos';
import ListaMaterialApoyo from './ListaMaterialApoyo';

const AgregarProgramacionProductos = ({
  enabledProductos, 
  productos, 
  materialesApoyo, 
  productosProgramacion, 
  setProductosProgramacion, 
  programacion, 
  materialApoyoProgramacion, 
  setMaterialApoyoProgramacion
}) => {
  const [comboBoxProductos, setComboBoxProductos] = useState([]);
  const [materialApoyoComboBox, setMaterialApoyoComboBox] = useState([]);
  const tipoMaterial = programacion.tipoCirugia;
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
    
    let materialApoyoFiltrar = materialesApoyo.map(material => {
      return {
        nombre: material.nombreMaterial,
        id: material._id,
        existencias: material.existencias,
        multiple: false,
      }
    })
    let comboBoxMaterialApoyo = Object.values(materialApoyoFiltrar);

    // Filtrar los productos que ya están seleccionados
    const filtrarRepetidos = (arregloOriginal, arregloProgramacion) => {
      return arregloOriginal.filter(producto => {
        return !arregloProgramacion.some(productoProgramacion => {
          if(Array.isArray(productoProgramacion)){
            return productoProgramacion[0].nombreMaterial === producto.nombre;
          }
          return productoProgramacion.producto === producto.id;
        });
      })
    }
    
    setComboBoxProductos(filtrarRepetidos(comboBoxProducts, productosProgramacion));
    setMaterialApoyoComboBox(filtrarRepetidos(comboBoxMaterialApoyo, materialApoyoProgramacion));
    
  }, [productos, productosProgramacion, materialesApoyo, materialApoyoProgramacion, tipoMaterial]);
  
  const valoresProducto = ( id, propiedad ) => {
    const producto = productos.find((item) => item._id === id) ? productos.find((item) => item._id === id) : materialesApoyo.find((item) => item._id === id);
    return producto ? producto[propiedad] : '';
  }

  const mostrarPrecio = (id) => {
    if(!id) return '';
    let precio = '';
    const tipoProgramacion = programacion.tipoProgramacion;
    const tipoVenta = programacion.tipoVenta;
    const precioGrupoAngeles = programacion.precioGrupoAngeles;
    const producto = productos.find((item) => item._id === id) || materialesApoyo.find((item) => item._id === id); 

    /*Validar tipo de programación y tipo de venta para mostrar el precio correcto*/
    if(tipoVenta === 'angeles' || precioGrupoAngeles === true){
      precio = producto.precioAngeles;
    } else if(tipoProgramacion === 'demostracion' || tipoVenta === 'directa'){
      precio = producto.precioEstandar;
    } else {
      precio = productosProgramacion.find(producto => producto.producto === id).precio || materialProgramacion.find(producto => producto.producto === id).precio || '';
    }
    
    const newProductos = [...productos].concat([...materialesApoyo]);
    /* Aquí se actualiza el precio */
    newProductos.find((item) => item._id === id).precio = precio;

    [...productosProgramacion].forEach((producto) => {
      if(producto.producto === id){
        producto.precio = precio;
      }
    });
    [...materialApoyoProgramacion].forEach((producto) => {
      if(producto.producto === id){
        producto.precio = precio;
      }
    });
    
    /* Aquí se regresa el precio para mostrar en pantalla */
    return precio;
  }

  return (
    <div className={`space-y-12 datos-programacion ${enabledProductos}`}>
      <div className="mt-10 border-b border-gray-900/10 pb-12 w-full">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Productos y Material de Apoyo</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Agrega los productos que serán parte de la programación.
        </p>

        <div className="mt-2 mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Producto</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Existencias</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cantidad</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <ListaProductos 
                  tipoVenta={programacion.tipoVenta}
                  productosProgramacion={productosProgramacion} 
                  comboBoxElements={comboBoxProductos}
                  setProductosProgramacion={setProductosProgramacion}
                  productosTipoMaterial={productosTipoMaterial}
                  valoresProducto={valoresProducto}
                  mostrarPrecio={mostrarPrecio}
                  programacion={programacion}
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
                  { cantidad: 0, precio: 0, producto: '' }
                ])}
              >
                <span aria-hidden="true">+</span> Agregar otro producto
              </button>
            </div>
          </div>
        </div>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          Agrega el material de apoyo que será incluido en la programación.
        </p>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Material de apoyo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <ListaMaterialApoyo 
                  tipoVenta={programacion.tipoVenta}
                  materialProgramacion={materialApoyoProgramacion} 
                  comboBoxElements={materialApoyoComboBox}
                  setMaterialProgramacion={setMaterialApoyoProgramacion}
                  productosTipoMaterial={productosTipoMaterial}
                  materialesApoyo={materialesApoyo}
                  materialApoyoProgramacion={materialApoyoProgramacion}
                  valoresProducto={valoresProducto}
                  mostrarPrecio={mostrarPrecio}
                  programacion={programacion}
                />
              </tbody>
            </table>
            <div className="flex border-t border-gray-100 pt-6">
              <button 
                type="button" 
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setMaterialApoyoProgramacion([
                  /* Aquí se agrega un nuevo array vacío para productosProgramacion */
                  ...(materialApoyoProgramacion || []), 
                  { cantidad: 0, precio: 0, producto: '', materialPrincipal: '', setCompleto: true}
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