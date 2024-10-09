const MiembrosEquipo = ({ miembrosEquipo }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {miembrosEquipo.map((miembro) => (
            <tr key={miembro._id}>
              <td>{miembro.nombre}</td>
              <td>{miembro.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MiembrosEquipo