import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos'
import { formatearDinero } from '../helpers';

const Producto = () => {
  const [producto, setProducto] = useState({});
  const { mostrarProducto } = useProductos();

  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      const data = await mostrarProducto(id);
      setProducto(data);
      console.log(producto);
    }
    obtenerProducto();
  },[]);
  
  const { 
    nombreMaterial,
    tipoMaterial,
    materialApoyo,
    descripcionExtendida,
    existencias,
    cantidadMin,
    cantidadMax,
    medida,
    alg,
    precioAngeles,
    precioEstandar,
    usuario
  } = producto;
  
  return (
    <>
      <h1>{nombreMaterial}</h1>
      <p>{tipoMaterial}</p>
      <p>{materialApoyo}</p>
      <p>{descripcionExtendida}</p>
      <p>{existencias}</p>
      <p>{cantidadMin}</p>
      <p>{cantidadMax}</p>
      <p>{medida}</p>
      <p>{alg}</p>
      <p>{formatearDinero(precioAngeles)}</p>
      <p>{formatearDinero(precioEstandar)}</p>
      <Link to={`/inventario/editar-producto/${id}`} className="bg-blue-500 text-white p-2 rounded-md">Editar</Link>
      <Link to={`/inventario/eliminar-producto/${id}`} className="bg-red-500 text-white p-2 rounded-md">Eliminar</Link>
    </>
  )
}

export default Producto