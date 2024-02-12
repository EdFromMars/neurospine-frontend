import FormularioAgregarInventario from "../components/FormularioAgregarInventario"

const AgregarInventario = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-1/2">
          <h1 className="text-indigo-600 font-black text-6xl">
            Llena los campos del {''}<span className="text-black">Formulario</span>
          </h1>
        </div>
        <div className="w-1/2">
          <FormularioAgregarInventario />
        </div>
      </div>
    </>
  )
}

export default AgregarInventario