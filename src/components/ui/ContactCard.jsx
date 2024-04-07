import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';

export default function ContactCard({nombre, email, telefono, id, horario, hospital}) {
  
  let horarioDoctor = [];
  if(horario){
    horarioDoctor = JSON.parse(horario);
  }

  const dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  
  const diasCuadricula = () => {
    return dias.map((dia, key) => {
      return (
        <div key={key} className="flex w-0 flex-1">
          {diaActivo(dia, key+1)}
        </div>
      )
    })
  }

  const diaActivo = (dia, key) => {
    let active = false;
    for (let i = 0; i < horarioDoctor.length; i++) {
      if(+horarioDoctor[i].dia == +key) {
        active = true;
        break;
      }
    }
    return (
      <span className={`relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 border border-transparent py-2 text-sm font-regular text-gray-900 ${active ? 'bg-emerald-200': ''}`}
      >
        {dia}
        {active}
      </span>
    );
  }

  return (
      <li key={id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <Link 
              to={`/hospital/${hospital}/doctor/${id}`}
              className="flex items-center space-x-3"
            >
              <h3 className="font-semibold leading-7 text-gray-900 sm:truncate  sm:tracking-tight hover:text-indigo-600">{nombre}</h3>
            </Link>
            <a 
              href={`mailto:${email}`}
              className="group mt-1 truncate text-sm text-gray-500 flex flex-column gap-2 content-center align-middle hover:text-indigo-600">
              <EnvelopeIcon className="text-gray-400 group-hover:text-indigo-600 h-5 w-5 shrink-0" />
              {email}
            </a>
            <a 
              href={`tel:${telefono}`}
              className="group mt-1 truncate text-sm text-gray-500 flex flex-column gap-2 content-center align-middle hover:text-indigo-600">
              <PhoneIcon className="text-gray-400 group-hover:text-indigo-600 h-5 w-5 shrink-0" />
              {telefono}
            </a>
          </div>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            {diasCuadricula()}
          </div>
        </div>
      </li>
  )
}
