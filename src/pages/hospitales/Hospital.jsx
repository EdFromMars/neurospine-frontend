import { useParams } from "react-router-dom"

const Hospital = () => {
  const { id } = useParams();
  
  return (
    <div>Hospital {id}</div>
  )
}

export default Hospital