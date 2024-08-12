import { useContext } from "react";
import ProgramacionContext from "../context/ProgramacionProvider";

const useProgramacion = () => {
  return useContext(ProgramacionContext);
}

export default useProgramacion;