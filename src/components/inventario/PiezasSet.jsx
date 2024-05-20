import { XCircleIcon } from '@heroicons/react/20/solid'

const PiezasSet = ({index, piezasSet, setPiezasSet, ejecutivo}) => {

  const eliminarProducto = (index) => {
    const newPiezasSet = [...piezasSet];
    newPiezasSet.splice(index, 1);
    setPiezasSet(newPiezasSet);
  }
  return (
    <tr className="group">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          <input
            type="text"
            name={`material[${index}]`}
            id={`material[${index}]`}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={piezasSet[index].nombre || ''}
            onChange={e => {
              const newPiezasSet = [...piezasSet];
              newPiezasSet[index].nombre = e.target.value;
              setPiezasSet(newPiezasSet);
            } }
          />
      </td>

      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <input
          type="number"
          name={`cantidad[${index}]`}
          id={`cantidad[${index}]`}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={piezasSet[index].cantidad || 0}
          onChange={e => {
            const newPiezasSet = [...piezasSet];
            newPiezasSet[index].cantidad = e.target.value;
            setPiezasSet(newPiezasSet);
          
          }}
        />
      </td>

      {ejecutivo && (
        <>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            <input
              type="number"
              name={`precioAngeles[${index}]`}
              id={`precioAngeles[${index}]`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={piezasSet[index].precioAngeles || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].precioAngeles = e.target.value;
                setPiezasSet(newPiezasSet);
              } }
            />
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            <input
              type="number"
              name={`precioEstandar[${index}]`}
              id={`precioEstandar[${index}]`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={piezasSet[index].precioEstandar || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].precioEstandar = e.target.value;
                setPiezasSet(newPiezasSet);
              } }
            />
          </td>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            <input
              type="number"
              name={`rentaAngeles[${index}]`}
              id={`rentaAngeles[${index}]`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={piezasSet[index].rentaAngeles || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].rentaAngeles = e.target.value;
                setPiezasSet(newPiezasSet);
              } }
            />
          </td>
          <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-0">
            <input
              type="number"
              name={`rentaEstandar[${index}]`}
              id={`rentaEstandar[${index}]`}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={piezasSet[index].rentaEstandar || 0}
              onChange={e => {
                const newPiezasSet = [...piezasSet];
                newPiezasSet[index].rentaEstandar = e.target.value;
                setPiezasSet(newPiezasSet);
              } }
            />
          </td>
        </>
      )}
      <td className="relative py-4 pl-3 text-right text-sm font-semibold">
        <button
          type="button"
          className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-900 flex content-center gap-2"
          onClick={() => {
            eliminarProducto(index);
          }}
        >
          <XCircleIcon className="text-gray-400 group-hover:text-indigo-600 h-8 w-8 shrink-0" />
        </button>
      </td>
    </tr>
  )
}

export default PiezasSet