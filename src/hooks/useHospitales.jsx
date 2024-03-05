import { useContext } from "react";
import HospitalesContext from "../context/HospitalesProvider";

const useHospitales = () => {
  return useContext(HospitalesContext);
}

export default useHospitales;