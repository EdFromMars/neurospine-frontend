import { Link } from "react-router-dom";

const Producto = ({ producto }) => {
  const { 
    _id,
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
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded">
      <div className="flex flex-row justify-between">
        <div>
          <p className="font-bold uppercase text-gray-500">Nombre: {''}
            <span className="font-normal normal-case">{nombreMaterial}</span>
          </p>
        </div>
        <div>
          <p className="font-bold uppercase text-gray-500">Existencias {''}
            <span className="font-normal normal-case">{existencias}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <p className="font-bold uppercase text-gray-500 mr-2">Descripción</p>
        <span className="font-normal normal-case">{descripcionExtendida}</span>
      </div>
      <Link to={`/editar-producto/${_id}`} className="bg-blue-500 text-white p-2 rounded-md">Editar</Link>
      <Link to={`/producto/${_id}`} className="bg-blue-500 text-white p-2 rounded-md">Ver</Link>
      <Link to={`/eliminar-producto/${_id}`} className="bg-red-500 text-white p-2 rounded-md">Eliminar</Link>
    </div>
  )
}

export default Producto