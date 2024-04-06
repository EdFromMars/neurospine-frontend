import DateTimePicker from "../ui/DateTimePicker";

const DoctorHorarios = ({doctorHorarios, setDoctorHorarios}) => {

  const eliminarHorario = (key) => {
    const nuevosHorarios = [...doctorHorarios].filter( (horario, i) => i !== key);
    setDoctorHorarios(nuevosHorarios);
  }
  
  const deleteOption = () => {
    return doctorHorarios.length > 1;
  }

  const mostrarBotonEliminar = deleteOption();
  
  const mapState = () => {
    const campos = (doctorHorarios || []).map( (doctorHorario, i) => {
      return (<DateTimePicker 
        key={i}
        mostrarBotonEliminar={mostrarBotonEliminar}
        eliminarHorario={() => {eliminarHorario(i)}}
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