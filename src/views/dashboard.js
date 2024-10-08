import Ingreso from "../controllers/operation/Ingreso.js";
import Gasto from "../controllers/operation/Gasto.js";
import User from "../controllers/account/User.js";
import { instanceTransaction } from "../../assets/js/util.js";
import Transaccion from "../controllers/operation/Transaccion.js";
import Category from "../controllers/tag/Category.js";

let url = document.location.href;
let page = url.substring(url.lastIndexOf('/') + 1);
let tipo = document.getElementById("tipo");
let valor = document.getElementById("valor");
let descripcion = document.getElementById("descripcion");
let categoria = document.getElementById("categoria");
let campoIngresos = document.getElementById("campoIngresos");
let campoGastos = document.getElementById("campoGastos");
let id = 0;
let type = "";
let user = {};

if(page == "dashboard.html"){
    let object = JSON.parse(sessionStorage.getItem("account"));
    user = restoredUser(object._id, object._name, object._email, object._password);

    instanceTransaction(user);
    
    console.log(user);
    user.getTransactions().updateListsUser(user.getId());
    printSection();
    document.getElementById("nombre").textContent = user.getName() + " " + user.getEmail();

    document.getElementById("confirmar").style.display = "none";

    document.getElementById("añadir").addEventListener("click", function(){
        user.getTransactions().createTransaction(user.getId(), tipo.value, valor.value, descripcion.value, categoria.value);
        formatearCampo();
        printSection();
        printDefault();
        // transaccion.calcularBalance();
        console.log(user);
    });

    document.querySelector(".transacciones").addEventListener("click", function(e){
        if(e.target.closest(".transaccion")){
            id = e.target.closest(".transaccion").dataset.id; //Permite obtener el valor de la clase de los botones que tiene cada transacción ya que ahi se ingresa una clase con el valor del id de la transacción para poder identificarlo
            type = e.target.closest(".transaccion").dataset.tipo;
        }else{
            e.preventDefault();
        }

        if(e.target.id == "modificar"){
            document.getElementById("confirmar").style.display = "inline";
            document.getElementById("añadir").style.display = "none";
        }

        if(e.target.id == "eliminar"){
            printDefault();
        }

        // console.log(Ingreso.datos[0])
        console.log(type, id);
    });

    document.getElementById("confirmar").addEventListener("click", function(){
        let ingresoData = user.getTransactions().getListIngreso();
        let gastoData = user.getTransactions().getListGasto();
        
        if(type === "Ingreso"){
            let indice = selectObject(ingresoData, id);
            ingresoData[indice].confirmarTransaccion(indice, type, ingresoData, campoIngresos, gastoData, campoGastos);
            console.log("Ingresé")
            
        }else if(type === "Gasto"){
            let indice = selectObject(gastoData, id);
            gastoData[indice].confirmarTransaccion(indice, type, gastoData, campoGastos, ingresoData, campoIngresos);
            console.log(indice + " " + gastoData[indice])
        }

        console.log(ingresoData);
        console.log(gastoData);
        user.getTransactions().updateListsUser(user.getId());
        formatearCampo();
        printSection();
        printDefault();
    });

    document.getElementById("cancelar").addEventListener("click", function(){
        formatearCampo();
    });
}

//Función que reconstruye una instancia después de ser transformada nuevamente en un objeto (JSON.parse) para ser utilizada porque la instancia se encontraba almacenada en formato JSON (JSON.stringify)
//Esto se debe a que la instancia se transforma en una cadena de caracteres para almacenada en sessionStorage y ser tratada a traves de JSON. Al conventirla nuevamente en un objeto, esta no conserva sus métodos de clase; solo se almacenan los datos (propiedades).
function restoredUser(id, name, email, password){
    let user = new User(name, email, password);
    user.setId(id);
    return user;
}

function formatearCampo(){
    document.getElementById("tipo").selectedIndex = 0
    valor.value = "";
    descripcion.value = ""; 
    categoria.selectedIndex = 0;
    document.getElementById("añadir").style.display = "inline";
    document.getElementById("confirmar").style.display = "none";
}

function printSection(){
    user.getTransactions().printTransaction(user.getTransactions().getListIngreso(), campoIngresos);
    user.getTransactions().printTransaction(user.getTransactions().getListGasto(), campoGastos);
}

function printDefault(){
    if(user.getTransactions().getListIngreso().length == 0){
        campoIngresos.innerHTML = `
            <legend>Ingresos</legend>
            <p>Sin transacciones</p>`;
    }else if (user.getTransactions().getListGasto().length == 0){
        campoGastos.innerHTML =  `
            <legend>Gastos</legend>
            <p>Sin transacciones</p>`;
    }
}

function selectObject(vector, id){
    return vector.findIndex(transaccion => transaccion._id == id);
}