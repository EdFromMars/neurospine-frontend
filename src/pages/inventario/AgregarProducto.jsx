import FormularioAgregarProducto from "../../components/inventario/FormularioAgregarProducto"

const AgregarProducto = () => {
  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="w-1/2">
        <h1 className="text-indigo-600 font-black text-6xl">
          Llena los campos del {''}<span className="text-black">Formulario</span>
        </h1>
      </div>
      <div className="w-1/2">
        <FormularioAgregarProducto />
      </div>
    </div>
  )
}

export default AgregarProducto