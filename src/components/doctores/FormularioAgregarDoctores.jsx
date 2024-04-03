import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../ui/DateTimePicker";

const FormularioAgregarDoctores = ({hospital}) => {
  const navigate = useNavigate();

  const [dias, setDias] = useState(1);
  
  const [doctor, setDoctor] = useState({
    nombreDoctor: '',
    zona: hospital.zona || '',
    hospital: hospital._id || '',
    consultorio: '',
    horario: [
      {
        dia: 0,
        entrada: '',
        salida: ''
      }
    ]
  });
  
  useEffect(() => {
    if(hospital._id) {
      setDoctor({ 
        ...doctor, 
        hospital: hospital._id, 
        zona: hospital.zona
      });
    }
  }, [hospital]);
  
  const modoEdicion = false;
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Formulario enviado');
  }

  const diasFormulario = () => {
    const inputFields = [];
    for(let i = 0; i < dias; i++) {
      console.log(doctor.horario[i]);
      inputFields.push(<DateTimePicker 
        stateValue={doctor.horario[i] ? doctor.horario[i].dia : ''}
        setStateValue={e => setDoctor({ ...doctor, horario: { 
          ...doctor.horario, 
          [i]: { 
            ...doctor.horario[i], 
            dia: +e.target.value 
          }
        }})}
      />);
    }

    return inputFields;
  }
  
  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Datos del Doctor</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {modoEdicion ? 'Edita los campos que necesites actualizar.' : 'Completa el formulario para agregar un nuevo doctor al hospital.'}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="nombre-doctor" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre del Doctor
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="nombre-doctor"
                        id="nombre-doctor"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Nombre del doctor"
                        value={doctor.nombreDoctor}
                        onChange={e => setDoctor({ ...doctor, nombreDoctor: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="consultorio" className="block text-sm font-medium leading-6 text-gray-900">
                    Consultorio
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="consultorio"
                        id="consultorio"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Consultorio"
                        value={doctor.consultorio}
                        onChange={e => setDoctor({ ...doctor, consultorio: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Horarios de Trabajo</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Agrega los horarios en los que es posible localizarlo en su consultorio.
              </p>

              {diasFormulario()}

              <div className="flex border-t border-gray-100 pt-6">
                <button 
                  type="button" 
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() => setDias(dias + 1)}
                >
                  <span aria-hidden="true">+</span> Agregar otro horario
                </button>
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

export default FormularioAgregarDoctores