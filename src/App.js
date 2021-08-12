import React, {useState, useEffect} from "react";
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  //Citas en local storage.
  //IMPORTANTE: 'localStorage' solo almacena string y como nosotros le pasamos un arreglo necesito de JSON.parse para
  //pasar ese arreglo a string y sea fácil de manipular.

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  //si no hay citas iniciales como es este caso, entonces las citas iniciales van a ser iguales a un arreglo vacio. 
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas. El valor inicial de este arreglo va a ser "citasIniciales" creado en el punto anterior, esto es para poder mantenerlo en un Storage y no perder la info.
  const[citas, guardarCitas] = useState(citasIniciales);

  /* useEffect para realizar ciertas operaciones cuando el state cambia.
  El useEffect siempre es un arrow function.
  Se ejecuta cuando el componente esta listo, pero tambien cuando hay cambios en el componente. Es decir, cuando se 
  actualiza algo se vuelve a recargar. Para indicarle cuantas veces debe ejecutarse hay que pasarle el valor a través de
  un arreglo "[num]". Si queremos que se ejecute una sola vez, se pasa el arreglo vacio: [] antes del parentesis de 
  cierre y despues de una , de la sentencia anterior.
  Este useEffect lo vamos a usar para actualizar el Storage, es decir que cada vez que se cree una nueve cita o se 
  elimine, cada vez que el State cambie que tambien el storage cambie.
  Los [] son dependencias. Lo que yo le pase dentro es lo que voy a utilizar como indicador para que este se ejecute,
  en este caso le pasamos el nombre del state, cosa que cada vez que el state se actualice (se agregue o elimine una cita),
  las operaciones que se encuentran dentro del useEffect se ejecuten, por lo que en este caso, el storage se actualiza.
  */
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));

    }

  }, [citas] );


  //Función que tome las citas actuales y agregue las nuevas
  const crearCita = cita => {
    guardarCitas([...citas, cita ]); /*para crear una copia del state anterior*/
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);

  }

  //Mensaje condicional, cambia el titulo segun el caso
  const titulo = citas.length === 0 ? 'No hay citas'  : 'Administra tus Citas';


  return (
    <>
      <h1> ADMINISTRADOR DE PACIENTES</h1>
      <div className="conteiner">
          <div className="row">
            <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (

                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />

              ))}
            </div>
          </div>
      </div>

    </>
  )

}

export default App;
