import { useState } from 'react';

const ConfirmarProgramacion = ({
  mostrarProgramacion, 
  programacion, 
  productosProgramacion, 
  materialApoyoProgramacion
}) => {

  const [viaticosMonto, setViaticosMonto] = useState(0);

  console.log(materialApoyoProgramacion);
  const { razonSocial, tipoCirugia, tipoProgramacion, tipoVenta, fechaCirugia, horaCirugia, fechaEntrega, fechaDevolucion, hospital, estado, nombrePaciente, nombreCirujano, responsableMaterial, empresaResponsable, asistencia, montoAsistencia, viaticos } = programacion;

  const productosProgramados = productosProgramacion.map(producto => {
    if(Array.isArray(producto)){
      return producto.map((productoIndividual) => (
        <tr key={productoIndividual._id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{productoIndividual.nombreMaterial} {productoIndividual.medida}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{productoIndividual.precioAngeles}</div>
          </td>
        </tr>
      ))
    } else {
      return (
        <tr key={producto._id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.producto}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>

        </tr>
      )}
    }
  );

  const materialApoyoProgramado = materialApoyoProgramacion.map(producto => {
    if(Array.isArray(producto)){
      return producto.map((productoIndividual) => (
        <tr key={productoIndividual._id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{productoIndividual.nombreMaterial} {productoIndividual.medida}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{productoIndividual.precioAngeles}</div>
          </td>
        </tr>
      ))
    } else {
      return (
        <tr key={producto._id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.producto}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>

        </tr>
      )}
    }
  );

  return (
    <div className={`${mostrarProgramacion} flex flex-col md:flex-row gap-12`}>
      <div className="w-full">
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 mt-16 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Confirmar Programación
            </h2>
          </div>
        </div>
        <p>Verifica que la información sea correcta y confirma la programación</p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Razón Social: <span className="font-normal capitalize">{razonSocial}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Tipo Programación: <span className="font-normal capitalize">{tipoProgramacion}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Tipo Cirugía: <span className="font-normal capitalize">{tipoCirugia}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Tipo Venta: <span className="font-normal capitalize">{tipoVenta}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Fecha de Cirugía: <span className="font-normal capitalize">{fechaCirugia}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Hora de Cirugía: <span className="font-normal capitalize">{horaCirugia}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Entrega de Material: <span className="font-normal capitalize">{fechaEntrega}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Devolución de Material: <span className="font-normal capitalize">{fechaDevolucion}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Hospital: <span className="font-normal capitalize">{hospital}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Estado: <span className="font-normal capitalize">{estado}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Nombre del Paciente: <span className="font-normal capitalize">{nombrePaciente}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Nombre del Cirujano: <span className="font-normal capitalize">{nombreCirujano}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Responsable del Material: <span className="font-normal capitalize">{responsableMaterial}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Empresa Responsable: <span className="font-normal capitalize">{empresaResponsable}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Asistencia Técnica: <span className="font-normal capitalize">{asistencia}</span></p>
        <p className="block text-sm font-semibold leading-6 text-gray-900">Monto Asistencia: <span className="font-normal capitalize">{montoAsistencia}</span></p>
        {viaticos && (
          <p className="block text-sm font-semibold leading-6 text-gray-900">Viáticos:
            <input
              type="number"
              className="block w-1/4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Viáticos"
              value={viaticosMonto}
              onChange={(e) => setViaticosMonto(e.target.value)}
            />
          </p>
        )}

        <h3 className="text-2xl font-bold leading-7 mb-8 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-10">Productos Programados</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Precio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosProgramados}
            </tbody>
          </table>
        </div>
        
        <h3 className="text-2xl font-bold leading-7 mb-8 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-10">Material de Apoyo</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Precio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materialApoyoProgramado}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ConfirmarProgramacion