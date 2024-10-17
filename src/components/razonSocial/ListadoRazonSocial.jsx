import { useEffect, useState } from "react";
import useRazonSocial from "../../hooks/useRazonSocial"
import RazonsocialCard from "./RazonsocialCard";

const ListadoRazonSocial = () => {
  const [razonesSociales, setRazonesSociales] = useState([]);
  const { obtenerRazonSocial } = useRazonSocial();
  
  useEffect(() => {
    const mostrarRazonSocial = async () => {
      const dataRazonesSociales = await obtenerRazonSocial();
      setRazonesSociales(dataRazonesSociales);
    }
    mostrarRazonSocial();
  }, []);
    
  return (
    <>
      <div
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {razonesSociales.length? (
          <ul>
            {razonesSociales.map(razonSocial => (
              <RazonsocialCard
                key={ razonSocial._id }
                razonSocial={ razonSocial }
              />
            ))}
          </ul>
        ): (
          <div className="px-4 py-5 sm:px-6 text-sm text-gray-500">
            <p>Aún no se ha agregado ninguna razón social.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ListadoRazonSocial