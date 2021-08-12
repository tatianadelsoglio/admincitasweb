import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid'; /*con esto creamos id automaticamente sin tener DB, se instala ejecutando en el terminal:
npm i uuid */
import PropTypes from 'prop-types';

/* Los PropTypes es una forma de documentar los componentes, ayuda a quien viene hacer la mantencion del sistema
a saber que elementos son componentes y no los confunda con otra cosa. También son útiles para hacer Typechecking.
Y ya vienen incorporados en React.
*/


const Formulario = ({crearCita}) => {

    /*crear State de citas, donde:
    cita, es el nombre del State, es el que contiene toda la info del state.
    actualizarCita: es la funcion que va sobreescribir el State*/
    const [cita, actualizarCita]= useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    /* Función que se ejecuta cada que el usuario escribe en un input*/
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    /*Extraer valores, todos los valores entre {} son los que vienen de 'cita' ya que esta almacana toda la info del state.
    Esto nos ahorra tener que escribir "cita.mascota", "cita.propietario", etc.
    A su vez esto hay que colocarlo dentro de los elementos que correspondan con la sintaxis: value: valor. En nuestro caso
    va en los inputs. */ //APLICAMOS DESTRUCTURING.
    const { mascota, propietario, fecha, hora, sintomas } = cita;


    //Cuando el usuario presiona agregar cita. Cuando se envia el formulario

    const submitCita = (e) => {
        e.preventDefault(); /*con este comando lo que hacemos es que no se envie el mensaje por defecto con el metodo get*/

        //Validar
        
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            /*Lo que sigue nos sirve para comprobar que funciona, y se le coloca la sentencia return para que pare y no siga, código:
                console.log('Hay un eror')
                return;
            */
            actualizarError(true);
            return;
        }

        //Eliminar mensaje previo

        actualizarError(false);

        //Asiganar un ID

        cita.id = uuidv4();

        //Crear la cita. Para ellos creamos un State Principal que va a almacenar todas las citas, y este mismo lo vamos a usar en la app.js.

        crearCita(cita);

        //Reiniciar el form

        actualizarCita({

            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }


    return (
        <>
            <h2>Crear Cita</h2>

            {/*En este caso aca no se pueden usar if por lo que se debe usar un ternario: */}

            {error ? <p className='aleerta-error'>Todos los campos son obligatorios</p>   : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño de la Mascota'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type='sumit'
                    className='u-full-width button-primary'
                
                >Agregar Cita</button>

            </form>

        </>
    )



}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
