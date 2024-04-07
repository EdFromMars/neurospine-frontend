import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/20/solid'


const ZonaCard = ({zona, locaciones}) => {

  const { _id, nombreZona, locacion } = zona;
  
  if(locaciones.length === 0) return null;
  
  const locacionNombre = locaciones.filter(locacionOption => locacionOption._id === locacion)[0].nombre || '';
  
  return (
    <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
            <Link to={`/zonas/${_id}`}>
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {nombreZona}
            </Link>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <div className="flex flex-col items-end">
          <p className="text-sm leading-6 text-gray-900">Locacion: {locacionNombre}</p>
        </div>
        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </div>
    </li>
  )
}

export default ZonaCard