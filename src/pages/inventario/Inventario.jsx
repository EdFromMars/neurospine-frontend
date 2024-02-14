import { useState } from "react"
import { Link } from "react-router-dom"
import useProductos from "../../hooks/useProductos"
import ListadoProductos from "../../components/ListadoProductos"

const Inventario = () => {

  const { productos } = useProductos();
  
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