
const FormularioAgregarPedido = () => {
  return (
    <>
      <form action="">
        <div className="flex">
            <div className="basis-5/12">
              <h2>Datos de Solicitud</h2>
            </div>
            <div className="basis-7/12">
              <div>
                <label 
                  htmlFor="tipo-programacion"
                  className="text-gray-700 uppercase font-bold" 
                >Tipo de Programación</label>
                <input 
                  type="text" 
                  id="tipo-programacion"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label 
                  htmlFor="venta-distribuidor"
                  className="text-gray-700 uppercase font-bold" 
                >Venta a Distribuidor</label>
                <input 
                  type="checkbox" 
                  id="venta-distribuidor"
                  value="Venta a Distribuidor"
                  className="p-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <label 
                    htmlFor="fecha-cirugia"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Fecha de Cirugía</label>
                  <input 
                    type="date" 
                    id="fecha-cirugia"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="hora-cirugia"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Hora de Cirugía</label>
                  <input 
                    type="time" 
                    id="hora-cirugia"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <label 
                    htmlFor="estado"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Estado</label>
                  <select 
                    id="estado"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="estado1">estado 1</option>
                    <option value="estado2">estado 2</option>
                    <option value="estado3">estado 3</option>
                    <option value="estado4">estado 4</option>
                    <option value="estado5">estado 5</option>
                  </select>
                </div>
                <div>
                  <label 
                    htmlFor="hospital"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Hospital</label>
                  <input 
                    type="text" 
                    id="hospital"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <label 
                    htmlFor="paciente"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Nombre del Paciente</label>
                  <input 
                    type="text" 
                    id="paciente"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="cirujano"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Nombre del Cirujano</label>
                  <input 
                    type="text" 
                    id="cirujano"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <label 
                    htmlFor="responsable"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Responsable del Material</label>
                  <input 
                    type="text" 
                    id="responsable"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="empresa"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Empresa Responsable</label>
                  <input 
                    type="text" 
                    id="empresa"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <label 
                    htmlFor="fecha-entrega"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Fecha de Entrega</label>
                  <input 
                    type="date" 
                    id="fecha-entrega"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="fecha-devolución"
                    className="w-full text-gray-700 uppercase font-bold" 
                  >Fecha de Devolución</label>
                  <input 
                    type="date" 
                    id="fecha-devolución"
                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label 
                  htmlFor="forma-pago"
                  className="w-full text-gray-700 uppercase font-bold" 
                >Forma de Pago</label>
                <select 
                  id="forma-pago"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                >
                  <option value="estado1">Particular - Pago Directo</option>
                  <option value="estado2">Privado</option>
                </select>
              </div>
              <div>
                <label 
                  htmlFor="asistencia-tecnica"
                  className="text-gray-700 uppercase font-bold" 
                >Requiere Asistencia Técnica</label>
                <input 
                  type="checkbox" 
                  id="asistencia-tecnica"
                  value="Venta a Distribuidor"
                  className="p-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label 
                  htmlFor="observaciones"
                  className="w-full text-gray-700 uppercase font-bold" 
                >Observaciones</label>
                <textarea 
                  id="observaciones"
                  placeholder="Observaciones"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
            </div>
        </div>
      </form>
    </>
  )
}

export default FormularioAgregarPedido