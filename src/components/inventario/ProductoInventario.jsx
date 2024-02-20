import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProductoInventario = ({ producto }) => {

  const { locacion } = useAuth();
  
  const { 
    _id,
    nombreMaterial,
    descripcionExtendida, 
    existencias, 
    cantidadMin, 
    cantidadMax, 
  } = producto;

  const status = existencias <= cantidadMin ? 'border-red-500' : existencias > ((cantidadMax*.2)+cantidadMin) ? 'border-yellow-500' : 'border-white';

  const locacionValida = producto.locacion === locacion

  return (
    <>
      { locacionValida && (
        <div className={`mx-5 my-10 border-r-8 ${status} shadow-md px-5 py-10 rounded bg-white`}>
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
        <Link to={`producto/${_id}`} className="bg-blue-500 text-white p-2 rounded-md">Ver</Link>
        </div>
      )}
    </>
  )
}

export default ProductoInventario