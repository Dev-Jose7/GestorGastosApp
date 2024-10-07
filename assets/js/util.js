export function completeInput(array){
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i].value == ""){
            counter++;
            array[i].style.borderColor = "red";

            setTimeout(() => {
                array[i].style.borderStyle = "solid";
                array[i].style.borderColor = "unset";
            }, 3000);
        }
    }

    if(counter == 0){
        return true;
    } else {
        return false;
    }
}

export function confirmPassword(password, passwordConfirm){
    if(password == passwordConfirm){
        return true;
    } else {
        return false;
    }
}

export function initSession(account){
    if(account){
        sessionStorage.setItem("account", JSON.stringify(account)); //Se almacena el usuario a través de sessionStorage en formato JSON para leerlo más adelante.
        //Guarda la instancia en la API despues de autenticar  al usuario (confirmar si las credenciales indicadas por el cliente corresponden a un usuario almacenado en la base de datos), para ello se debe de crear una especie de variable/atributo (setItem) en la API y darle valor.
        //session y local solo almacena datos en formato de texto (String), para ello se usa el objeto global JSON, el cual sirve para el intercambio de datos entre las partes que necesiten almacenar y/o leer datos (cliente/servidor), JSON es un formato de texto que representa estructuras de datos y objetos de manera que pueden ser fácilmente leídos y entendidos.
        //JSON al ser un formato de texto se vuelve compatible para almacenar colecciones de datos en la APIs sessionStorage y localStorage, y como este formato se encuentra siendo manipulado en el objeto global JSON debemos hacer uso de este para acceder a métodos encargados de convertir los objetos en formato JSON (stringify) y transformarlos a su estado original (parse)
        setTimeout(() => {
            window.location.href = "dashboard.html"
        }, 2000);
        return true;
    } else {
        return false
    }
}

//Función que reconstruye una instancia después de ser transformada nuevamente en un objeto (JSON.parse) para ser utilizada porque la instancia se encontraba almacenada en formato JSON (JSON.stringify)
//Esto se debe a que la instancia se transforma en una cadena de caracteres para almacenada en sessionStorage y ser tratada a traves de JSON. Al conventirla nuevamente en un objeto, esta no conserva sus métodos de clase; solo se almacenan los datos (propiedades).
export function restoredInstance(clase, param1, param2, param3){
    return new clase(param1, param2, param3);
}