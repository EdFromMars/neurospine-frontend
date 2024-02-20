import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useProductos from "../../hooks/useProductos";

import Alerta from "../Alerta";

const AgregarExistencias = ( {existencias, cantidadMax, agregarExistencias, producto} ) => {

  const [existenciasFinales, setExistenciasFinales] = useState(0);
  const [nuevasExistencias, setNuevasExistencias] = useState(0);
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const { actualizarCantidad } = useProductos();

  useEffect(() => {
    const actualizarTotal = () => {
      setExistenciasFinales(parseInt(existencias) + parseInt(nuevasExistencias) || existencias)
    }
    actualizarTotal();
  },[nuevasExistencias]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    actualizarCantidad(
      producto._id, 
      producto.existencias, 
      nuevasExistencias, 
      existenciasFinales
    );

    setAlerta({
      msg: 'Existencias actualizadas',
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 4000);
  }

  const { msg } = alerta;
  
  return (
    <>
      { msg && <Alerta 
        alerta={ alerta } 
      />}

      <form 
          onSubmit={handleSubmit} 
          className={agregarExistencias}
        >
        <div className='flex flex-row'>
          <div>
            <p>Existencias actuales</p>
            <span className="font-normal normal-case">{existencias}</span>
          </div>
          <div>
            <p>Cantidad a Agregar</p>
            <input 
              type="number" 
              className="border p-2"
              min={1}
              max={cantidadMax - existencias || 0}
              value={nuevasExistencias}
              onChange={(e) => setNuevasExistencias(+e.target.value)}
            />
          </div>
          <div>
            <p>Existencias finales</p>
            <span className="font-normal normal-case">{existenciasFinales}</span>
          </div>
        </div>
        <div className='flex gap-4'>
          <button 
            type='button'
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => setAgregarExistencias('hidden')}
          >Cancelar</button>
          <button 
            type='submit'
            className="bg-blue-500 text-white p-2 rounded-md"
          >Guardar Cambios</button>
        </div>
      </form>
    </>
  )
}

export default AgregarExistencias