import { Link } from "react-router-dom"
import { useState } from "react";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      return setAlerta({
        error: true,
        msg: 'Ingresa un Email Válido'
      });
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', { email });

      setAlerta({
        msg: data.msg
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
                Recupera tu Password
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >Inicia Sesión
                </Link>
              </p>
            </div>

            <div className="mt-10">
              { msg && <Alerta alerta={alerta} /> }
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
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
                  <button
                    type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Recuperar Password
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full text-sm text-center">
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      ¿No tienes una cuenta?{' '}
                      <Link
                        to="/"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >Regístrate
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OlvidePassword