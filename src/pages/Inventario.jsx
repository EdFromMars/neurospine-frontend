import { useState } from "react"
import { Link } from "react-router-dom"
import useProductos from "../hooks/useProductos"

const Inventario = () => {

  const { productos } = useProductos();
  console.log(productos);
  
  return (
    <>
      <div>Inventario</div>
      <Link to="agregar-producto">Agregar Producto</Link>
    </>
  )
}

export default Inventario