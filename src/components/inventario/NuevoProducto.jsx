import { useState } from "react";
import ToggleButton from "../ui/ToggleButton";

import ProductoEstandar from "./ProductoEstandar";
import MaterialApoyo from "./MaterialApoyo";

const NuevoProducto = ({ 
      producto, 
      productos, 
      materialApoyo, 
      setMaterialApoyo, 
      editMaterialApoyo,
      setEditMaterialApoyo,
      setProducto, 
      ejecutivo, 
      materialComplementario, 
      setMaterialComplementario 
  }) => {

  const [editarMaterialApoyo, setEditarMaterialApoyo] = useState(false);

  const comboBoxElements = Array.isArray(productos) ? productos.reduce((unique, item) => {
    const {nombreMaterial: label, nombreMaterial: year} = item;
    
    if (!unique.some(obj => obj.label === label && obj.year === year)) {
      unique.push({label, year});
    }
    
    return unique;
  }, []) : [];

  const comboBoxElementsPrincipal = Array.isArray(productos) ? productos.map((item) => {
    const {nombreMaterial: nombre, _id: id} = item;
    return {nombre, id};
  }) : [];
    
  return (
    <>
      {(editMaterialApoyo || editMaterialApoyo === undefined) && (
        <>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <fieldset className="col-span-full">
                <p className="text-base font-semibold leading-7 text-gray-900">Es material de apoyo</p>
                <div className="relative flex">
                  <ToggleButton 
                    enabled={editMaterialApoyo ? true : editarMaterialApoyo} 
                    setEnabled={e => setEditarMaterialApoyo(e)}
                    copy={"Selecciona esta opción si el material será registrado como material de apoyo."}
                  />
                </div>
              </fieldset>
            </div>
          </div>      
        </>
      )}

      {(!editMaterialApoyo && !editarMaterialApoyo) ? (
        <ProductoEstandar 
          producto={producto} 
          setProducto={setProducto} 
          comboBoxElements={comboBoxElements}
          ejecutivo={ejecutivo}
        />
      ) : (
        <MaterialApoyo 
          materialApoyo={materialApoyo}
          setMaterialApoyo={setMaterialApoyo}
          comboBoxElements={comboBoxElements}
          ejecutivo={ejecutivo}
        />
      )}

    </>
  )
}

export default NuevoProducto
