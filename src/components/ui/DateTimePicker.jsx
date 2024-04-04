import SelectSimple from "./SelectSimple";
import { TrashIcon } from "@heroicons/react/24/outline";

const DateTimePicker = ({stateValue, setStateValue}) => {
  const diaSemana = [
    { id: 0, display: 'Selecciona el día' },
    { id: 1, display: 'Lunes' },
    { id: 2, display: 'Martes' },
    { id: 3, display: 'Miércoles' },
    { id: 4, display: 'Jueves' },
    { id: 5, display: 'Viernes' },
    { id: 6, display: 'Sábado' },
    { id: 7, display: 'Domingo' }
  ];

  const horas = [
    {id: "00:00", display: "00:00"},
    {id: "00:30", display: "00:30"},
    {id: "01:00", display: "01:00"},
    {id: "01:30", display: "01:30"},
    {id: "02:00", display: "02:00"},
    {id: "02:30", display: "02:30"},
    {id: "03:00", display: "03:00"},
    {id: "03:30", display: "03:30"},
    {id: "04:00", display: "04:00"},
    {id: "04:30", display: "04:30"},
    {id: "05:00", display: "05:00"},
    {id: "05:30", display: "05:30"},
    {id: "06:00", display: "06:00"},
    {id: "06:30", display: "06:30"},
    {id: "07:00", display: "07:00"},
    {id: "07:30", display: "07:30"},
    {id: "08:00", display: "08:00"},
    {id: "08:30", display: "08:30"},
    {id: "09:00", display: "09:00"},
    {id: "09:30", display: "09:30"},
    {id: "10:00", display: "10:00"},
    {id: "10:30", display: "10:30"},
    {id: "11:00", display: "11:00"},
    {id: "11:30", display: "11:30"},
    {id: "12:00", display: "12:00"},
    {id: "12:30", display: "12:30"},
    {id: "13:00", display: "13:00"},
    {id: "13:30", display: "13:30"},
    {id: "14:00", display: "14:00"},
    {id: "14:30", display: "14:30"},
    {id: "15:00", display: "15:00"},
    {id: "15:30", display: "15:30"},
    {id: "16:00", display: "16:00"},
    {id: "16:30", display: "16:30"},
    {id: "17:00", display: "17:00"},
    {id: "17:30", display: "17:30"},
    {id: "18:00", display: "18:00"},
    {id: "18:30", display: "18:30"},
    {id: "19:00", display: "19:00"},
    {id: "19:30", display: "19:30"},
    {id: "20:00", display: "20:00"},
    {id: "20:30", display: "20:30"},
    {id: "21:00", display: "21:00"},
    {id: "21:30", display: "21:30"},
    {id: "22:00", display: "22:00"},
    {id: "22:30", display: "22:30"},
    {id: "23:00", display: "23:00"},
    {id: "23:30", display: "23:30"}
  ]

  const eliminarHorario = () => {
    console.log('Eliminar horario');
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
            value={stateValue} 
            onChange={setStateValue}
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
            value={stateValue} 
            onChange={setStateValue}
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
              value={stateValue} 
              onChange={setStateValue}
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