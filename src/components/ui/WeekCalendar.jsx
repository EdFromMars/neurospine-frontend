import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WeekCalendar({ horario }) {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)
  let horarioObject = [];
  const eventos = [];

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60
    container.current.scrollTop =
      ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
        currentMinute) /
      1440
  }, [])

  if(horario !== undefined){
    horarioObject = JSON.parse(horario);
  };

  const horaInicio = (hora) => {
    return ( Number(hora.split(':')[0]) + (Number(hora.split(':')[1] / 60)) ) * 12 + 2;
  }

  const horaFin = (entrada, salida) => {
    return horaInicio(salida) - horaInicio(entrada);
  }

  horarioObject.map((horario, index) => (
    eventos.push(
      <li className={`relative mt-px sm:flex ${'col-start-' + horario.dia}`} style={{ gridRow: `${horaInicio(horario.entrada)} / span ${horaFin(horario.entrada, horario.salida)}` }}>
      <a
        href="#"
        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-200"
      >
        <p className="text-gray-500 group-hover:text-gray-700">
          <span>{horario.entrada}</span> - {''}
          <span>{horario.salida}</span>
        </p>
      </a>
    </li>
    )
  ));

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Horario de Trabajo</h1>
      </header>
      <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button type="button" className="flex flex-col items-center pb-3 pt-2">L</button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">M</button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">M</button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">J</button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">V</button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">S</button>
              <button type="button" className="flex flex-col items-center pb-3 pt-2">D</button>
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>Lun</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Mar</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Mie</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Jue</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Vie</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Sab</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Dom</span>
              </div>
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(48, minmax(1.2rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-1.25 w-14 pr-2 text-right text-xs leading-2.5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {eventos}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
