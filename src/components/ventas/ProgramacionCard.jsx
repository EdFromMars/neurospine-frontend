import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import FlatPillDot from '../ui/FlatPillDot';

const ProgramacionCard = ({ programacion }) => {
  console.log(programacion);
  const { _id, nombrePaciente, hospital, fechaCirugia } = programacion;

  return (
    <Link to={`${_id}`}>
      <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
                <p>
                  {fechaCirugia}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {nombrePaciente}
                </p>
            </p>
          </div>
        </div>
        <div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="flex flex-col items-end">
              <p className="text-sm leading-6 text-gray-900">Hospital: {hospital}</p>
            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
          {/* <div>
            <p className="text-sm leading-6 text-gray-900">Reserva: {reserva || 0}</p>
            </div>
            <div>
            <p className="text-sm leading-6 text-gray-900">Consigna: {consigna || 0}</p>
            </div> */}
        </div>
      </li>
    </Link>
  )
}

export default ProgramacionCard