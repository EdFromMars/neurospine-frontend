import { XCircleIcon } from '@heroicons/react/20/solid'

const PiezasSet = ({index, piezasSet, setPiezasSet, ejecutivo}) => {

  const eliminarProducto = (index) => {
    const newPiezasSet = [...piezasSet];
    newPiezasSet.splice(index, 1);
    setPiezasSet(newPiezasSet);
  }

  return (
    <div className="grid grid-cols-[1fr,1fr,repeat(4,auto),auto] gap-4 items-center py-4 group">
      <div>
        <input
          type="text"
          name={`material[${index}]`}
          id={`material[${index}]`}
          className="w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          value={piezasSet[index].nombre || ''}
          onChange={e => {
            const newPiezasSet = [...piezasSet];
            newPiezasSet[index].nombre = e.target.value;
            setPiezasSet(newPiezasSet);
          }}
        />
      </div>

      <div>
        <input
          type="number"
          name={`cantidad[${index}]`}
          id={`cantidad[${index}]`}
          className="w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          value={piezasSet[index].cantidad || 0}
          onChange={e => {
            const newPiezasSet = [...piezasSet];
            newPiezasSet[index].cantidad = e.target.value;
            setPiezasSet(newPiezasSet);
          }}
        />
      </div>

      {ejecutivo && (
        <>
          <div>
            <input
              type="number"
              name={`precioAngeles[${index}]`}
              id={`precioAngeles[${index}]`}
              className="w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              value={piezasSet[index].precioAngeles || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].precioAngeles = e.target.value;
                setPiezasSet(newPiezasSet);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              name={`precioEstandar[${index}]`}
              id={`precioEstandar[${index}]`}
              className="w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              value={piezasSet[index].precioEstandar || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].precioEstandar = e.target.value;
                setPiezasSet(newPiezasSet);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              name={`rentaAngeles[${index}]`}
              id={`rentaAngeles[${index}]`}
              className="w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              value={piezasSet[index].rentaAngeles || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].rentaAngeles = e.target.value;
                setPiezasSet(newPiezasSet);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              name={`rentaEstandar[${index}]`}
              id={`rentaEstandar[${index}]`}
              className="w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              value={piezasSet[index].rentaEstandar || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].rentaEstandar = e.target.value;
                setPiezasSet(newPiezasSet);
              }}
            />
          </div>
        </>
      )}
      <div className="text-right">
        <button
          type="button"
          className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex items-center justify-end"
          onClick={() => eliminarProducto(index)}
        >
          <XCircleIcon className="text-gray-400 group-hover:text-indigo-600 h-8 w-8 shrink-0" />
        </button>
      </div>
    </div>
  )
}

export default PiezasSet
