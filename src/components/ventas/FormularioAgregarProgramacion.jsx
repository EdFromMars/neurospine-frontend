import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import useAuth from "../../hooks/useAuth";
import AgregarProgramacionDatos from "./AgregarProgramacionDatos";
import AgregarProgramacionProductos from "./AgregarProgramacionProductos";

const FormularioAgregarProgramacion = () => {
  const { productos, obtenerProductos } = useProductos();
  const { locacion } = useAuth();
  const navigate = useNavigate();
  const [enabledProductos, setEnabledProductos] = useState('hidden');

  const [programacion, setProgramacion] = useState({
    tipoProgramacion: '',
    tipoVenta: '',
    tipoMaterial: '',
    fechaCirugia: '',
    horaCirugia: '',
    estado: '',
    hospital: '',
    nombrePaciente: '',
    nombreCirujano: '',
    responsableMaterial: '',
    empresaResponsable: '',
    fechaEntrega: '',
    fechaDevolucion: '',
    formaPago: '',
    asistencia: false,
    observaciones: ''
  });

  const [productosProgramacion, setProductosProgramacion] = useState([
    {
      producto: '',
      cantidad: 0,
      precio: 0,
      materialPrincipal: '',
      multiple: false
    }
  ] || []);

  useEffect(() => {
    if(productos.length === 0) {
      obtenerProductos(locacion);
    }
  }, [locacion]);

  const validarDatos = () => {
    const { 
      tipoProgramacion, 
      tipoVenta,
      tipoMaterial,
      fechaCirugia, 
      horaCirugia, 
      estado, 
      hospital, 
      nombrePaciente, 
      nombreCirujano, 
      responsableMaterial, 
      empresaResponsable, 
      fechaEntrega, 
      fechaDevolucion, 
      formaPago 
    } = programacion;

    if( 
      tipoProgramacion.trim() === '' || 
      tipoMaterial.trim() === '' || 
      fechaCirugia.trim() === '' || 
      horaCirugia.trim() === '' || 
      estado.trim() === '' || 
      hospital.trim() === '' || 
      nombrePaciente.trim() === '' || 
      nombreCirujano.trim() === '' || 
      responsableMaterial.trim() === '' || 
      empresaResponsable.trim() === '' || 
      fechaEntrega.trim() === '' || 
      fechaDevolucion.trim() === '' || 
      tipoProgramacion === 'cirugia' && tipoVenta.trim() === '' ||
      tipoProgramacion === 'cirugia' && formaPago.trim() === ''
    ){
      setEnabledProductos('hidden');
      return;
    }

    setEnabledProductos('flex');
  }

  useEffect(() => {
    validarDatos();
  }, [programacion]);

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          
          <AgregarProgramacionDatos 
            programacion={programacion} 
            setProgramacion={setProgramacion}
          />

          <AgregarProgramacionProductos 
            enabledProductos={enabledProductos}
            productos={productos}
            productosProgramacion={productosProgramacion}
            setProductosProgramacion={setProductosProgramacion}
            programacion={programacion}
          />

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => { navigate(-1) }}
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`${enabledProductos} rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Agregar Programación
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormularioAgregarProgramacion