class Task{
    constructor(title="", desc="", prio=0, date=""){
        this.title = title
        this.description = desc
        this.priority = prio // Mas bajo es menor prioridad.
        this.date = date
        this.done = false
    }
    modifyTitle(){this.title = validateLength(10, "Ingrese el titulo de la tarea")}
    markAsDone(){this.done = true}
}

class User{
    constructor(name="anon"){
        this.name = name
        this.studySeconds = 30 * 60 // 30 minutos por defecto (30*60 segundos)
        this.breakSeconds = 5 * 60 // 5 minutos por defecto (5*60segundos)
        this.pomodoros = 5 // 5 pomodoros (repeticiones) por defecto
        this.tasks = []
    }
    addTask(){
        this.tasks.push(new Task(validateLength("Ingrese el nombre de la tarea", 10)))
    }
    listTasks(){
        if (this.tasks.length == 0){ console.log("No hay tareas agregadas a la lista.") }
        else{
            this.tasks.forEach(task => console.log(task))
        }
    }
    // Metodo que permite modificar los valores 
    modifyTimer(){
        this.studySeconds = validateNumber("Ingrese la cantidad de MINUTOS que desea estudiar")*60
        this.breakSeconds = validateNumber("Ingrese la cantidad de MINUTOS que desea descansar entre cada pomodoro")*60
        this.pomodoros = validateNumber("Ingrese la cantidad de pomodoros que desea estudiar (Se recomienda entre 2 y 5)")
    }
    initTimer(){
        for (let actualPomo=1; actualPomo<=this.pomodoros; actualPomo++){
            alert("Comienza el pomodoro numero " + actualPomo + "!")
            // Se setea el tiempo de estudio y comienza el mismo.
            for(let actualTime=this.studySeconds; actualTime>=0; actualTime--){
                console.log("Estudio: " + printTime(actualTime)) // Se muestra el tiempo
            }
            // Se comprueba que no sea la ultima vuelta (ultimo pomodoro).
            if (actualPomo != this.pomodoros){
                alert("Pomodoro " + actualPomo + " finalizado, comienza el break.")
                // Se setea el tiempo de break y comienza el mismo.
                for(let actualTime=this.breakSeconds; actualTime>=0; actualTime--){
                    console.log("Break: " + printTime(actualTime)) // Se muestra el tiempo
                }
            }else {
                alert("Finalizo el estudio!")
                alert("Tiempo total estudiado: " + printTime(this.studySeconds*this.pomodoros))
            }
        }
    }
}

function validateLength(limit, text="Ingrese un texto"){
    let input
    do{
        input = prompt(text)
        if (input != "" && input.length <= limit) {break} // Para validar que el largo del nombre no pase del largo ingresado.
        alert(`Error! El dato ingresado no puede tener menos de ${limit} carácteres ni estar vacío. Intente nuevamente.`)
    } while(true)
    return input
}

// Funcion que permite validar que un texto contenga solo chars numericos
const isNumeric = input => {
    if (input == ""){return false}
    for (char of input){
        if (!"0123456789".includes(char)){return false}
    }
    return true
}

// Funcion que permite validar que un input numerico se encuentre en un rango especificado.
function validateNumber (text="Ingrese un numero", min=-Infinity, max=Infinity){
    let input
    do{
        input = prompt(text)
        if (isNumeric(input)){
            input = parseInt(input)
            if ((min <= input) && (input <= max)){break}
            else{
                alert(`Error! El numero ingresado debe estar entre ${min} y ${max}`)
            }
        }
        else{
            alert("Error! Debe ingresarse un valor numérico.")
        }
    } while (true)
    return input
}

// Funcion que extrae la cantidad de horas de una cantidad de segundos pasada como parametro.
const extractHours = (seconds) => parseInt(seconds/3600)
// Funcion que extrae la cantidad de minutos de una cantidad de segundos pasada como parametro.
const extractMinutes = (seconds) => parseInt((seconds%3600)/60) 
// Funcion que extrae la cantidad de segundos (descontando minutos y horas) de una cantidad de segundos pasada como parametro.
const extractSeconds = (seconds) => (seconds%3600)%60

// Funcion que muestra en formato reloj un tiempo determinado en segundos.
function printTime (seconds){
    let hours = extractHours(seconds)
    if (hours < 10) {hours = "0" + hours} //Para darle formato de hora "01, 02, ..., 09"
    let min = extractMinutes(seconds)
    if (min < 10) {min = "0" + min}
    let sec = extractSeconds(seconds)
    if (sec < 10) {sec = "0" + sec}
    return hours + ":" + min + ":" + sec
}

//Funcion que activa el menu principal y deriva a cualquiera de los otros menues.
function mainMenu(user){
    let option
    while(option != 0){
        option = parseInt(prompt("Ingrese una opcion: \n0- Salir \n1- Temporizador \n2- Tareas"))
        switch (option){
            case 0:
                break // Para que no muestre opcion incorrecta.
            case 1:
                //
                timerMenu(user)
                break
            case 2:
                //
                tasksMenu(user)
                break
            default:
                alert("Opcion incorrecta, intente nuevamente")
        }
    }
}

// Funcion que activa el menu del timer
function timerMenu(user){
    let option
    while(option != 0){
        option = parseInt(prompt("Ingrese una opcion: \n0- Menú anterior"))
        switch (option){
            case 0:
                break
            case 1:
                //
                alert("OPT1")
                break
            case 2:
                //
                alert("OPT2")
                break
            default:
                alert("Opcion incorrecta, intente nuevamente")
        }
    }
}
// Funcion que activa el menu del to-do list
function tasksMenu(user){
    let option
    while(option != 0){
        option = parseInt(prompt("Ingrese una opcion: \n0-Menú anterior"))
        switch (option){
            case 0:
                break
            case 1:
                //
                alert("OPT1")
                break
            case 2:
                //
                alert("OPT2")
                break
            default:
                alert("Opcion incorrecta, intente nuevamente")
        }
    }
}
let usuario = new User("Jose")
usuario.modifyTimer()