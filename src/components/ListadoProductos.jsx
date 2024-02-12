import useProductos from "../hooks/useProductos";
import ProductoInventario from "./ProductoInventario";

const ListadoProductos = () => {
  const { productos } = useProductos();

  return (
    <>
      {productos.length ? (
        <div>
          <h2>Inventario de Material y Equipo</h2>
          <ul>
            {productos.map(producto => (
              <ProductoInventario 
                key={producto._id}
                producto={producto}
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