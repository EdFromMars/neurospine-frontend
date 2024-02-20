import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import useProductos from '../../hooks/useProductos'
import useAuth from '../../hooks/useAuth';

import { formatearDinero } from '../../helpers';
import AgregarExistencias from '../../components/inventario/AgregarExistencias';

const Producto = () => {

  const [agregarExistencias, setAgregarExistencias] = useState('hidden');
  const [producto, setProducto] = useState({});  

  const { mostrarProducto, eliminarProducto } = useProductos();
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const obtenerProducto = async () => {
      const data = await mostrarProducto(id);
      setProducto(data);
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
    <div className={`mx-5 my-10 border-r-8 shadow-md px-5 py-10 rounded bg-white`}>
      <Link to={`/inventario`} className="bg-blue-500 text-white p-2 rounded-md">Regresar</Link>
      <div className="flex flex-row">
          <p className="font-bold uppercase text-gray-500">Nombre: {''}
            <span className="font-normal normal-case">{nombreMaterial}</span>
          </p>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500">Tipo de material {''}
          <span className="font-normal normal-case">{tipoMaterial}</span>
        </p>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Es material de apoyo:</p>
        <span className="font-normal normal-case">{materialApoyo ? 'Si' : 'No'}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Descripción:</p>
        <span className="font-normal normal-case">{descripcionExtendida}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Existencias:</p>
        <span className="font-normal normal-case">{existencias}</span>
      <button 
        type='button'
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setAgregarExistencias('block')}
      >Agregar Existencias</button>
      </div>
      <AgregarExistencias
        existencias={existencias}
        cantidadMax={cantidadMax}
        agregarExistencias={agregarExistencias}
        producto={producto}
      />
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Cantidad Mínima</p>
        <span className="font-normal normal-case">{cantidadMin}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Cantidad Máxima:</p>
        <span className="font-normal normal-case">{cantidadMax}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Medida:</p>
        <span className="font-normal normal-case">{medida}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Clave ALG</p>
        <span className="font-normal normal-case">{alg}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Precio Grupo Ángeles</p>
        <span className="font-normal normal-case">{formatearDinero(precioAngeles)}</span>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Precio Regular:</p>
        <span className="font-normal normal-case">{formatearDinero(precioEstandar)}</span>
      </div>
      <div className="flex gap-4">
        {auth.puesto === 'ejecutivo' && ( 
          <button 
            type='button'
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => { 
              eliminarProducto(id, producto)
              navigate('/inventario')
            }}
          >
          Eliminar Producto</button>)}
        <Link to={`/inventario/editar-producto/${id}`} className="bg-blue-500 text-white p-2 rounded-md">Editar Propiedades</Link>
      </div>
    </div>
  )
}

export default Producto