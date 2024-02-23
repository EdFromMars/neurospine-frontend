import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const ProductoInventario = ({ producto }) => {
  
  const { 
    _id,
    nombreMaterial,
    descripcionExtendida, 
    existencias, 
    cantidadMin, 
    cantidadMax, 
  } = producto;

  const status = {
    statusBgColor: existencias <= cantidadMin ? 'bg-red-500/20' : existencias <= ((cantidadMax*.2)+cantidadMin) ? 'bg-yellow-500/20' : 'bg-emerald-500/20',
    statusColor: existencias <= cantidadMin ? 'bg-red-500' : existencias <= ((cantidadMax*.2)+cantidadMin) ? 'bg-yellow-500' : 'bg-emerald-500',
    statusText: existencias <= cantidadMin ? 'Pocas' : existencias <= ((cantidadMax*.2)+cantidadMin) ? 'Bajas' : 'Normales',
  }

  return (
    <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
            <Link to={`producto/${_id}`}>
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {nombreMaterial}
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
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className={`flex-none rounded-full ${status.statusBgColor} p-1`}>
                <div className={`h-1.5 w-1.5 rounded-full ${status.statusColor}`} />
              </div>
              <p className="text-xs leading-5 text-gray-500">{status.statusText}</p>
            </div>
        </div>
        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </div>
    </li>
  )
}

export default ProductoInventario