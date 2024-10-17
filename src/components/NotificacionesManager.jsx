import { useEffect, useCallback, useState } from 'react';
import useAuth from "../hooks/useAuth";
import useProductos from "../hooks/useProductos";
import useNotificaciones from "../hooks/useNotificaciones";

function NotificacionesManager() {
  const { actualizarAuth, locacion } = useAuth();
  const { setProductos, obtenerProductos } = useProductos();
  
  const { setNotificaciones, notificaciones } = useNotificaciones();
  
  const [eventSource, setEventSource] = useState(null);
  
  const handleSSEMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);

      setNotificaciones(prevNotificaciones => {
        const nuevasNotificaciones = [...prevNotificaciones, data];
        return nuevasNotificaciones;
      });
    } catch (error) {
      console.error('Error al procesar el evento SSE:', error);
    }
  }, [setNotificaciones]);

  const conectarSSE = useCallback(() => {
    const token = localStorage.getItem('neurospinetoken');
    if (!token) {
      return;
    }

    const nuevoEventSource = new EventSource(`http://localhost:4000/events`, {
      withCredentials: false
    });

    nuevoEventSource.onopen = () => {
    }
    
    nuevoEventSource.onmessage = handleSSEMessage;

    nuevoEventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
      nuevoEventSource.close();
      setTimeout(conectarSSE, 5000);
    }

    setEventSource(nuevoEventSource);
  }, [handleSSEMessage]);
  
  useEffect(() => {
    conectarSSE();
    
    return () => {
      if (eventSource) {
        console.log('Cerrando conexión SSE');
        eventSource.close();
      }
    };
  }, [conectarSSE]);
  
  useEffect(() => {
    if(notificaciones && notificaciones.length > 0){
      const ultimaNotificacion = notificaciones[notificaciones.length - 1];
      console.log('Actualizando auth con la última notificación:', ultimaNotificacion.collection);
      if(ultimaNotificacion.collection === 'usuarios'){
        actualizarAuth(ultimaNotificacion);
      } else if(ultimaNotificacion.collection === 'productos'){
        setProductos(obtenerProductos(locacion));
      }
    }
  }, [notificaciones, locacion]);

  return null; // Este componente no renderiza nada visualmente
}

export default NotificacionesManager;
