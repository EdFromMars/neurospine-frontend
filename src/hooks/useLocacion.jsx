import { useContext } from "react";
import LocacionContext from "../context/LocacionProvider";

const useLocacion = () => {
  return useContext(LocacionContext);
}

export default useLocacion;

