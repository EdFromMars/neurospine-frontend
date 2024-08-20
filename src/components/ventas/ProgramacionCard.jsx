import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { estados } from '../../helpers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import useHospitales from '../../hooks/useHospitales';

const ProgramacionCard = ({ programacion }) => {

  const [ nombreHospital, setNombreHospital ] = useState('Cargando...');
  const { _id, estado, hospital, fechaCirugia } = programacion;
  const {obtenerHospital} = useHospitales();

  const mostrarEstado = (estado) => {
    const estadoEncontrado = estados.find(estadoItem => estadoItem.id == estado);
    return estadoEncontrado.display;
  }

  useEffect(() => {
    const nombreHospital = async() => {
      const data = await obtenerHospital(hospital);
      setNombreHospital(data.nombreHospital);
    }
    nombreHospital();
  });

  const diaCirugia = new Date(fechaCirugia.replace(/-/g, '/'))

  return (
    <Link to={`${_id}`}>
      <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto text-sm font-semibold leading-6 text-gray-900 capitalize">
            <p className='text-3xl'>
              {diaCirugia.getDate()}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              {mostrarEstado(estado)}
            </p>
          </div>
        </div>
        <div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="flex flex-col items-end">
              <p className="text-sm leading-6 text-gray-900">Hospital: {nombreHospital}</p>
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