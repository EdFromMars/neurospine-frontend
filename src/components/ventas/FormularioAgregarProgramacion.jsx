import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductos from "../../hooks/useProductos";
import useMaterialApoyo from "../../hooks/useMaterialApoyo";
import useAuth from "../../hooks/useAuth";
import useRazonSocial from "../../hooks/useRazonSocial";
import useProgramacion from "../../hooks/useProgramacion";

import SeleccionarRazonSocial from "./SeleccionarRazonSocial";
import AgregarProgramacionDatos from "./AgregarProgramacionDatos";
import AgregarProgramacionProductos from "./AgregarProgramacionProductos";
import ConfirmarProgramacion from "./ConfirmarProgramacion";

const FormularioAgregarProgramacion = () => {
  const { productos, obtenerProductos } = useProductos();
  const { materialesApoyo, obtenerMaterialesApoyo } = useMaterialApoyo();
  const { razonSocial, setRazonSocial, obtenerRazonSocial } = useRazonSocial();
  const { agregarProgramacion } = useProgramacion();
  const { auth, locacion } = useAuth();
  const navigate = useNavigate();
  const [enabledProductos, setEnabledProductos] = useState('hidden');
  const [mostrarProgramacion, setMostrarProgramacion] = useState('hidden');

  const [programacion, setProgramacion] = useState({
    razonSocial: '',
    tipoProgramacion: '',
    tipoVenta: '',
    tipoCirugia: '',
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
    iva: false,
    asistencia: false,
    montoAsistencia: 0,
    viaticos: false,
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

  const [materialApoyoProgramacion, setMaterialApoyoProgramacion] = useState([
    {
      producto: '',
      cantidad: 0,
      tipoPrecio: 'renta',
      setCompleto: true,
      piezasSet: '',
      precio: 0,
      materialPrincipal: '',
      multiple: false
    }
  ] || []);

  useEffect(() => {
    const mostrarRazonesSociales = async () => {
      const data = await obtenerRazonSocial();
      setRazonSocial(data);
    }
    mostrarRazonesSociales();
  }, []);
  
  
  useEffect(() => {
    if(productos.length === 0) {
      obtenerProductos(locacion);
    }
    if(materialesApoyo.length === 0) {
      obtenerMaterialesApoyo(locacion);
    }
  }, [locacion, productos]);

  const validarDatos = () => {
    const { 
      razonSocial,
      tipoProgramacion, 
      tipoCirugia,
      tipoVenta,
      iva,
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
    } = programacion;

    if( 
      razonSocial.trim() === '' || 
      tipoProgramacion.trim() === '' || 
      tipoCirugia.trim() === '' || 
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
      ''
    ){
      // setEnabledProductos('hidden');
      setEnabledProductos('flex');
      return;
    }

    setEnabledProductos('flex');
  }

  useEffect(() => {
    validarDatos();
  }, [programacion]);

  const handleSubmit = e => {
    e.preventDefault();

    const programacionInfo = {
      ...programacion,
      fechaCirugia: new Date(fechaCirugia.replace(/-/g, '/')),
      fechaEntrega: new Date(fechaEntrega.replace(/-/g, '/')),
      fechaDevolucion: new Date(fechaDevolucion.replace(/-/g, '/')),
      usuario: auth._id,
      productos: JSON.stringify(productosProgramacion),
      materialApoyo: JSON.stringify(materialApoyoProgramacion)
    }
    
    agregarProgramacion(programacionInfo);

    setTimeout(() => {
      navigate('/programacion');
    }, 3000);
  }

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>

          <SeleccionarRazonSocial
            programacion={programacion}
            setProgramacion={setProgramacion}
            razonSocial={razonSocial}
          />
          
          <AgregarProgramacionDatos 
            programacion={programacion} 
            setProgramacion={setProgramacion}
          />

          <AgregarProgramacionProductos 
            enabledProductos={enabledProductos}
            productos={productos}
            materialesApoyo={materialesApoyo}
            productosProgramacion={productosProgramacion}
            setProductosProgramacion={setProductosProgramacion}
            programacion={programacion}
            materialApoyoProgramacion={materialApoyoProgramacion}
            setMaterialApoyoProgramacion={setMaterialApoyoProgramacion}
          />

          <ConfirmarProgramacion 
            mostrarProgramacion={mostrarProgramacion}
            programacion={programacion}
            productosProgramacion={productosProgramacion}
            materialApoyoProgramacion={materialApoyoProgramacion}
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
              onClick={() => { setMostrarProgramacion('visible') }}
              type="button"
              className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              disabled={enabledProductos === 'hidden'}
            >
              Confirmar Programación
            </button>
            <button
              type="submit"
              className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
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