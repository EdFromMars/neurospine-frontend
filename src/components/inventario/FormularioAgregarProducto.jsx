import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../Alerta";
import useProductos from "../../hooks/useProductos";
import useMaterialApoyo from "../../hooks/useMaterialApoyo";
import useAuth from "../../hooks/useAuth";

import NuevoProducto from "./NuevoProducto";

const FormularioAgregarProducto = ({ productoEditar }) => {

  const [isMaterialApoyo, setIsMaterialApoyo] = useState(false);

  const [producto, setProducto] = useState({
    nombreMaterial: '',
    tipoMaterial: 'cervical',
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
    tipoMaterial: 'cervical',
    descripcionExtendida: '',
    alg: '',
    precioAngeles: 0,
    precioEstandar: 0,
    precioRentaAngeles: 0,
    precioRentaEstandar: 0,
    piezasSet: '',
  });

  const [materialComplementario, setMaterialComplementario] = useState(false);
  
  const { productos, guardarProducto, actualizarProducto } = useProductos();
  const { guardarMaterialApoyo } = useMaterialApoyo();
  const { auth, locacion, setLocacion, ejecutivo } = useAuth();
  const navigate = useNavigate();
  
  const modoEdicion = productoEditar?.nombreMaterial ? true : false;

  useEffect(() => {
    if(modoEdicion) {
      setProducto(productoEditar);
      setLocacion(productoEditar.locacion);
      if(productoEditar.materialPrincipal) {
        setMaterialComplementario(true);
      }
    }
    if(isMaterialApoyo){
      setProducto({
        nombreMaterial: '',
        tipoMaterial: 'cervical',
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
        tipoMaterial: 'cervical',
        descripcionExtendida: '',
        alg: '',
        piezasSet: '',
      });
    }
  }, [productoEditar, isMaterialApoyo]);

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
    
    modoEdicion ? actualizarProducto( productoEditar, productoGuardar ) : guardarProducto( productoGuardar );

    setAlerta({
      msg: 'El material se ha agregado correctamente'
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 3000);
  }

  const guardarNuevoMaterialApoyo = (materialApoyo) => {
    let piezasValidation = true;
    if(
      materialApoyo.nombreMaterial.trim() === '' ||
      materialApoyo.existencias <= 0 ||
      materialApoyo.alg.trim() === '' ||
      materialApoyo.descripcionExtendida.trim() === ''
    ) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      return;
    }

    materialApoyo.piezasSet.forEach(pieza => {
      if( pieza.nombre.trim() === '' || 
        pieza.cantidad <= 0
      ){
        piezasValidation = false;
        return;
      }
    });
    
    if(!piezasValidation) {
      setAlerta({
        error: true,
        msg: 'Todos los campos de las piezas son obligatorios'
      })
      return;
    }

    const newMaterialApoyo = {
      ...materialApoyo,
      locacion: locacion || auth.locacion,
      usuario: auth._id,
      piezasSet: JSON.stringify(materialApoyo.piezasSet)
    }

    guardarMaterialApoyo(newMaterialApoyo);

    setAlerta({
      msg: 'El material se ha agregado correctamente'
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 3000);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(isMaterialApoyo) {
      console.log(materialApoyo);
      guardarNuevoMaterialApoyo(materialApoyo);
    } else {
      guardarMaterialEstandar(producto);
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
                isMaterialApoyo={isMaterialApoyo}
                setIsMaterialApoyo={setIsMaterialApoyo}
                setProducto={setProducto} 
                ejecutivo={ejecutivo}
                materialComplementario={materialComplementario}
                setMaterialComplementario={setMaterialComplementario}
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
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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