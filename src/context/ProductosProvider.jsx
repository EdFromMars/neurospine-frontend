import { createContext, useState, useEffect } from "react";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [locaciones, setLocaciones] = useState([]);
  const { auth , guardarBitacora, ejecutivo, almacen, vendedor, locacion } = useAuth();

  useEffect(() => {
    obtenerProductos();
  }, [auth, locacion]);
  
  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
  
  const obtenerProductos = async (id) => {
    try {
      if(!token) return;

      const { data } = id ? await clienteAxios.get('/productos', {
        ...config,
        params: {
          locacion: id
        }
      }) : await clienteAxios.get('/productos', config);
    
      if(locacion){
        const materialPorLocacion = data.filter( producto => producto.locacion === locacion );
        setProductos(materialPorLocacion);
        return materialPorLocacion;
      } else {
        setProductos(data);
        return data;
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
    const { nombreMaterial, existencias, materialPrincipal } = producto;
    console.log(producto);
    
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

  const reservarProducto = async (id, existencias, cantidadReservar) => {
    try {
      if(!token) return;
      const { data } = await clienteAxios.put(`/productos/${id}`, { existencias: existencias - cantidadReservar, reservas: cantidadReservar }, config);
      obtenerProductos();
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarProducto = async (producto, productoActualizado) => {
    try {
      if(!token) return;
      const { data } = await clienteAxios.put(`/productos/${producto._id}`, productoActualizado, config);
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
        setProductos,
        obtenerProductos,
        guardarProducto,
        mostrarProducto,
        actualizarCantidad,
        reservarProducto,
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