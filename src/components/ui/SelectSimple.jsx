import useAuth from "../../hooks/useAuth";

const SelectSimple = ({almacenes}) => {
  
  const { auth, setLocacion, locacion } = useAuth();
  
  return (
    <div>
      <select
        id="locacion"
        name="locacion"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => setLocacion(e.target.value)}
        value={locacion || auth.locacion}
      >
        {almacenes.map( almacenesOption => {
          return (
            <option 
            key={almacenesOption.id}
            value={almacenesOption.id}>
              {almacenesOption.nombre}
            </option>
          )
        
        })}
      </select>
    </div>
  )
}

export default SelectSimple