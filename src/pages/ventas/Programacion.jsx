import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRazonSocial from "../../hooks/useRazonSocial";
import useHospitales from "../../hooks/useHospitales";
import useProgramacion from '../../hooks/useProgramacion';
import { formatearDinero, estados } from '../../helpers';
import { stringify } from 'postcss';


const Programacion = () => {
  const { id} = useParams()
  
  const [viaticosMonto, setViaticosMonto] = useState(0);
  const [programacion, setProgramacion] = useState({});
  const [razonesSocialesLista, setRazonesSocialesLista] = useState([]);
  
  const { ejecutivo, locacion } = useAuth();
  const { obtenerRazonSocial } = useRazonSocial();
  const { hospitales, obtenerHospitales } = useHospitales();
  const { obtenerProgramacion } = useProgramacion();

  let productosObject = [];
  let materialApoyoObject = [];
  
  useEffect(() => {
    const obtenerProgramacionID = async () => {
      const data = await obtenerProgramacion(id);
      setProgramacion(data);
    }
    
    const listaHospitales = () => {
      if(hospitales.length === 0 && ejecutivo) {
        obtenerHospitales();
      } else {
        obtenerHospitales(locacion);
      }
    }

    const mostrarRazonesSociales = async () => {
      const data = await obtenerRazonSocial();
      setRazonesSocialesLista(data);
    }
    
    obtenerProgramacionID();
    listaHospitales();
    mostrarRazonesSociales();
  }, []);

  const { razonSocial, tipoProgramacion, tipoCirugia, tipoVenta, fechaCirugia, fechaEntrega, fechaDevolucion, horaCirugia, hospital, estado, nombrePaciente, nombreCirujano, responsableMaterial, empresaResponsable, observaciones, asistencia, montoAsistencia, viaticos, productos, materialApoyo } = programacion;

  const mostrarRazonSocial = (id) => {
    if(!id) return '';
    if(!razonesSocialesLista || razonesSocialesLista.length === 0) return '';
    const razon = razonesSocialesLista.find((item) => item._id === id);
    return razon ? razon.nombre : '';
  }

  const formatoFecha = (fecha) => {
    if (!fecha) {
      return ''; // O cualquier valor por defecto que desees
    }
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
    const producto = productosObject.find((item) => item._id === id);
    return producto ? producto.nombreMaterial : '';
  }

  const nombreMaterial = (id) => {
    if(!id) return '';
    const material = materialApoyoObject.find((item) => item._id === id);
    return material ? material.nombreMaterial : '';
  }

  const materialApoyoCantidad = (material) => {
    return material.setCompleto ? 'Set completo' : material.cantidad;
  }


  if(productos !== undefined && materialApoyo !== undefined) {
    productosObject = JSON.parse(productos);

    materialApoyoObject = JSON.parse(materialApoyo);
  }
  
  const productosProgramados = productosObject.map(( producto, productoIndex ) => {
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
  )

  const materialApoyoProgramado = materialApoyoObject.map(( producto, productoIndex ) => {
    if(producto.piezasSet && Array.isArray(producto.piezasSet)){
      return producto.piezasSet.map((productoIndividual, productoIndividualIndex) => (
        (productoIndividual.pedido && productoIndividual.pedido !== 0) && (
          <tr key={`${productoIndividual._id}-${productoIndividualIndex}`}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{productoIndividual.nombre} {productoIndividual.medida}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{productoIndividual.pedido || 0}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 text-right">{formatearDinero(productoIndividual.precio)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 text-right">{formatearDinero(productoIndividual.precio * productoIndividual.pedido)}</div>
            </td>
          </tr>
        ) 
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
    <div className={`flex flex-col md:flex-row gap-12`}>
      <div className="w-full">
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 mt-16 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Programación - {formatoFecha(fechaCirugia)}
            </h2>
            <h3 className="mt-4 text-lg font-semibold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
              {mostrarHospital(hospital)}
            </h3>
          </div>
        </div>
        <div>
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
                  </dd>
                </div>
              )}
              {viaticos && (
                <>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Viáticos</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 relative">
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
                    </dd>
                  </div>
                </>
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
                  Precio
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

export default Programacion