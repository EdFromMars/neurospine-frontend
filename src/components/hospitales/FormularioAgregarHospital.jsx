import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useHospitales from "../../hooks/useHospitales";

const FromularioAgregarHospital = ({zona}) => {
  const navigate = useNavigate();
  const { crearHospital } = useHospitales();

  if(!zona) {
    navigate('/zonas');
  }

  const [hospital, setHospital] = useState({
    nombreHospital: '',
    zona: zona._id,
  })
  
  const modoEdicion = false;

  console.log(hospital)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(hospital.nombreHospital.trim() === '') {
      return;
    }
          
    crearHospital(hospital);

    setTimeout(() => {
      navigate(-1);

    }, 3000);
  }
  
  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Datos del Hospital</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {modoEdicion ? 'Edita los campos que necesites actualizar.' : 'Completa el formulario para agregar un nuevo material al inventario.'}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="nombre-hospital" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre del Hospital
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="nombre-hospital"
                        id="nombre-hospital"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Nombre de la Zona"
                        value={hospital.nombreHospital}
                        onChange={e => setHospital({ ...hospital, nombreHospital: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="nombre-hospital" className="block text-sm font-medium leading-6 text-gray-900">
                    Zona del Hospital
                  </label>
                  <div className="mt-2">
                    <p className="text-base font-semibold leading-7 text-gray-900">{zona.nombreZona}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button 
              onClick={() => { navigate(-1) }}
              type="button" 
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {modoEdicion ? 'Actualizar Hospital' : 'Guardar Hospital'}
            </button>
          </div>
        </form>
        {/* {msg && <Alerta alerta={alerta} />} */}
      </div>
    </>
  )
}

export default FromularioAgregarHospital