const ConfirmarProgramacion = ({
  mostrarProgramacion, 
  programacion, 
  productosProgramacion, 
  materialApoyoProgramacion
}) => {

  // console.log(programacion);

  return (
    <div className={`${mostrarProgramacion} flex flex-col md:flex-row gap-12`}>
      <div className="w-full">
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Confirmar Programación
            </h2>
          </div>
        </div>
        <p>Verifica que la información sea correcta y confirma la programación</p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Razón Social</p>
      </div>
    </div>
  )
}

export default ConfirmarProgramacion