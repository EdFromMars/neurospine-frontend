export default function CurrencyInput({ name, value, onChange, emptyError }) {
  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        id={name}
        name={name}
        type="number"
        placeholder="0.00"
        aria-describedby="price-currency"
        min="0"
        step="0.01"
        className={`block w-full rounded-md border-0 py-1.5 pl-7 text-right text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${emptyError ? 'bg-red-300 ring-red-300' : ''}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
