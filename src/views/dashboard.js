import Ingreso from "../controllers/operation/Ingreso.js";
import Gasto from "../controllers/operation/Gasto.js";
import User from "../controllers/account/User.js";
import { instanceTransaction } from "../../assets/js/util.js";
import Transaccion from "../controllers/operation/Transaccion.js";
import Category from "../controllers/tag/Category.js";

let url = document.location.href;
let page = url.substring(url.lastIndexOf('/') + 1);
let tipo = document.getElementById("tipo");
let fecha = document.getElementById("fecha")
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
    console.log(user)
    
    document.addEventListener("DOMContentLoaded", function(){
        user.getTransactions().updateListsUser(user.getId());
        calculateBalance();
        printSection();
    });

    document.getElementById("nombre").textContent = "Bienvenido " + user.getName();

    document.getElementById("confirmar").style.display = "none";

    document.getElementById("añadir").addEventListener("click", function(){
        user.getTransactions().getManager().createTransaction(user.getId(), tipo.value, valor.value, descripcion.value, categoria.value, fecha.value);
        user.getTransactions().updateListsUser(user.getId());
        formatearCampo();
        printSection();
        calculateBalance();
        console.log(user);
    });


    document.querySelector(".transacciones").addEventListener("click", function(e) {

        if(e.target.tagName == "BUTTON"){
            let button = e.target;

            if(button.className == "modificar") {
                console.log("Modificando");
                document.getElementById("confirmar").style.display = "inline";
                document.getElementById("añadir").style.display = "none";
                id = button.closest(".transaccion").dataset.id;
                editTransaction(button);
            }
        
            if(button.className == "eliminar") {
                console.log("Eliminando");
                id = button.closest(".transaccion").dataset.id;
                user.getTransactions().getManager().deleteTransaction(id, button.closest(".transaccion"));
                user.getTransactions().updateListsUser(user.getId());
                calculateBalance();
                printSection();
            }
            
        }
    });

    document.getElementById("confirmar").addEventListener("click", function(){
        user.getTransactions().getManager().updateTransaction(id)
        user.getTransactions().updateListsUser(user.getId());
        calculateBalance();
        formatearCampo();
        printSection();
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
    user.getTransactions().getManager().printTransaction(user.getTransactions().getListIngreso(), campoIngresos);
    user.getTransactions().getManager().printTransaction(user.getTransactions().getListGasto(), campoGastos);
    printDefault();
}

function printDefault(){
    if(user.getTransactions().getListIngreso().length == 0){
        campoIngresos.innerHTML = `
            <legend>Ingresos</legend>
            <p>Sin transacciones</p>`;
    }

    if(user.getTransactions().getListGasto().length == 0){
            campoGastos.innerHTML =  `
            <legend>Gastos</legend>
            <p>Sin transacciones</p>`;
    }
}

function editTransaction(e) {
    let transactionNode = document.querySelectorAll(".transaccion")
    let transactionList = [...transactionNode];
    transactionList.forEach(transaction => transaction.style.color = "#000")
    e.closest(".transaccion").style.color = "gray";


    if (e.closest(".transaccion").dataset.tipo == "Ingreso") {
        document.getElementById("tipo").selectedIndex = 1;
    } else if (e.closest(".transaccion").dataset.tipo == "Gasto") {
        document.getElementById("tipo").selectedIndex = 2;
    }

    document.getElementById("valor").value = e.closest(".transaccion").querySelector("p").textContent;
    document.getElementById("descripcion").value = e.closest(".transaccion").querySelector("h4").textContent;
    document.getElementById("categoria").value = e.closest(".transaccion").querySelector("h3").textContent;

    document.getElementById("cancelar").addEventListener("click", function () {
        e.closest(".transaccion").style.color = "unset";
    });
}

function calculateBalance() {
    let ingresoTotal = document.getElementById("valorIngreso");
    let gastoTotal = document.getElementById("valorGasto");

    user.getBalance(user.getTransactions().getListIngreso(), ingresoTotal);
    user.getBalance(user.getTransactions().getListGasto(), gastoTotal);

    document.getElementById("saldo").textContent = Number(ingresoTotal.textContent) - Number(gastoTotal.textContent);
}