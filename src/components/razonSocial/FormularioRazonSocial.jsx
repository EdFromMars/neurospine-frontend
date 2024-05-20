import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRazonSocial from "../../hooks/useRazonSocial";

const modoEdicion = false;

const FormularioRazonSocial = () => {

  const [nuevaRazonSocial, setNuevaRazonSocial] = useState({
    nombre: '',
    rfc: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  const { agregarRazonSocial } = useRazonSocial();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, rfc, direccion, telefono, email } = nuevaRazonSocial;

    if (nombre.trim() === '' || rfc.trim() === '' || direccion.trim() === '' || telefono.trim() === '' || email.trim() === '') {
      console.log('Todos los campos son obligatorios');
      return;
    }

    agregarRazonSocial(nuevaRazonSocial);

    setTimeout(() => {
      navigate('/razon-social');
    }, 3000);
  }
  
  return (
    <>
      <div className="bg-white shadow sm:rounded-lg px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Datos de la Razón Social</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {modoEdicion ? 'Edita los campos que necesites actualizar.' : 'Completa el formulario para agregar una nueva razón Social.'}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="nombre-razon" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre de la Razón Social
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={nuevaRazonSocial.nombre || ''}
                      onChange={e => setNuevaRazonSocial({ ...nuevaRazonSocial, nombre: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="rfc" className="block text-sm font-medium leading-6 text-gray-900">
                    RFC
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="rfc"
                      id="rfc"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={nuevaRazonSocial.rfc || ''}
                      onChange={e => setNuevaRazonSocial({ ...nuevaRazonSocial, rfc: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                    Dirección
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="direccion"
                      id="direccion"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={nuevaRazonSocial.direccion || ''}
                      onChange={e => setNuevaRazonSocial({ ...nuevaRazonSocial, direccion: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                    Teléfono
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="telefono"
                      id="telefono"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={nuevaRazonSocial.telefono || ''}
                      onChange={e => setNuevaRazonSocial({ ...nuevaRazonSocial, telefono: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={nuevaRazonSocial.email || ''}
                      onChange={e => setNuevaRazonSocial({ ...nuevaRazonSocial, email: e.target.value })}
                    />
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
              {modoEdicion ? 'Actualizar Razón Social' : 'Guardar Razón Social'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormularioRazonSocial