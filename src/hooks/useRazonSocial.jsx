import { useContext } from "react";
import RazonSocialContext from "../context/RazonSocialProvider";

const useRazonSocial = () => {
  return useContext(RazonSocialContext);
}

export default useRazonSocial;