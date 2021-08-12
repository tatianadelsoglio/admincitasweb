import React from 'react';
import PropTypes from 'prop-types';

const Cita = ({cita, eliminarCita}) => {
    return (
        <>
            <div className='cita'>

                <p> Mascota: <span>{cita.mascota}</span> </p>
                <p> Propietario: <span>{cita.propietario}</span> </p>
                <p> Fecha: <span>{cita.fecha}</span> </p>
                <p> Hora: <span>{cita.hora}</span> </p>
                <p> Sintomas: <span>{cita.sintomas}</span> </p>

            </div>

            <button
                className="button eliminar u-full-width"
                onClick={() => eliminarCita(cita.id)} //Al usar un arrow function evitamos invocar la funcion en el instante, de este modo tiene que esperar el click para que sea llamado
            >Eliminar &times;</button>


        </>
    );

}
Cita.propTypes = {
    
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}

export default Cita;