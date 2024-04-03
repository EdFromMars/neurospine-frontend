import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { 
  InformationCircleIcon,
  PlusCircleIcon 
} from '@heroicons/react/24/outline';
import SelectSimple from './ui/SelectSimple';

import { classNames, currentNavItem, nombreIniciales } from '../helpers';

const Sidebar = ({ navigation, almacenes, zonas, pathname }) => {
  const { auth, setLocacion, locacion } = useAuth();
  
  const selectOptions = almacenes.map( almacenesOption => ({
    id : almacenesOption.id, 
    nombre : almacenesOption.nombre
  }))

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="/padfra-logo.svg"
            alt="PADFRA"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li key="main-nav">
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={classNames(
                        currentNavItem(item, pathname)
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          currentNavItem(item, pathname) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li key="almacenes">
              <div className="text-xs font-semibold leading-6 text-gray-400">Almacén</div>
              <SelectSimple 
                selectOptions={selectOptions}
                value={locacion || auth.locacion}
                onChange={(e) => setLocacion(e.target.value)}
              />
            </li>
            <li key="zonas">
              <Link to={'/zonas'} className="text-xs font-semibold leading-6 text-gray-400">Zonas</Link>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {!zonas.length ?
                  <li key="agregar-zona">
                    <Link
                      to={'/zonas/agregar'}
                      className={classNames('text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <span
                        className={classNames('text-gray-400 group-hover:text-indigo-600',
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium bg-white'
                        )}
                      >
                        <PlusCircleIcon />
                      </span>
                      <span className="truncate">Agregar Zona</span>
                    </Link>
                  </li>
                :
                zonas.map((zona) => (
                  <li key={zona.nombreZona}>
                    <Link
                      to={`/zonas/${zona._id}`}
                      className={classNames(
                        zona.current
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <span
                        className={classNames(
                          zona.current
                            ? 'text-indigo-600 border-indigo-600'
                            : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                        )}
                      >
                        {nombreIniciales(zona.nombreZona)}
                      </span>
                      <span className="truncate">{zona.nombreZona}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              >
                <InformationCircleIcon 
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                  aria-hidden="true"
                />
                Acerca de
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar