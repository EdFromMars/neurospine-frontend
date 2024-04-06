import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorHorarios from "./DoctorHorarios";
import useDoctores from "../../hooks/useDoctores";

const FormularioAgregarDoctores = ({hospital}) => {
  const navigate = useNavigate();
  const { crearDoctor } = useDoctores();
  
  const [doctor, setDoctor] = useState({
    nombreDoctor: '',
    email: '',
    telefono: '',
    zona: hospital.zona || '',
    hospital: hospital._id || '',
    consultorio: '',
    horario: []
  });
  const [comentarios, setComentarios] = useState('');
  const [doctorHorarios, setDoctorHorarios] = useState([
    {
      dia: 0,
      entrada: '',
      salida: ''
    }
  ]);
  
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
    let doctorObj = {};
    
    for(const [key, value] of Object.entries(doctor)) {
      if(typeof value === 'string' && value.trim() === '') {
        console.log('Faltan campos por llenar');
        return;
      }
    }

    const validacionHorario = doctorHorarios.every(horario => {
      return Object.values(horario).every(value => {
        return typeof value === 'string' && value.trim() !== '';
      });
    });

    if(!validacionHorario){
      console.log('Faltan campos de horario por llenar');
      return;
    }

    doctorObj = {
      ...doctor,
      comentarios,
      horario: JSON.stringify(doctorHorarios)
    };

    console.log(doctorObj);

    const guardarDoctor = async () => {
      await crearDoctor(doctorObj);
      navigate(-1);
    }

    guardarDoctor();

  }
  
  return (
    <>
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
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email"
                        value={doctor.email}
                        onChange={e => setDoctor({ ...doctor, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                    Teléfono
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Teléfono"
                        value={doctor.telefono}
                        onChange={e => setDoctor({ ...doctor, telefono: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <label htmlFor="comntarios" className="block text-sm font-medium leading-6 text-gray-900">
                    Comentarios
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <textarea
                        name="comentarios"
                        id="comentarios"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Comentarios"
                        value={comentarios}
                        onChange={e => setComentarios(e.target.value)}
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

              <DoctorHorarios 
                doctorHorarios={doctorHorarios} 
                setDoctorHorarios={setDoctorHorarios}
              />

              <div className="flex border-t border-gray-100 pt-6">
                <button 
                  type="button" 
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  onClick={() => setDoctorHorarios([
                    ...Object.values(doctorHorarios || {}), 
                    { dia: 0, entrada: '', salida: '' }
                  ])}
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
              {modoEdicion ? 'Actualizar Información' : 'Guardar Doctor'}
            </button>
          </div>
        </form>
        {/* {msg && <Alerta alerta={alerta} />} */}
    </>
  )
}

export default FormularioAgregarDoctores