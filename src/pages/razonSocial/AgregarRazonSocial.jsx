import FormularioRazonSocial from "../../components/razonSocial/FormularioRazonSocial"

const AgregarRazonSocial = () => {
  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Agregar Razón Social
          </h2>
        </div>
      </div>
      <FormularioRazonSocial />
    </>
  )
}

export default AgregarRazonSocial