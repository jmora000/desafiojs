// Funcion que permite realizar una division no decimal.
function intDivision (num, divisor){
    const resto = num % divisor 
    return (num - resto) / divisor
}

// Funcion que extrae la cantidad de horas de una cantidad de segundos pasada como parametro.
function extractHours (seconds){
    return intDivision(seconds, 3600)
}

// Funcion que extrae la cantidad de minutos de una cantidad de segundos pasada como parametro.
function extractMinutes (seconds){
    return intDivision((seconds%3600), 60)
}

// Funcion que extrae la cantidad de segundos (descontando minutos y horas) 
// de una cantidad de segundos pasada como parametro.
function extractSeconds (seconds){
    return (seconds%3600)%60
}

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

// Inicio del codigo.
alert("Configure su reloj para utilizar el método de estudio pomodoro!")
// Variables de configuracion.
const studySeconds = (parseInt(prompt("Ingrese la cantidad de MINUTOS que desea estudiar"))) * 60
const breakSeconds = (parseInt(prompt("Ingrese la cantidad de MINUTOS que desea descansar entre cada pomodoro"))) * 60
const pomodoros = parseInt(prompt("Ingrese la cantidad de pomodoros que desea estudiar (Se recomienda entre 2 y 5)"))
const totalStudyTime = pomodoros * studySeconds

// Variables de conteo
let actualTime = 0
// Mientras no se completen los pomodoros indicados
for (let actualPomo=1; actualPomo<=pomodoros; actualPomo++){
    alert("Comienza el pomodoro numero " + actualPomo + "!")
    // Se setea el tiempo de estudio y comienza el mismo.
    actualTime = studySeconds
    for(let actualTime=studySeconds; actualTime>=0; actualTime--){
        console.log("Estudio: " + printTime(actualTime)) // Se muestra el tiempo
    }
    // Se comprueba que no sea la ultima vuelta (ultimo pomodoro).
    if (actualPomo != pomodoros){
        alert("Pomodoro " + actualPomo + " finalizado, comienza el break.")
        // Se setea el tiempo de break y comienza el mismo.
        actualTime = breakSeconds
        for(let actualTime=studySeconds; actualTime>=0; actualTime--){
            console.log("Break: " + printTime(actualTime)) // Se muestra el tiempo
        }
    }else {
        alert("Finalizo el estudio!")
        alert("Tiempo total estudiado: " + printTime(totalStudyTime))
    }
}
