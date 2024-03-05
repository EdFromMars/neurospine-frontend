import { useContext } from "react";
import ZonasContext from "../context/ZonasProvider";

const useZonas = () => {
  return useContext(ZonasContext);
}

export default useZonas;