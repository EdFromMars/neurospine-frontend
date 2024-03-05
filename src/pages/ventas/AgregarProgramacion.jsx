import FormularioAgregarProgramacion from "../../components/ventas/FormularioAgregarProgramacion";

const AgregarProgramacion = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full">
          <div>Agregar Programación</div>
          <FormularioAgregarProgramacion />
        </div>
      </div>
    </>
  )
}

export default AgregarProgramacion