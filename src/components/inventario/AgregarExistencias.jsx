import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useProductos from "../../hooks/useProductos";

import Alerta from "../Alerta";

const AgregarExistencias = ( {existencias, cantidadMax, agregarExistencias, setAgregarExistencias, producto} ) => {

  const [existenciasFinales, setExistenciasFinales] = useState(0);
  const [nuevasExistencias, setNuevasExistencias] = useState(0);
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const { actualizarCantidad } = useProductos();

  useEffect(() => {
    const actualizarTotal = () => {
      setExistenciasFinales(parseInt(existencias) + parseInt(nuevasExistencias) || existencias)
    }
    actualizarTotal();
  },[nuevasExistencias]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    actualizarCantidad(
      producto._id, 
      producto.existencias, 
      nuevasExistencias, 
      existenciasFinales
    );

    setAlerta({
      msg: 'Existencias actualizadas',
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 4000);
  }

  const { msg } = alerta;
  
  return (
    <>
      { msg && <Alerta 
        alerta={ alerta } 
      />}

      <form 
          onSubmit={handleSubmit} 
          className={agregarExistencias}
        >
        <div className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-3">
              <div key="actuales" className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">Existencias Actuales</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl py-2">
                  {existencias}
                </dd>
              </div>
              <div key="agregar" className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">Cantidad a agregar</dt>
                <input 
                  type="number" 
                  className="order-first border-0 text-center appearance-none text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl p-0 border-b w-full"
                  min={1}
                  max={cantidadMax - existencias || 0}
                  value={nuevasExistencias}
                  onChange={(e) => setNuevasExistencias(+e.target.value)}
                />
                <div className='gap-4 text-center items-center justify-center hidden sm:flex'>
                  <button 
                    type='button'
                    className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => setAgregarExistencias('hidden')}
                  >Cancelar</button>
                  <button 
                    type='submit'
                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Guardar Cambios</button>
                </div>
              </div>
              <div key="totales" className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">Existencias Finales</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl py-2">
                  {existenciasFinales}
                </dd>
                <div className='flex gap-4 text-center items-center justify-center sm:hidden'>
                  <button 
                    type='button'
                    className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => setAgregarExistencias('hidden')}
                  >Cancelar</button>
                  <button 
                    type='submit'
                    className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Guardar Cambios</button>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </form>
    </>
  )
}

export default AgregarExistencias