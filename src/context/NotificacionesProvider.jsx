import { useState, createContext } from "react";

const NotificacionesContext = createContext();

const NotificacionesProvider = ({ children }) => {

  const [notificaciones, setNotificaciones] = useState([]);

  return (
    <NotificacionesContext.Provider
      value={{
        notificaciones,
        setNotificaciones
      }}
    >
      {children}
    </NotificacionesContext.Provider>
  )
}

export { NotificacionesProvider }

export default NotificacionesContext;