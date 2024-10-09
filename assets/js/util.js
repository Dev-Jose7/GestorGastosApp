import User from "../../src/controllers/account/User.js";

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


export function instanceTransaction(user){
    user.getTransactions().getManager().createTransaction(user.getId(), "Ingreso", 6500, "Pago nomina", "salario", "2024-10-08");
    user.getTransactions().getManager().createTransaction(user.getId(), "Gasto", 1400, "Alquiler casa", "arriendo", "2024-10-08");
    user.getTransactions().getManager().createTransaction(user.getId(), "Ingreso", 2150, "Comision trabajo", "bono", "2024-10-08");
    user.getTransactions().getManager().createTransaction(user.getId(), "Gasto", 450, "Factura hogar", "servicios", "2024-10-08");

    user.getTransactions().updateListsUser(user.getId());
}