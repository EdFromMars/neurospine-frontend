import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import axios from 'axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre, email, telefono, password, repetirPassword].includes('')) {
      return setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      });
    }
    
    if(password !== repetirPassword) {
      return setAlerta({
        error: true,
        msg: 'Verifica que tu contraseña sea la misma en ambos campos'
      });
    }

    if(password.length < 6) {
      return setAlerta({ 
        error: true,
        msg: 'Tu contraseña debe tener al menos 6 caracteres'
      });
    }
    
    setAlerta({});

    try {
      const url = 'http://localhost:4000/api/usuarios/registro';
      
      const resultado = await axios.post(url, {
        nombre,
        email,
        telefono,
        password,
      });

      setAlerta({
        msg: "Creado correctamente, revisa tu email para activar tu cuenta",
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;
  
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="/padfra-logo.svg"
                alt="PADFRA"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Crea tu Cuenta y Accede al Sistema de Administración
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >Iniciar Sesión
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                  <div>
                    <label 
                      htmlFor="nombre" 
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Nombre</label>
                    <div className="mt-2">
                      <input 
                        id="nombre"
                        name="nombre"
                        type="text" 
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value = { nombre }
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Email</label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value = { email }
                        onChange = { (e) => setEmail(e.target.value) }
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="telefono" 
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Teléfono</label>
                    <div className="mt-2">
                      <input
                        id="telefono"
                        name="telefono"
                        type="text"
                        autoComplete="telefono"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value = { telefono }
                        onChange = { (e) => setTelefono(e.target.value) }
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="password" 
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Password</label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value = { password }
                        onChange = { (e) => setPassword(e.target.value) }
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="repetirPassword" 
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Repite tu Password</label>
                    <div className="mt-2">
                      <input
                        id="repetirPassword"
                        name="repetirPassword"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value = { repetirPassword }
                        onChange = { (e) => setRepetirPassword(e.target.value) }
                      />
                    </div>
                  </div>


                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleSubmit}
                    >Registrar
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-full text-sm text-center">
                      <Link
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                        to={"/olvide-password"}
                      >Olvidé mi password
                      </Link>
                    </div>
                  </div>
                  { msg && <Alerta alerta={alerta} /> }
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default Registrar