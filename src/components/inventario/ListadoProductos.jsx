import { useEffect, useState } from "react";
import useProductos from "../../hooks/useProductos";
import ProductoInventario from "./ProductoInventario";
import useAuth from "../../hooks/useAuth";
import useMaterialApoyo from "../../hooks/useMaterialApoyo";

const ListadoProductos = () => {
  
  const { productos, obtenerProductos, locaciones, obtenerLocaciones } = useProductos();
  const { materialesApoyo, obtenerMaterialesApoyo } = useMaterialApoyo();
  const { auth, actualizarAuth, locacion, setLocacion, ejecutivo } = useAuth();
  const [ listaProductos, setListaProductos ] = useState([]);

  const actualizarListaProductos = async (loc) => {
    const productosObtenidos = await obtenerProductos(loc);
    const materialesApoyoObtenidos = await obtenerMaterialesApoyo(loc);
    
    const nuevaListaProductos = [
      ...productosObtenidos,
      ...materialesApoyoObtenidos
    ];
    
    await setListaProductos(nuevaListaProductos);
  }
  
  useEffect(() => {
    
    if(locaciones.length === 0 || locaciones === ''){
      obtenerLocaciones();
    };
    
    if(locacion === ''){
      setLocacion(auth.locacion);
      actualizarListaProductos(auth.locacion);
    } else {
      actualizarListaProductos(locacion);
    }
    
  }, [locacion, locaciones]);

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
        {listaProductos.length ? (
          <ul>
            {listaProductos.map(producto => (
              <ProductoInventario 
                key={ producto._id }
                producto={ producto }
              />
            ))}
          </ul>
        ) : (
          <div className="px-4 py-5 sm:px-6 text-sm text-gray-500">
            <p>Aún no se ha agregado ningún producto al almacén</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ListadoProductos;