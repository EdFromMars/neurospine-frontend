import { useState, useEffect } from "react";
import useProductos from "../hooks/useProductos";
import ProductoInventario from "./ProductoInventario";
import useAuth from "../hooks/useAuth";

const ListadoProductos = () => {
  
  const { productos } = useProductos();
  const { auth, locacion, setLocacion } = useAuth();

  useEffect(() => {
    if(locacion === ''){
      setLocacion(auth.locacion);
    }
  }, []);
  
  const ejecutivo = auth.puesto === 'ejecutivo';
  const locaciones = [...new Set(productos.map(producto => producto.locacion))];

  return (
    <>
      {productos.length ? (
        <div>
          <h2>Inventario de Material y Equipo</h2>
          {ejecutivo && (
            <>
              <p>Selecciona el almacén para mostrar el inventario</p>
              <select 
                className="border w-full p-3 mt-3"
                onChange={(e) => setLocacion(e.target.value)}
                value={locacion}
              >
                {locaciones.map( locacionOption => (
                  <option 
                    key={locacionOption}
                    value={locacionOption}>
                      {locacionOption}
                  </option>
                ))}
              </select>
            </>
          )}
          <ul>
            {productos.map(producto => (
              <ProductoInventario 
                key={ producto._id }
                producto={ producto }
              />
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay material en el inventario</p>
      )}
    </>
  )
}

export default ListadoProductos;