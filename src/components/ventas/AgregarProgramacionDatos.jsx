import React from 'react'
import { estados } from "../../helpers";
import ToggleButton from "../ui/ToggleButton";
import SelectSimple from "../ui/SelectSimple";


const AgregarProgramacionDatos = ({ programacion, setProgramacion, visibility }) => {
  return (
    <div className={`space-y-12 datos-programacion ${visibility.productos}`}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Datos de cliente</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Completa el formulario para agregar una nueva programación
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="tipo-programacion" className="block text-sm font-medium leading-6 text-gray-900">
              Tipo de Programación
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select
                  name="tipo-programacion"
                  id="tipo-programacion"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={programacion.tipoProgramacion || ''}
                  onChange={e => setProgramacion({ ...programacion, tipoProgramacion: e.target.value })}
                >
                  <option value="" hidden>Tipo de Programación</option>
                  <option value="cirugia">Cirugia</option>
                  <option value="demostracion">Demostracion</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Venta a Distribuidor</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <fieldset className="col-span-full">
            <div className="relative flex">
              <ToggleButton 
                enabled={programacion.distribuidor || false} 
                setEnabled={e => {
                  setProgramacion({...programacion, distribuidor: e})
                }}
                copy={"Selecciona esta opción para asignar los precios de distribuidor a los programacions"}
              />
            </div>
          </fieldset>
        </div>
      </div>


      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="fecha-cirugia" className="block text-sm font-medium leading-6 text-gray-900">
              Fecha de Cirugía
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="fecha-cirugia"
                id="fecha-cirugia"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.fechaCirugia || ''}
                onChange={e => setProgramacion({ ...programacion, fechaCirugia: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="hora-cirugia" className="block text-sm font-medium leading-6 text-gray-900">
              Hora de Cirugía
            </label>
            <div className="mt-2">
              <input
                type="time"
                name="hora-cirugia"
                id="hora-cirugia"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.horaCirugia || ''}
                onChange={e => setProgramacion({ ...programacion, horaCirugia: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">                
        <div className="sm:col-span-3">
            <label htmlFor="tipo-programacion" className="block text-sm font-medium leading-6 text-gray-900">
              Estado
            </label>
            <div className="mt-2">
              <SelectSimple 
                selectOptions={estados}
                value={programacion.estado || ''} 
                onChange={e => setProgramacion({ ...programacion, estado: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="hospital" className="block text-sm font-medium leading-6 text-gray-900">
              Hospital
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="hospital"
                id="hospital"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.hospital || ''}
                onChange={e => setProgramacion({ ...programacion, hospital: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="nombre-paciente" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre del Paciente
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="nombre-paciente"
                id="nombre-paciente"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.nombrePaciente || ''}
                onChange={e => setProgramacion({ ...programacion, nombrePaciente: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="nombre-cirujano" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre del Cirujano
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="nombre-cirujano"
                id="nombre-cirujano"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.nombreCirujano || ''}
                onChange={e => setProgramacion({ ...programacion, nombreCirujano: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="responsable-material" className="block text-sm font-medium leading-6 text-gray-900">
              Responsable del Material
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="responsable-material"
                id="responsable-material"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.responsableMaterial || ''}
                onChange={e => setProgramacion({ ...programacion, responsableMaterial: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="empresa-responsable" className="block text-sm font-medium leading-6 text-gray-900">
              Empresa Responsable
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="empresa-responsable"
                id="empresa-responsable"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.empresaResponsable || ''}
                onChange={e => setProgramacion({ ...programacion, empresaResponsable: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label htmlFor="fecha-entrega" className="block text-sm font-medium leading-6 text-gray-900">
              Fecha de Entrega
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="fecha-entrega"
                id="fecha-entrega"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.fechaEntrega || ''}
                onChange={e => setProgramacion({ ...programacion, fechaEntrega: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="fecha-devolucion" className="block text-sm font-medium leading-6 text-gray-900">
              Fecha de Devolución
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="fecha-devolucion"
                id="fecha-devolucion"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.fechaDevolucion || ''}
                onChange={e => setProgramacion({ ...programacion, fechaDevolucion: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="forma-pago" className="block text-sm font-medium leading-6 text-gray-900">
              Forma de Pago
            </label>
            <div className="mt-2">
              <select
                name="forma-pago"
                id="forma-pago"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.formaPago || ''}
                onChange={e => setProgramacion({ ...programacion, formaPago: e.target.value })}
              >

                <option value="particular">Particular - Pago Directo</option>
                <option value="privado">Privado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Requiere Asistencia Técnica</h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <fieldset className="col-span-full">
                  <div className="relative flex">
                    <ToggleButton 
                      enabled={programacion.asistencia || false} 
                      setEnabled={e => {
                        setProgramacion({...programacion, asistencia: e})
                      }}
                      copy={"Selecciona esta opción para volverlo un material complementario"}
                    />
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="observaciones" className="block text-sm font-medium leading-6 text-gray-900">
              Observaciones
            </label>
            <div className="mt-2">
              <textarea
                name="observaciones"
                id="observaciones"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={programacion.observaciones || ''}
                onChange={e => setProgramacion({ ...programacion, observaciones: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgregarProgramacionDatos