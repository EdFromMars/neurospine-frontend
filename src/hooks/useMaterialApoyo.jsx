import { useContext } from "react";
import MaterialApoyoContext from "../context/MaterialApoyoProvider";

const useMaterialApoyo = () => {
  return useContext(MaterialApoyoContext);
}

export default useMaterialApoyo;