import { nombreIniciales } from "../../helpers"

const Avatar = ({ nombre }) => {
  return (
    <>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
        <span className="text-sm font-medium leading-none text-white">{nombreIniciales(nombre)}</span>
      </span>
    </>
  )
}

export default Avatar