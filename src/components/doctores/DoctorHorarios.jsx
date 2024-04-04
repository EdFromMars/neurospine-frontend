import DateTimePicker from "../ui/DateTimePicker";

const DoctorHorarios = ({doctorHorarios, setDoctorHorarios}) => {
  
  const mapState = () => {
    const campos = (doctorHorarios || []).map( (doctorHorario, i) => {
      return (<DateTimePicker 
        key={i}
        stateValue={doctorHorario ? doctorHorario : ''}
        setStateValue={e => {
          let newDoctorHorarios = [...doctorHorarios];
          newDoctorHorarios[i] = e;
          setDoctorHorarios(newDoctorHorarios);
        }}
      />)
    });

    return campos;
  } 

  return (
    <>
      {mapState()}
    </>
  )
}

export default DoctorHorarios