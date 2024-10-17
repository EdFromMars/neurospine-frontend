import { useContext } from "react";
import PiezasMaterialApoyoContext from "../context/PiezasMaterialApoyoProvider";

const usePiezasMaterialApoyo = () => {
  return useContext(PiezasMaterialApoyoContext);
}

export default usePiezasMaterialApoyo;