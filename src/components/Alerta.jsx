
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-red-500' : 'bg-green-600'} flex w-full text-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm `}>
      {alerta.msg}
    </div>
  )
}

export default Alerta