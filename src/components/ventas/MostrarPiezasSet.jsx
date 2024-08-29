import { useState, useEffect } from 'react';
import { formatearDinero } from '../../helpers/index';

const MostrarPiezasSet = ({ indexProducto, producto, materialesApoyo, materialProgramacion, setMaterialProgramacion, tipoVenta }) => {
  const [piezasSet, setPiezasSet] = useState([]);
  const materialActual = materialProgramacion.filter(material => material.producto === producto.producto);
  console.log('materialProgramación:', materialProgramacion);
  
  useEffect(() => {
    if (materialesApoyo.length > 0) {
      const materialJSON = materialesApoyo.find(material => material._id === producto.producto).piezasSet;
      setPiezasSet(JSON.parse(materialJSON));
    }
  }, [producto.piezas]);

  useEffect(() => {
    const newMaterialProgramacion = [...materialProgramacion];
    newMaterialProgramacion[indexProducto] = { ...materialActual[0], piezasSet };
    setMaterialProgramacion(newMaterialProgramacion);
  }, [piezasSet]);
  
  //console.log('piezasSet:', piezasSet);
  const mostrarTotal = (index) => {
    const pieza = piezasSet[index];
    if (pieza.pedido !== 0) {
      return tipoVenta === 'angeles' ? pieza.precioAngeles * (pieza.pedido || 0) : pieza.precioEstandar * (pieza.pedido || 0);
    } else {
      return 0;
    }
  }

  const ListaPiezasSet = (piezasSet) => {
    if (piezasSet.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            No hay piezas
          </td>
        </tr>
      );
    } else {
      return (
        piezasSet.map((pieza, piezaIndex) => (
        <tr key={piezaIndex}>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {pieza.nombre}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {pieza.cantidad}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {formatearDinero(tipoVenta === 'angeles' ? pieza.precioAngeles : pieza.precioEstandar)}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <input 
              type="number"
              className="block w-24 p-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              step={1}
              min={0}
              max={pieza.cantidad}
              value={pieza.pedido || 0}
              onChange={(e) => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[piezaIndex] = { ...pieza, pedido: +e.target.value };
                setPiezasSet(newPiezasSet);
                console.log(materialActual[0]);
              }}
            />
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {(formatearDinero(mostrarTotal(piezaIndex)))}
          </td>
        </tr>
        )))
    }
  }

  return (
    ListaPiezasSet(piezasSet)
  );
}

export default MostrarPiezasSet;