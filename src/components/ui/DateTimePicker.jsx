import SelectSimple from "./SelectSimple";
import { TrashIcon } from "@heroicons/react/24/outline";

const DateTimePicker = ({stateValue, setStateValue}) => {
  const diaSemana = [
    { id: 0, nombre: 'Selecciona el día' },
    { id: 1, nombre: 'Lunes' },
    { id: 2, nombre: 'Martes' },
    { id: 3, nombre: 'Miércoles' },
    { id: 4, nombre: 'Jueves' },
    { id: 5, nombre: 'Viernes' },
    { id: 6, nombre: 'Sábado' },
    { id: 7, nombre: 'Domingo' }
  ];

  const horas = [
    {id: "00:00", value: "00:00"},
    {id: "00:30", value: "00:30"},
    {id: "01:00", value: "01:00"},
    {id: "01:30", value: "01:30"},
    {id: "02:00", value: "02:00"},
    {id: "02:30", value: "02:30"},
    {id: "03:00", value: "03:00"},
    {id: "03:30", value: "03:30"},
    {id: "04:00", value: "04:00"},
    {id: "04:30", value: "04:30"},
    {id: "05:00", value: "05:00"},
    {id: "05:30", value: "05:30"},
    {id: "06:00", value: "06:00"},
    {id: "06:30", value: "06:30"},
    {id: "07:00", value: "07:00"},
    {id: "07:30", value: "07:30"},
    {id: "08:00", value: "08:00"},
    {id: "08:30", value: "08:30"},
    {id: "09:00", value: "09:00"},
    {id: "09:30", value: "09:30"},
    {id: "10:00", value: "10:00"},
    {id: "10:30", value: "10:30"},
    {id: "11:00", value: "11:00"},
    {id: "11:30", value: "11:30"},
    {id: "12:00", value: "12:00"},
    {id: "12:30", value: "12:30"},
    {id: "13:00", value: "13:00"},
    {id: "13:30", value: "13:30"},
    {id: "14:00", value: "14:00"},
    {id: "14:30", value: "14:30"},
    {id: "15:00", value: "15:00"},
    {id: "15:30", value: "15:30"},
    {id: "16:00", value: "16:00"},
    {id: "16:30", value: "16:30"},
    {id: "17:00", value: "17:00"},
    {id: "17:30", value: "17:30"},
    {id: "18:00", value: "18:00"},
    {id: "18:30", value: "18:30"},
    {id: "19:00", value: "19:00"},
    {id: "19:30", value: "19:30"},
    {id: "20:00", value: "20:00"},
    {id: "20:30", value: "20:30"},
    {id: "21:00", value: "21:00"},
    {id: "21:30", value: "21:30"},
    {id: "22:00", value: "22:00"},
    {id: "22:30", value: "22:30"},
    {id: "23:00", value: "23:00"},
    {id: "23:30", value: "23:30"}
  ]

  console.log(horas[0]);
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
          {/* <SelectSimple
            selectOptions={horas}
            value={stateValue} 
            onChange={setStateValue}
          /> */}
        </div>
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="zona" className="block text-sm font-medium leading-6 text-gray-900">
          Salida
        </label>
        <div className="mt-2">
          <input 
            type="time" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-1 flex justify-self-end">
        <button href="#" className="text-indigo-600 hover:text-indigo-900 flex items-end pb-2">
          <TrashIcon class="text-gray-400 group-hover:text-indigo-600 h-4 w-4 shrink-0 mb-1 mr-2" /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default DateTimePicker