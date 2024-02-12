import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <Link to="/inventario/agregar">Agregar Producto</Link>
    </>
  )
}

export default Dashboard