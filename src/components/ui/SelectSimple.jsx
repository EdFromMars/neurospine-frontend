const SelectSimple = ({selectOptions, value, onChange}) => {
    
  return (
    <div>
      <select
        id="locacion"
        name="locacion"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={onChange}
        value={value}
      >
        {selectOptions.map( option => {
          return (
            <option 
              key={option.id}
              value={option.id}
            >
              {option.nombre}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectSimple