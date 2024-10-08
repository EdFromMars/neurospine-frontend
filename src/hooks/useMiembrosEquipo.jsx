import { useContext } from "react";
import MiembrosEquipoContext from "../context/MiembrosEquipoProvider";

const useMiembrosEquipo = () => {
  return useContext(MiembrosEquipoContext);
}

export default useMiembrosEquipo;