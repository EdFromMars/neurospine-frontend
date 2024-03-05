import { useEffect, useState } from "react";


const almacenProvider = ({ children }) => {
  const [almacen, setAlmacen] = useState({});

  // useEffect(() => {
  //   const token = localStorage.getItem('neurospinetoken');
  // }, []);

  return (
    <AlmacenContext.Provider value={{ 
      almacen, setAlmacen 
    }}>
      {children}
    </AlmacenContext.Provider>
  );
}

export default almacenProvider;