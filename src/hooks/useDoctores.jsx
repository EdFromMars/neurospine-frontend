import { useContext } from "react";
import DoctoresContext from "../context/DoctoresProvider";

const useDoctores = () => {
  return useContext(DoctoresContext);
}

export default useDoctores;