import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductos from '../../hooks/useProductos'
import useAuth from '../../hooks/useAuth';
import { formatearDinero } from '../../helpers';

const Producto = () => {
  const [producto, setProducto] = useState({});
  const [nuevasExistencias, setNuevasExistencias] = useState(0);
  const [existenciasFinales, setExistenciasFinales] = useState(0);
  const [agregarExistencias, setAgregarExistencias] = useState('hidden');
  
  const { mostrarProducto } = useProductos();
  const { auth } = useAuth();

  const { id } = useParams();
  
  useEffect(() => {
    const obtenerProducto = async () => {
      const data = await mostrarProducto(id);
      setProducto(data);
    }
    obtenerProducto();

    const actualizarTotal = () => {
      setExistenciasFinales(parseInt(existencias) + parseInt(nuevasExistencias) || existencias)
    }
    actualizarTotal();
  },[nuevasExistencias]);
  
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
      <div className={agregarExistencias}>
        <div className='flex flex-row'>
          <div>
            <p>Existencias actuales</p>
            <span className="font-normal normal-case">{existencias}</span>
          </div>
          <div>
            <p>Cantidad a Agregar</p>
            <input 
              type="number" 
              className="border p-2"
              min={1}
              max={cantidadMax - existencias || 0}
              value={nuevasExistencias}
              onChange={(e) => setNuevasExistencias(+e.target.value)}
            />
          </div>
          <div>
            <p>Existencias finales</p>
            <span className="font-normal normal-case">{existenciasFinales}</span>
          </div>
        </div>
        <div className='flex gap-4'>
          <button 
            type='button'
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => setAgregarExistencias('hidden')}
          >Cancelar</button>
          <button 
            type='button'
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => console.log('Guardar existencias')}
          >Guardar Cambios</button>
        </div>
      </div>
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
        {auth.puesto === 'ejecutivo' && (<Link to={`/inventario/eliminar-producto/${id}`} className="bg-red-500 text-white p-2 rounded-md">Eliminar Producto</Link>)}
        <Link to={`/inventario/editar-producto/${id}`} className="bg-blue-500 text-white p-2 rounded-md">Editar Propiedades</Link>
      </div>
    </div>
  )
}

export default Producto