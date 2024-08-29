import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../../hooks/useAuth";

const Login = () => {

  const { setAuth, puestos } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  // useEffect(() => {
  //   if(localStorage.getItem('neurospinetoken')){
  //     navigate('/inicio');
  //   }
  // },[]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if([ email, password ].includes('')){
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/', { email, password });

      localStorage.setItem('neurospinetoken', data.token);

      setAuth(data);
      puestos[data.puesto]();
      navigate("/inicio");
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
                Ingresa a tu Cuenta
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                ¿No tienes una cuenta?{' '}
                <Link
                  to="/registrar"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >Regístrate para poder iniciar sesión
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
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
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >Iniciar Sesión
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

export default Login