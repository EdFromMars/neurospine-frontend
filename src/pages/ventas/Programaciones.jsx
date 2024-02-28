import ListadoProductos from "../../components/inventario/ListadoProductos"

const Programaciones = () => {
  
  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="w-full">
        <ListadoProductos />
      </div>
    </div>
  )
}

export default Programaciones