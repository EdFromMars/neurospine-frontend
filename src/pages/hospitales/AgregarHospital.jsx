import { useParams } from "react-router-dom"
import useZonas from "../../hooks/useZonas"
import FormularioAgregarHospital from "../../components/hospitales/FormularioAgregarHospital"

const AgregarHospital = () => {
  const { zonas } = useZonas()

  const id = useParams().id
  
  const zona = zonas.find(zona => zona._id === id);

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-10">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Agregar Registro en Zona {zona.nombreZona}
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full">
          <FormularioAgregarHospital zona={zona} />
        </div>
      </div>
    </>
  )
}

export default AgregarHospital