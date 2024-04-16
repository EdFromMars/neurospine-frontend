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

  useEffect(() => {
    if(productos.length === 0) {
      obtenerProductos(locacion);
    }
  }, [locacion]);
  
  const [visibility, setVisibility] = useState({
    datos: 'visible',
    productos: 'hidden'
  });

  const [programacion, setProgramacion] = useState({
    tipoProgramacion: '',
    distribuidor: false,
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
      materialPrincipal: ''
    }
  ] || []);

  const validarDatos = () => {
    const { 
      tipoProgramacion, 
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
      formaPago.trim() === '' 
    ) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    setVisibility({
      datos: 'hidden',
      productos: 'visible'
    });
  }

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
            visibility={visibility}
          />

          <AgregarProgramacionProductos 
            visibility={visibility}
            productos={productos}
            productosProgramacion={productosProgramacion}
            setProductosProgramacion={setProductosProgramacion}
          />

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button 
              onClick={() => { navigate(-1) }}
              type="button" 
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </button>
            <button
            onClick={validarDatos}
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Agregar Productos
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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