import SelectSimple from "./SelectSimple";
import { TrashIcon } from "@heroicons/react/24/outline";
import { diaSemana, horas } from "../../helpers";

const DateTimePicker = ({stateValue, setStateValue}) => {

  const eliminarHorario = () => {
    console.log('Eliminar horario');
  }

  const inputState = {...stateValue};
  
  const cambioDia = e => {
    inputState.dia = e.target.value;
    setStateValue(inputState);
  }

  const cambioEntrada = e => {
    inputState.entrada = e.target.value;
    setStateValue(inputState);
  }

  const cambioSalida = e => {
    inputState.salida = e.target.value;
    setStateValue(inputState);
  }

  return (
    <div className="horario pt-6 pb-6 grid grid-cols-1 gap-x-6 gap-y-8 border-b sm:grid-cols-6">
      <div className="sm:col-span-2">
        <label htmlFor="nombre-doctor" className="block text-sm font-medium leading-6 text-gray-900">
          Día
        </label>
        <div className="mt-2">
          <SelectSimple
            selectOptions={diaSemana}
            value={inputState.dia} 
            onChange={cambioDia}
          />
        </div>
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="zona" className="block text-sm font-medium leading-6 text-gray-900">
          Entrada
        </label>
        <div className="mt-2">
          <SelectSimple
            selectOptions={horas}
            value={inputState.entrada} 
            onChange={cambioEntrada}
          />
        </div>
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="zona" className="block text-sm font-medium leading-6 text-gray-900">
          Salida
        </label>
        <div className="mt-2">
          <SelectSimple
              selectOptions={horas}
              value={inputState.salida} 
              onChange={cambioSalida}
            />
        </div>
      </div>
      <div className="sm:col-span-1 flex justify-self-end">
        <button 
          type="button"
          href="#" 
          className="text-indigo-600 hover:text-indigo-900 flex items-end pb-2"
          onClick={eliminarHorario}
        >
          <TrashIcon className="text-gray-400 group-hover:text-indigo-600 h-4 w-4 shrink-0 mb-1 mr-2" /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default DateTimePicker