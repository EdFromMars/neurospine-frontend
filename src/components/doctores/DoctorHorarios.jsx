import { useEffect } from "react";
import DateTimePicker from "../ui/DateTimePicker";

const DoctorHorarios = ({doctorHorarios, setDoctorHorarios}) => {
    
  const inputFields = [];
  
  const updateInputFields = () => {
    for(let i = 0; i < doctorHorarios.length; i++) {
      inputFields.push(<DateTimePicker 
        key={i}
        stateValue={doctorHorarios[i] ? doctorHorarios[i].dia : ''}
        setStateValue={e => setDoctorHorarios({ 
            ...doctorHorarios,
            [i]: {
              ...doctorHorarios[i],
              dia: +e.target.value
            }
        })}
      />);
    }
  }
  updateInputFields();
  
  const mapState = () => {
    return (doctorHorarios || []).map( (doctorHorario, i) => {
      return (<DateTimePicker 
        key={i}
        stateValue={doctorHorarios[i] ? doctorHorarios[i].dia : ''}
        setStateValue={e => {
          let newDoctorHorarios = [...doctorHorarios];
          newDoctorHorarios[i] = {
            ...newDoctorHorarios[i],
            dia: +e.target.value
          };
          setDoctorHorarios(newDoctorHorarios);
        }}
      />)
    });
  } 

  return (
    <>
      {mapState()}
    </>
  )
}

export default DoctorHorarios