import { useState, useEffect } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import useAuth from '../../hooks/useAuth';
import useHospitales from "../../hooks/useHospitales";
import { formatearDinero, estados } from '../../helpers';

import es from 'date-fns/locale/es';
import { format } from 'date-fns';

const ConfirmarProgramacion = ({
  mostrarProgramacion, 
  programacion, 
  productosProgramacion, 
  materialApoyoProgramacion,
  razonesSocialesLista,
  productos, 
  materialesApoyo
}) => {

  const [viaticosMonto, setViaticosMonto] = useState(0);

  const { ejecutivo, locacion } = useAuth();
  const { hospitales, obtenerHospitales } = useHospitales();

  const { 
    razonSocial, 
    tipoCirugia, 
    tipoProgramacion, 
    tipoVenta, 
    fechaCirugia, 
    horaCirugia, 
    fechaEntrega, 
    fechaDevolucion, 
    hospital, 
    estado, 
    nombrePaciente, 
    nombreCirujano, 
    responsableMaterial, 
    empresaResponsable, 
    observaciones, 
    asistencia, 
    montoAsistencia, 
    viaticos 
  } = programacion;

  useEffect(() => {
    const listaHospitales = () => {
      if(hospitales.length === 0 && ejecutivo) {
        obtenerHospitales();
      } else {
        obtenerHospitales(locacion);
      }
      console.log(hospitales);
    }
    listaHospitales();
  }, 
  []);

  const mostrarRazonSocial = (id) => {
    if(!id) return '';
    if(razonesSocialesLista.length === 0) return '';
    const razon = razonesSocialesLista.find((item) => item._id === id);
    return razon ? razon.nombre : '';
  }

  const formatoFecha = (fecha) => {
    const date = new Date(fecha.replace(/-/g, '/'));
    return date.toLocaleDateString();
  }

  const mostrarHospital = (id) => {
    if(!id) return '';
    if(hospitales.length === 0) return '';
    const hospital = hospitales.find((item) => item._id === id);
    return hospital ? hospital.nombreHospital : '';
  }

  const mostrarEstado = (estado) => {
    const estadoArray = estados.find((item) => item.id === estado);
    return estadoArray ? estadoArray.display : '';
  }

  const nombreProducto = (id) => {
    if(!id) return '';
    const producto = productos.find((item) => item._id === id);
    return producto ? producto.nombreMaterial : '';
  }

  const nombreMaterial = (id) => {
    if(!id) return '';
    const material = materialesApoyo.find((item) => item._id === id);
    return material ? material.nombreMaterial : '';
  }

  const materialApoyoCantidad = (material) => {
    return material.setCompleto ? 'Set completo' : material.cantidad;
  }

  const productosProgramados = productosProgramacion.map(( producto, productoIndex ) => {
    if(Array.isArray(producto)){
      return producto.map((productoIndividual, productoIndividualIndex) => (
        <tr key={`${productoIndividual._id}-${productoIndividualIndex}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{productoIndividual.nombreMaterial} {productoIndividual.medida}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900 text-right">{formatearDinero(productoIndividual.precioAngeles * producto.cantidad)}</div>
          </td>
        </tr>
      ))
    } else {
      return (
        <tr key={`${producto._id}-${productoIndex}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{nombreProducto(producto.producto)}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900 text-right">{formatearDinero(producto.precio * producto.cantidad)}</div>
          </td>
        </tr>
      )}
    }
  );

  const materialApoyoProgramado = materialApoyoProgramacion.map(( producto, productoIndex ) => {
    if(Array.isArray(producto)){
      return producto.map((productoIndividual) => (
        <tr key={`${productoIndividual._id}-${productoIndividualIndex}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{productoIndividual.nombreMaterial} {productoIndividual.medida}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{producto.cantidad}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900 text-right">{formatearDinero(productoIndividual.precioAngeles)}</div>
          </td>
        </tr>
      ))
    } else {
      return (
        <tr key={`${producto._id}-${productoIndex}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{nombreMaterial(producto.producto)}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{materialApoyoCantidad(producto)}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{formatearDinero(producto.precio)}</div>
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
        <div>
          <div className="px-4 sm:px-0">
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Verifica que la información sea correcta y haz click en Agregar Programación para que los datos sean guardados.</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Razón Social</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{mostrarRazonSocial(razonSocial)}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tipo de Programación:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tipoProgramacion === "cirugia" ? 'Cirugía': 'Demostración'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tipo Cirugía:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{tipoCirugia}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tipo Venta: </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{tipoVenta}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de Cirugía: </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{formatoFecha(fechaCirugia)}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Hora de Cirugía: </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{horaCirugia}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Entrega de Material:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{formatoFecha(fechaEntrega)}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Devolución de Material:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{formatoFecha(fechaDevolucion)}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Hospital:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{mostrarHospital(hospital)}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Estado:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{mostrarEstado(estado)}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nombre del Paciente:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{nombrePaciente}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nombre del Cirujano:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{nombreCirujano}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Responsable del Material:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{responsableMaterial}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Empresa Responsable:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{empresaResponsable}</dd>
              </div>
              {observaciones && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Observaciones</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {observaciones}
                  </dd>
                </div>
              )}
              {asistencia && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Asistencia técnica</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {formatearDinero(montoAsistencia)}
                    {viaticos && (
                      <>
                        <div className="mt-4 text-sm font-medium leading-6 text-gray-900">Agrega el monto de los viáticos que serán agregados al costo final.</div>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={viaticosMonto || '0'}
                            onChange={(e) => setViaticosMonto(e.target.value)}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span id="price-currency" className="text-gray-500 sm:text-sm">
                              MXN
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
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
                  Total
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
                  Total
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