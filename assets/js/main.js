// Ejemplo 1
 alert("A continuacion se pedirá que ingrese un numero. Al mismo se le sumará el numero 5, 10 veces.")
let num = parseInt(prompt("Ingrese el numero:"))

for (let i=1 ; i<=10 ; i++){
    console.log(i + ": " + num + ".")
    num += 5
}
alert("Ejemplo 1 finalizado, los resultado se muestran en consola")

//Ejemplo 2
alert("Ahora, se pedira un texto en cada repeticion y se ira sumando al texto ingresado previamente. Ingresar \"esc\" finalizará el proceso")
let texto = prompt("Ingrese el texto:")
let textoTotal = ""
while (texto.toLocaleLowerCase() != "esc"){
    textoTotal += texto
    console.log(textoTotal)
    texto = prompt("Ingrese otro texto (\"esc\" para finalizar):")
}
alert("Ejemplo 2 finalizado, los resultado se muestran en consola")

//Ejemplo 3
alert("Por ultimo, ingrese un numero y se mostrará el texto \"Hola\" la cantidad de veces ingresada")
let cant = parseInt(prompt("Ingrese un numero:"))
let str = ""
for (let i=0 ; i<cant ; i++){
    str += "hola "
}
console.log(str)
alert("Ejemplo 3 finalizado, los resultado se muestran en consola")
alert("Programa finalizado")