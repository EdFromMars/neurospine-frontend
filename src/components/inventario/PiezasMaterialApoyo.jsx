import { XCircleIcon } from '@heroicons/react/24/outline';
import CurrencyInput from '../ui/CurrencyInput';

const PiezasMaterialApoyo = ({ pieza, index, piezasSet, setPiezasSet, ejecutivo }) => {

  const eliminarProducto = (index) => {
    const newPiezasSet = [...piezasSet];
    newPiezasSet.splice(index, 1);
    setPiezasSet(newPiezasSet);
  }
  
  return (
    <div className="group">
      <div className="grid grid-cols-9 gap-4 items-center py-2">
        <div className="col-span-3">
          <input
            type="text"
            name={`material[${index}]`}
            id={`material[${index}]`}
            className={`w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${piezasSet[index].nombre.trim() === '' ? 'bg-red-300 ring-red-300' : ''}`}
            value={piezasSet[index].nombre || ''}
            onChange={e => {
              const newPiezasSet = [...piezasSet];
              newPiezasSet[index].nombre = e.target.value;
              setPiezasSet(newPiezasSet);
            }}
          />
        </div>
        <div className="col-span-1 text-right">
          <input
            type="number"
            name={`cantidad[${index}]`}
            id={`cantidad[${index}]`}
            className={`w-full rounded-md border-0 py-1.5 text-sm text-right text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${piezasSet[index].cantidad <= 0 ? 'bg-red-300 ring-red-300' : ''}`}
            value={piezasSet[index].cantidad || 0}
            min="0"
            onChange={e => {
              const newPiezasSet = [...piezasSet];
              newPiezasSet[index].cantidad = e.target.value;
              setPiezasSet(newPiezasSet);
            }}
          />
        </div>
        {ejecutivo && (
          <>
            <div className="col-span-1 text-right">
              <CurrencyInput
                name={`precioAngeles[${index}]`}
                value={piezasSet[index].precioAngeles || 0}
                min="0"
                onChange={e => {
                  const newPiezasSet = [...piezasSet];
                  newPiezasSet[index].precioAngeles = e.target.value;
                  setPiezasSet(newPiezasSet);
                }}
                emptyError={piezasSet[index].precioAngeles <= 0}
              />
            </div>
            <div className="col-span-1 text-right">
              <CurrencyInput
                name={`precioEstandar[${index}]`}
                value={piezasSet[index].precioEstandar || 0}
                min="0"
                onChange={e => {
                  const newPiezasSet = [...piezasSet];
                  newPiezasSet[index].precioEstandar = e.target.value;
                  setPiezasSet(newPiezasSet);
                }}
                emptyError={piezasSet[index].precioEstandar <= 0}
              />
            </div>
            <div className="col-span-1 text-right">
              <CurrencyInput
                name={`rentaAngeles[${index}]`}
                value={piezasSet[index].rentaAngeles || 0}
                min="0"
                onChange={e => {
                  const newPiezasSet = [...piezasSet];
                  newPiezasSet[index].rentaAngeles = e.target.value;
                  setPiezasSet(newPiezasSet);
                }}
                emptyError={piezasSet[index].rentaAngeles <= 0}
              />
            </div>
            <div className="col-span-1 text-right">
              <CurrencyInput
                name={`rentaEstandar[${index}]`}
                value={piezasSet[index].rentaEstandar || 0}
                min="0"
                onChange={e => {
                  const newPiezasSet = [...piezasSet];
                  newPiezasSet[index].rentaEstandar = e.target.value;
                  setPiezasSet(newPiezasSet);
                }}
                emptyError={piezasSet[index].rentaEstandar <= 0}
              />
            </div>
            <div className="col-span-1 text-center">
              <button
                type="button"
                className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex items-center justify-end"
                onClick={() => eliminarProducto(index)}
              >
                  <XCircleIcon className="text-gray-400 group-hover:text-indigo-600 h-8 w-8 shrink-0" />
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PiezasMaterialApoyo