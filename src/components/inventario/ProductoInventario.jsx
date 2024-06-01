import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import FlatPillDot from "../ui/FlatPillDot";

const ProductoInventario = ({ producto }) => {
  
  const { 
    _id,
    nombreMaterial,
    descripcionExtendida, 
    existencias, 
    cantidadMin, 
    cantidadMax, 
    medida,
    piezasSet
  } = producto;

  const status = {
    statusBgColor: existencias <= cantidadMin ? 'bg-red-100' : existencias <= ((cantidadMax*.2)+cantidadMin) ? 'bg-yellow-100' : 'bg-green-100',
    statusColor: existencias <= cantidadMin ? 'fill-red-400' : existencias <= ((cantidadMax*.2)+cantidadMin) ? 'fill-yellow-400' : 'fill-green-400',
    statusText: existencias <= cantidadMin ? 'Pocas' : existencias <= ((cantidadMax*.2)+cantidadMin) ? 'Bajas' : 'Normales',
  }  

  // console.log(piezasSet)

  if(piezasSet && piezasSet.length > 0){
    console.log(piezasSet)
  } else {
    console.log('No hay piezas set')
  }

  return (
    <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
            <Link to={`producto/${_id}`}>
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {nombreMaterial + ' ' + (medida ? medida : '')}
            </Link>
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            <Link to={`producto/${_id}`} className="relative truncate hover:underline">
              {descripcionExtendida}
            </Link>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <div className="flex flex-col items-end">
          <p className="text-sm leading-6 text-gray-900">Existencias: {existencias}</p>
            <FlatPillDot {...status} />
        </div>
        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </div>
    </li>
  )
}

export default ProductoInventario