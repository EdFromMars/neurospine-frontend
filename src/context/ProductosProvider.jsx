import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [locaciones, setLocaciones] = useState([]);
  const { auth , guardarBitacora, ejecutivo, almacen } = useAuth();

  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
  
  const obtenerProductos = async () => {
    try {
      if(!token) return;

      if(ejecutivo) {
        const { data } = await clienteAxios.get('/productos', config);
        setProductos(data);
      } else if (almacen){
        const { data } = await clienteAxios.get('/productos', config);
        const data2 = data.filter( producto => producto.locacion === auth.locacion );
        setProductos(data2);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerLocaciones = async () => {
    try {
      const { data } = await clienteAxios.get('/locaciones', config);
      setLocaciones(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    obtenerProductos();
  }, [auth]);

  const descripcionProduct = ( producto ) => {
    return {
      'Nombre del Material': producto.nombreMaterial,
      'Tipo de Material': producto.tipoMaterial,
      'Material de Apoyo': producto.materialApoyo,
      'Descripción Extendida': producto.descripcionExtendida,
      'Existencias': producto.existencias,
      'Cantidad Mínima': producto.cantidadMinima,
      'Cantidad Máxima': producto.cantidadMaxima,
      'Medida': producto.medida,
      'Clave ALG': producto.alg,
      'Precio Grupo Ángeles': producto.precioAngeles,
      'Precio Estándar': producto.precioEstandar
    }
  }
  
  const guardarProducto = async (producto) => {
    
    const { nombreMaterial, existencias } = producto;
    
    try {
      if(!token) return;
      const { data } = await clienteAxios.post('/productos', producto, config);

      const descripcion = descripcionProduct(data);
      
      guardarBitacora( `Se agregó ${nombreMaterial} con un total de ${existencias} piezas en Almacén`, descripcion );

      obtenerProductos();

    } catch (error) {
      console.log(error);
    }
  };

  const mostrarProducto = async (id) => {
    try {
      if(!token) return;
      const { data } = await clienteAxios.get(`/productos/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarCantidad = async (id, existencias, nuevasExistencias, existenciasFinales) => {
    try {
      if(!token) return;

      const { data } = await clienteAxios.put(`/productos/${id}`, { existencias: existenciasFinales }, config);

      const { nombreMaterial } = data;

      const descripcion = descripcionProduct(data)

      guardarBitacora( `Se actualizó la cantidad de ${nombreMaterial} de ${existencias} piezas, agregando ${nuevasExistencias} piezas, quedando en ${existenciasFinales} piezas en el inventario.`, descripcion );
      
      obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarProducto = async (producto, productoActualizado) => {
    try {
      if(!token) return;
      const { data } = await clienteAxios.put(`/productos/${producto._id}`, producto, config);
      obtenerProductos();

      guardarBitacora( `Se actualizaron las propiedades de ${producto.nombreMaterial}. Consulta los cambios en la bitácora`, {producto, productoActualizado});
      
    } catch (error) {
      console.log(error);
    }
  }
  
  const eliminarProducto = async (id, producto) => {
    
    try {
      await clienteAxios.delete(`/productos/${id}`, config);
      await guardarBitacora( `Se ha eliminado ${producto.nombreMaterial} del inventario.`, producto);
      
      obtenerProductos();
      
    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <ProductosContext.Provider 
      value={{
        productos,
        guardarProducto,
        mostrarProducto,
        actualizarCantidad,
        actualizarProducto,
        eliminarProducto,
        obtenerLocaciones,
        locaciones
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
};

export default ProductosContext;