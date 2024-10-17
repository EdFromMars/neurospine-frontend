import { useEffect, useState } from "react";
import ZonaCard from "./ZonaCard";

import useAuth from "../../hooks/useAuth";
import useProductos from "../../hooks/useProductos";
import useZonas from "../../hooks/useZonas";

const ListadoZonas = () => {
  
  const { auth, locacion, setLocacion, ejecutivo } = useAuth();
  const { locaciones, obtenerLocaciones } = useProductos();
  const { zonas, obtenerZonas } = useZonas();
  
  useEffect(() => {
    if(zonas.length === 0){
      obtenerZonas();
    }
    if(locaciones.length === 0){
      obtenerLocaciones();
    }
    if(locacion === ''){
      setLocacion(auth.locacion);
    }
  }, [zonas, locaciones, locacion]);
 
  const zonasAlmacen = zonas.filter(zona => zona.locacion === locacion);
  const locacionFiltrada = locaciones.filter(locacionOption => locacionOption._id === locacion)[0];
  const nombreLocacion = locacionFiltrada ? locacionFiltrada.nombre : '';


  return (
    <>
      <div
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
      
        {ejecutivo && (
          <>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">{nombreLocacion}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Selecciona el almacén para mostrar las zonas
                  </p>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                <select
                  id="location"
                  name="location"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setLocacion(e.target.value)}
                  value={locacion}
                >
                  {locaciones.map( locacionOption => {
                    return (
                      <option 
                      key={locacionOption._id}
                      value={locacionOption._id}>
                        {locacionOption.nombre}
                      </option>
                    )
                  })}
                </select>
                </div>
              </div>
            </div>
          </>
        )}
        {zonasAlmacen.length? (
          <ul>
            {zonasAlmacen.map(zona => (
              <ZonaCard 
              key={ zona._id }
              zona={ zona }
              locaciones={locaciones}
              />
            ))}
          </ul>
        ) : (
          <div className="px-4 py-5 sm:px-6 text-sm text-gray-500">
            <p>Aún no se ha agregado ninguna zona asociada a este almacén.</p>
          </div>
        )}

      </div>
    </>
  )
}

export default ListadoZonas;