
const SeleccionarRazonSocial = ({ programacion, setProgramacion, razonSocial }) => {
  
  return (
    <div className="mb-10 grid grid-cols-6 gap-x-6 gap-y-8">
      <div className="col-span-3">
        <label htmlFor="tipo-programacion" className="block text-sm font-medium leading-6 text-gray-900">
          Seleccionar Razón Social
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <select
              name="tipo-programacion"
              id="tipo-programacion"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={programacion.razonSocial || ''}
              onChange={e => setProgramacion({ ...programacion, razonSocial: e.target.value })}
            >
              <option value="" hidden>Selecciona una Razón Social</option>
              {razonSocial.length > 0 &&
                razonSocial.map((item, index) => (
                 <option key={index} value={item._id}>{item.nombre}</option>
               ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeleccionarRazonSocial