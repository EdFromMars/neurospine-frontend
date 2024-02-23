import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircleIcon  } from "@heroicons/react/20/solid";

import useProductos from "../../hooks/useProductos";
import ProductoInventario from "./ProductoInventario";
import useAuth from "../../hooks/useAuth";


const ListadoProductos = () => {
  
  const { productos, locaciones } = useProductos();
  const { auth, locacion, setLocacion, ejecutivo } = useAuth();
  
  useEffect(() => {
    if(locacion === ''){
      setLocacion(auth.locacion);
    }
  }, []);
  
  const productosFiltrados = productos.filter(producto => producto.locacion === locacion);

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Inventario de Material y Equipo
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
        <Link
          to="agregar-producto"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Agregar Producto
          <PlusCircleIcon  className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </Link>
        </div>
      </div>

      <div
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
      
        {ejecutivo && (
          <>
            <div key="2" className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">{locacion}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Selecciona el almacén para mostrar el inventario
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
                      key={locacionOption.id}
                      value={locacionOption.nombre}>
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
        {productosFiltrados.length? (
          <ul>
            {productosFiltrados.map(producto => (
              <ProductoInventario 
              key={ producto._id }
              producto={ producto }
              />
            ))}
          </ul>
        ) : (
          <div key="1" className="px-4 py-5 sm:px-6 text-sm text-gray-500">
            <p>Aún no se ha agregado ningún producto al almacén</p>
          </div>
        )}

      </div>
    </>
  )
}

export default ListadoProductos;