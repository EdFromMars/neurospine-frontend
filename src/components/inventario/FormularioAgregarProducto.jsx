import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../Alerta";
import useProductos from "../../hooks/useProductos";
import useMaterialApoyo from "../../hooks/useMaterialApoyo";
import usePiezasMaterialApoyo from "../../hooks/usePiezasMaterialApoyo";
import useAuth from "../../hooks/useAuth";

import NuevoProducto from "./NuevoProducto";

const FormularioAgregarProducto = ({ productoEditar, editMaterialApoyo }) => {

  const [producto, setProducto] = useState({
    nombreMaterial: '',
    tipoMaterial: '',
    descripcionExtendida: '',
    existencias: 0,
    cantidadMin: 0,
    cantidadMax: 0,
    medida: '',
    alg: '',
    precioAngeles: 0,
    precioEstandar: 0,
    materialPrincipal: null,
  });

  const [materialApoyo, setMaterialApoyo] = useState({
    nombreMaterial: '',
    existencias: 0,
    tipoMaterial: '',
    descripcionExtendida: '',
    alg: '',
    precioAngeles: 0,
    precioEstandar: 0,
    precioRentaAngeles: 0,
    precioRentaEstandar: 0,
  });

  const [agregarMaterialApoyo, setAgregarMaterialApoyo] = useState(false);

  const [piezasSetMaterialApoyo, setPiezasSetMaterialApoyo] = useState([{ 
    nombrePieza: '', 
    piezasPorSet: 0,
    cantidad: 0,
    precioAngeles: 0, 
    precioEstandar: 0,
    precioRentaAngeles: 0,
    precioRentaEstandar: 0
  }]);

  
  const { productos, guardarProducto, actualizarProducto } = useProductos();
  const { guardarMaterialApoyo, editarMaterialApoyo } = useMaterialApoyo();
  const { auth, locacion, setLocacion, ejecutivo } = useAuth();
  const { guardarPiezaMaterialApoyo } = usePiezasMaterialApoyo();
  const navigate = useNavigate();
  
  const modoEdicion = productoEditar?.nombreMaterial ? true : false;

  useEffect(() => {
    if(modoEdicion) {
      if(editMaterialApoyo) {
        setMaterialApoyo(productoEditar);
      } else {
        setProducto(productoEditar);
      }
      setLocacion(productoEditar.locacion);
    }
    if(editMaterialApoyo){
      setProducto({
        nombreMaterial: '',
        tipoMaterial: '',
        descripcionExtendida: '',
        existencias: 0,
        cantidadMin: 0,
        cantidadMax: 0,
        medida: '',
        alg: '',
        precioAngeles: 0,
        precioEstandar: 0,
        materialPrincipal: null,
      });
    }else{
      setMaterialApoyo({
        nombreMaterial: '',
        existencias: 0,
        tipoMaterial: '',
        descripcionExtendida: '',
        alg: '',
      });
    }
  }, [productoEditar, editMaterialApoyo]);

  useEffect(() => {
    piezasSetMaterialApoyo.forEach(pieza => {
      pieza.cantidad = parseInt(pieza.piezasPorSet * materialApoyo.existencias);
    });
  }, [piezasSetMaterialApoyo, materialApoyo]);

  const [alerta, setAlerta] = useState({});
  
  const guardarMaterialEstandar = (producto) => {
    if (
      producto.nombreMaterial.trim() === '' ||
      producto.tipoMaterial.trim() === '' ||
      producto.descripcionExtendida.trim() === '' ||
      producto.existencias <= 0 ||
      producto.cantidadMin <= 0 ||
      producto.cantidadMax <= 0 ||
      producto.alg.trim() === ''
    ) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      return;
    }

    if(producto.cantidadMin >= producto.existencias) {
      setAlerta({
        error: true,
        msg: 'La cantidad mínima no puede ser mayor a las existencias'
      })
      return;
    }

    if(producto.cantidadMax < producto.existencias) {
      setAlerta({
        error: true,
        msg: 'La cantidad máxima no puede ser menor a las existencias'
      })
      return;
    }

    const productoGuardar = {
      ...producto, 
      locacion: modoEdicion ? (productoEditar.locacion) : (locacion || auth.locacion), 
      usuario: auth._id
    };
    
    if(modoEdicion) {
      if(editMaterialApoyo) {
        editarMaterialApoyo( productoGuardar );
      } else {
        actualizarProducto( productoEditar, productoGuardar );
      }
    } else {
      if(editMaterialApoyo) {
        guardarMaterialApoyo( productoGuardar );
      } else {
        guardarProducto( productoGuardar );
      }
    }

    setAlerta({
      msg: 'El material se ha agregado correctamente'
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 3000);
  }

  const guardarNuevoMaterialApoyo = () => {
    let piezasValidation = true;

    if(materialApoyo.nombreMaterial.trim() === '' || 
      materialApoyo.existencias <= 0 || 
      materialApoyo.tipoMaterial.trim() === '' || 
      materialApoyo.alg.trim() === '' || 
      materialApoyo.descripcionExtendida.trim() === ''){
      piezasValidation = false;
    }
        
    piezasSetMaterialApoyo.forEach(pieza => {
      if( pieza.nombrePieza.trim() === '' || pieza.cantidad <= 0 ){
        piezasValidation = false;
      }
    });

    if(!piezasValidation) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    const newMaterialApoyo = {
      ...materialApoyo,
      locacion: locacion || auth.locacion,
      usuario: auth._id,
    }

    const guardarMaterialConPiezas = async () => {
      const materialApoyoGuardado = await guardarMaterialApoyo(newMaterialApoyo);
      if(materialApoyoGuardado) {
        piezasSetMaterialApoyo.forEach(async pieza => {
          pieza.locacion = locacion || auth.locacion;
          pieza.materialApoyo = materialApoyoGuardado._id;
          pieza.usuario = auth._id;
          await guardarPiezaMaterialApoyo(pieza);
        });
      }
    }

    guardarMaterialConPiezas();

    setAlerta({
      msg: 'El material se ha agregado correctamente'
    });

    setTimeout(() => {
      setAlerta({});
    }, 3000);

    // setTimeout(() => {
    //   navigate('/inventario');
    // }, 3000);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(modoEdicion) {
      if(editMaterialApoyo) {
        // guardarNuevoMaterialApoyo(materialApoyo);
      } else {
        guardarMaterialEstandar(producto);
      }
      return;
    } else {
      if(agregarMaterialApoyo) {
        guardarNuevoMaterialApoyo();
      } else {
        guardarMaterialEstandar(producto);
      }
      return;
    }
  }
  
  const { msg } = alerta;
  
  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Datos del material</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {modoEdicion ? 'Edita los campos que necesites actualizar.' : 'Completa el formulario para agregar un nuevo material al inventario.'}
              </p>
              <NuevoProducto 
                producto={producto} 
                productos={productos}
                materialApoyo={materialApoyo}
                setMaterialApoyo={setMaterialApoyo}
                editMaterialApoyo={editMaterialApoyo}
                setProducto={setProducto} 
                ejecutivo={ejecutivo}
                agregarMaterialApoyo={agregarMaterialApoyo}
                setAgregarMaterialApoyo={setAgregarMaterialApoyo}
                piezasSetMaterialApoyo={piezasSetMaterialApoyo}
                setPiezasSetMaterialApoyo={setPiezasSetMaterialApoyo}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button 
              onClick={() => { navigate(-1) }}
              type="button" 
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:text-gray-500"
            >
              {modoEdicion ? 'Actualizar Material' : 'Guardar Material'}
            </button>
          </div>
        </form>
        {msg && <Alerta alerta={alerta} />}
      </div>
    </>
  )
}

export default FormularioAgregarProducto