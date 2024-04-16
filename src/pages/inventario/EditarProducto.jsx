import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useProductos from "../../hooks/useProductos";
import FormularioAgregarProducto from "../../components/inventario/FormularioAgregarProducto";

const EditarProducto = () => {
  
  const [producto, setProducto] = useState({});

  const { id } = useParams();
  const { mostrarProducto } = useProductos();
  
  useEffect(() => {
    const obtenerProducto = async () => {
      const data = await mostrarProducto(id);

      setProducto({
        alg: data.alg || '',
        cantidadMax: data.cantidadMax || '',
        cantidadMin: data.cantidadMin || '',
        descripcionExtendida: data.descripcionExtendida || '',
        existencias: data.existencias || '',
        materialApoyo: data.materialApoyo || false,
        medida: data.medida || '',
        nombreMaterial: data.nombreMaterial || '',
        precioAngeles: data.precioAngeles || '',
        precioEstandar: data.precioEstandar || '',
        tipoMaterial: data.tipoMaterial || '',
        locacion: data.locacion,
        materialPrincipal: data.materialPrincipal,
        _id: data._id
      });
    }
    
    obtenerProducto();
  },[]);
    
  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Editar Material
          </h2>
        </div>
      </div>
      <FormularioAgregarProducto
        productoEditar={ producto }
      />
    </>
  )
}

export default EditarProducto