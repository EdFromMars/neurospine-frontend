import { Link } from "react-router-dom"
import ListadoProductos from "../../components/inventario/ListadoProductos"

const Inventario = () => {
  
  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="w-1/2">
        <div>Inventario</div>
        <Link to="agregar-producto">Agregar Producto</Link>
      </div>
      <div className="w-1/2">
        <ListadoProductos />
      </div>
    </div>
  )
}

export default Inventario