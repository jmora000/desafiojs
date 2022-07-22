class Task{
    constructor(title="", desc="", prio=0, date=""){
        this.title = title
        this.description = desc
        this.priority = prio // Mas bajo es menor prioridad.
        this.date = date
        this.done = false
    }
    setTitle(){this.title = validateLength("Ingrese el titulo de la tarea", 10)}
    setDescription(){this.description = validateLength("Ingrese la descripción de la tarea", 200)}
    setPriority(){this.priority = validateNumber("Ingrese la prioridad de la tarea. Debe ser un numero entre 1 y 5 (Mayor numero, mayor prioridad)", 1, 5)}
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
    // Metodo que permite agregar una tarea a la lista.
    addTask(){
        this.tasks.push(new Task(validateLength("Ingrese el nombre de la tarea", 20)))
    }
    // Metodo que muestra los nombres de TODAS las tareas agregadas.
    listAllTasks(){
        if (this.tasks.length == 0){ console.log("No hay tareas agregadas a la lista.") }
        else{
            this.tasks.map(task => task.title).forEach(name => console.log(name))
        }
    }
    // Metodo que muestra los nombres de las tareas que faltan por terminar.
    listRemainingTasks(){
        if (this.tasks.length == 0){ console.log("No hay tareas agregadas a la lista.") }
        else{
            this.tasks.filter(task => !task.done).map(task => task.title).forEach(name => console.log(name))
        }
    }
    // Metodo que permite modificar los valores 
    setTimer(){
        this.studySeconds = validateNumber("Ingrese la cantidad de MINUTOS que desea estudiar")*60
        this.breakSeconds = validateNumber("Ingrese la cantidad de MINUTOS que desea descansar entre cada pomodoro")*60
        this.pomodoros = validateNumber("Ingrese la cantidad de pomodoros que desea estudiar (Se recomienda entre 2 y 5)")
    }
    // Metodo que incia el timer teniendo en cuenta los atributos seteados.
    initTimer(){
        let pomoCount = document.querySelector(".dynamic-data__pomodoro")
        let timeText = document.querySelector(".dynamic-data__timer")
        for (let actualPomo=1; actualPomo<=this.pomodoros; actualPomo++){
            pomoCount.innerText = "Pomodoro " + actualPomo
            // Se setea el tiempo de estudio y comienza el mismo.
            for(let actualTime=this.studySeconds; actualTime>=0; actualTime--){
                timeText.innerText = printTime(actualTime)
                debugger
            }
            // Se comprueba que no sea la ultima vuelta (ultimo pomodoro).
            if (actualPomo != this.pomodoros){
                pomoCount.innerText = "Break " + actualPomo
                // Se setea el tiempo de break y comienza el mismo.
                for(let actualTime=this.breakSeconds; actualTime>=0; actualTime--){
                    timeText.innerText = printTime(actualTime)
                    debugger
                }
            }else {
                pomoCount.innerText = "Pomodoro Finalizado"
                timeText.innerText = "Tiempo total estudiado: " + printTime(this.studySeconds*this.pomodoros)
            }
        }
    }
    // Metodo que ordena la lista de tareas por mayor prioridad. Mayor numero mayor prioridad.
    orderByHighPrio(){
        this.tasks.sort((task1, task2) => task2.priority-task1.priority)
    }
    // Metodo que ordena la lista de taras por menor prioridad. Menor numero menor prio
    orderByLowPrio(){
        this.orderByHighPrio()
        this.tasks.reverse()
    }
}

// Funcion que permite validar si el largo de un texto no se pasa de un limite.
function validateLength(text="Ingrese un texto", limit){
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
const extractHours = (seconds) => Math.floor(seconds/3600)
// Funcion que extrae la cantidad de minutos de una cantidad de segundos pasada como parametro.
const extractMinutes = (seconds) => Math.floor((seconds%3600)/60) 
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
                break
            case 1:
                // Se abre el menu del timer
                timerMenu(user)
                break
            case 2:
                // Se abre el menu de tareas
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
        option = parseInt(prompt("Ingrese una opcion: \n0- Menú anterior \n1- Inciar sesión de estudio \n2- Modificar configuracion de los pomodoros"))
        switch (option){
            case 0:
                break
            case 1:
                //
                user.initTimer()
                break
            case 2:
                //
                user.setTimer()
                break
            default:
                alert("Opcion incorrecta, intente nuevamente")
        }
    }
}
// Funcion que activa el menu del to-do list
function tasksMenu(user){
    let option
    let taskIndex
    while(option != 0){
        option = parseInt(prompt("Ingrese una opcion: \n0-Menú anterior \n1- Listar tareas \n2- Listar tareas sin finalizar \n3- Agregar una tarea \n4- Ordenar tareas por prioridad alta primero \n5- Modificar una tarea \n6- Marcar tarea como completada"))
        switch (option){
            case 0:
                break
            case 1:
                //
                user.listAllTasks()
                break
            case 2:
                //
                user.listRemainingTasks()
                break
            case 3:
                //
                user.addTask()
                break
            case 4:
                //
                user.orderByHighPrio()
                alert("Lista ordenada por prioridad!")
                break
            case 5:
                //
                console.log("1-")
                user.listAllTasks()
                console.log(user.tasks.length + "-")
                taskIndex = validateNumber("Ingrese numero de indice de la tarea", 1, user.tasks.length)-1 // Esto va a ser optimizado, pero por temas de tiempo lo voy a hacer con los indices.
                user.tasks[taskIndex].setTitle()
                user.tasks[taskIndex].setDescription()
                user.tasks[taskIndex].setPriority()
                break
            case 6:
                console.log("1-")
                user.listAllTasks()
                console.log(user.tasks.length + "-")
                taskIndex = validateNumber("Ingrese numero de indice de la tarea", 1, user.tasks.length)-1
                user.tasks[taskIndex].markAsDone()
                alert("Tarea completada!")
                break
            default:
                alert("Opcion incorrecta, intente nuevamente")
        }
    }
}


alert("Bienvenidos a la segunda entrega del proyecto.")
alert("Debido a que no se manejar interrupciones, asincronicas, o temporizadores...")
alert("Se incluyeron sentencias 'debugger' a fin de demostrar que el temporizador funciona correctamente")
alert("Recomiendo configurar el timer a un tiempo bajo para que no sea un viaje ver el programa.")
let boton = document.querySelector(".dynamic-data__controlbox__init")
user = new User("Jose")
boton.onclick = () => {user.initTimer()}
