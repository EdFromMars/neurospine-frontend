import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";
import useProductos from "../../hooks/useProductos";
import useAuth from "../../hooks/useAuth";

const EditarProducto = () => {
  
  const [producto, setProducto] = useState({});
  const [nombreMaterial, setNombreMaterial] = useState('');
  const [tipoMaterial, setTipoMaterial] = useState('cervical');
  const [materialApoyo, setMaterialApoyo] = useState(false);
  const [descripcionExtendida, setDescripcionExtendida] = useState('');
  const [existencias, setExistencias] = useState(0);
  const [cantidadMin, setCantidadMin] = useState(0);
  const [cantidadMax, setCantidadMax] = useState(0);
  const [medida, setMedida] = useState('');
  const [alg, setAlg] = useState('');
  const [precioAngeles, setPrecioAngeles] = useState(0);
  const [precioEstandar, setPrecioEstandar] = useState(0);
  const [alerta, setAlerta] = useState({});

  const { auth, guardarBitacora } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { actualizarProducto, mostrarProducto } = useProductos();

  useEffect(() => {
    const obtenerProducto = async () => {
      const data = await mostrarProducto(id);
      setProducto(data);

      setNombreMaterial(data.nombreMaterial);
      setTipoMaterial(data.tipoMaterial);
      setMaterialApoyo(data.materialApoyo);
      setDescripcionExtendida(data.descripcionExtendida);
      setExistencias(data.existencias);
      setCantidadMin(data.cantidadMin);
      setCantidadMax(data.cantidadMax);
      setMedida(data.medida);
      setAlg(data.alg);
      setPrecioAngeles(data.precioAngeles);
      setPrecioEstandar(data.precioEstandar);
    }
    
    obtenerProducto();
  },[]);
    
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nombreMaterial.trim() === '' ||
      tipoMaterial.trim() === '' ||
      descripcionExtendida.trim() === '' ||
      existencias <= 0 ||
      cantidadMin <= 0 ||
      cantidadMax <= 0 ||
      medida.trim() === '' ||
      alg.trim() === '' ||
      precioAngeles <= 0 ||
      precioEstandar <= 0
    ) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      return;
    }

    if(cantidadMin >= existencias) {
      setAlerta({
        error: true, 
        msg: 'La cantidad mínima no puede ser mayor a las existencias'
      })
      return;
    }

    if(cantidadMax < existencias) {
      setAlerta({
        error: true,
        msg: 'La cantidad máxima no puede ser menor a las existencias'
      })
      return;
    }
    
    const productoActualizado = { 
      nombreMaterial,
      tipoMaterial,
      materialApoyo,
      descripcionExtendida,
      existencias,
      cantidadMin,
      cantidadMax,
      medida,
      alg,
      precioAngeles,
      precioEstandar,
      _id: id,
      usuario: auth._id
    }

    actualizarProducto(producto, productoActualizado);
    
    setAlerta({
      msg: 'El material se ha agregado correctamente'
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 3000);
  }
  
  const { msg } = alerta;
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="nombre-material"
            className="text-gray-700 uppercase font-bold" 
          >Nombre del Material</label >
          <input
            type="text"
            id="nombre-material"
            placeholder="Nombre del Material"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={ nombreMaterial }
            onChange={(e) => setNombreMaterial(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="tipo-material"
            className="text-gray-700 uppercase font-bold" 
          >Tipo de Material</label >
          <select 
            name="tipo-material" 
            className="p-2 border-2 border-gray-300 rounded-lg bg-white"
            value={tipoMaterial}
            onChange={(e) => setTipoMaterial(e.target.value)}
          >
            <option value="cervical">Cervical</option>
            <option value="lumbar">Lumbar</option>
          </select>
        </div>
        <div className="flex flex-row mb-5">
          <label
            htmlFor="material-apoyo"
            className="text-gray-700 uppercase font-bold" 
          >Es Material de apoyo</label >
          <input
            type="checkbox"
            id="material-apoyo"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={materialApoyo}
            onChange={(e) => setMaterialApoyo(e.target.checked)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="descripcion-extendida"
            className="text-gray-700 uppercase font-bold" 
          >Descripción Extendida</label >
          <textarea
            id="descripcion-extendida"
            placeholder="Descripción Extendida del Material"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={descripcionExtendida}
            onChange={(e) => setDescripcionExtendida(e.target.value)}
          />
        </div>
        <div className="flex flex-row mb-5 gap-2">
          <div className="flex flex-col grow mb-5">
            <label
              htmlFor="existencias"
              className="text-gray-700 uppercase font-bold" 
            >Existencias</label >
            <input
              type="number"
              id="existencias"
              min={1}
              placeholder="0"
              className="p-2 border-2 border-gray-300 rounded-lg"
              value={existencias}
              onChange={(e) => setExistencias(+e.target.value)}
            />
          </div>
          <div className="flex flex-col grow mb-5">
            <label
              htmlFor="cantidad-min"
              className="text-gray-700 uppercase font-bold" 
            >Cantidad Mínima</label >
            <input
              type="number"
              id="cantidad-min"
              min={1}
              placeholder="0"
              className="p-2 border-2 border-gray-300 rounded-lg"
              value={cantidadMin}
              onChange={(e) => setCantidadMin(+e.target.value)}
            />
          </div>
          <div className="flex flex-col grow mb-5">
            <label
              htmlFor="cantidad-max"
              className="text-gray-700 uppercase font-bold" 
            >Cantidad Máxima</label >
            <input
              type="number"
              id="cantidad-max"
              min={1}
              placeholder="0"
              className="p-2 border-2 border-gray-300 rounded-lg"
              value={cantidadMax}
              onChange={(e) => setCantidadMax(+e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="medida"
            className="text-gray-700 uppercase font-bold" 
          >Medida</label >
          <input
            type="text"
            id="medida"
            placeholder="Medida"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="alg"
            className="text-gray-700 uppercase font-bold" 
          >Alg</label >
          <input
            type="text"
            id="alg"
            placeholder="ALG"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={alg}
            onChange={(e) => setAlg(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="precio-angeles"
            className="text-gray-700 uppercase font-bold" 
          >Precio Grupo Ángeles</label >
          <input
            type="number"
            id="precio-angeles"
            min={1}
            placeholder="0"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={precioAngeles}
            onChange={(e) => setPrecioAngeles(+e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="precio-estandar"
            className="text-gray-700 uppercase font-bold" 
          >Precio Estándar</label >
          <input
            type="number"
            id="precio-estandar"
            min={1}
            placeholder="0"
            className="p-2 border-2 border-gray-300 rounded-lg"
            value={precioEstandar}
            onChange={(e) => setPrecioEstandar(+e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          value="Guardar Material"
          className="bg-indigo-600 text-white w-full p-3 mt-3 cursor-pointer hover:bg-indigo-700 transition-all duration-200"
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  )
}

export default EditarProducto