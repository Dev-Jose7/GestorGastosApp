// let objeto1 = new Ingreso("Sueldo", 3000);
// let objeto2 = new Ingreso("Pago", 4000);

// console.log(objeto1);
// console.log(objeto2);

// let objeto3 = new Gastos("Arriendo", 1400);
// let objeto4 = new Gastos("Servicios", 400);

// console.log(objeto3);
// console.log(objeto4);

// console.log(objeto2.getId()); 
// objeto2.setDescripcion("Bono");
// console.log(objeto2); 

// objeto3.setValor(1000);
// console.log(objeto3);
import Ingreso from "../controllers/operation/Ingreso.js";
import Gasto from "../controllers/operation/Gasto.js";
import User from "../controllers/account/User.js";
import { restoredInstance } from "../../assets/js/util.js";

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
console.log();

let ingresos = [];
let gastos = [];

function selectObject(vector, id){
    return vector.findIndex(transaccion => transaccion._id == id);
}

function printDefault(){
    if(Ingreso.datos.length == 0){
        campoIngresos.innerHTML = `
            <legend>Ingresos</legend>
            <p>Sin transacciones</p>`;
    }else if (Gasto.datos.length == 0){
        campoGastos.innerHTML =  `
            <legend>Gastos</legend>
            <p>Sin transacciones</p>`;
    }
}

function formatearCampo(){
    document.getElementById("tipo").selectedIndex = 0
    valor.value = "";
    descripcion.value = ""; 
    categoria.selectedIndex = 0;
    document.getElementById("añadir").style.display = "inline";
    document.getElementById("confirmar").style.display = "none";
}


if(page == "dashboard.html"){
    let account = JSON.parse(sessionStorage.getItem("account"));
    let user = restoredInstance(User, account._name, account._email, account._password);
    console.log(user);
    document.getElementById("nombre").textContent = user.getName() + " " + user.getEmail();

    document.getElementById("confirmar").style.display = "none";

    document.getElementById("añadir").addEventListener("click", function(){
        if(tipo.value == "Ingreso" && valor.value != 0){
            let transaccion = new Ingreso(user.getId(), valor.value, descripcion.value, categoria.value);
            transaccion.calcularBalance();
            transaccion.imprimirTransaccion(Ingreso.datos, campoIngresos);
            formatearCampo();
            console.log(Ingreso.datos);
        }else if(tipo.value == "Gasto" && valor.value != 0){
            let transaccion = new Gasto(user.getId(), valor.value, descripcion.value, categoria.value);
            transaccion.calcularBalance();
            transaccion.imprimirTransaccion(Gasto.datos, campoGastos);
            formatearCampo();
            console.log(Gasto.datos);
        }
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

        console.log(Ingreso.datos[0])

    });

    document.getElementById("confirmar").addEventListener("click", function(){
        if(type === "Ingreso"){
            let indice = selectObject(Ingreso.datos, id);
            Ingreso.datos[indice].confirmarTransaccion(indice, type, Ingreso.datos, campoIngresos, Gasto.datos, campoGastos);
            console.log("Ingresé")
            
        }else if(type === "Gasto"){
            let indice = selectObject(Gasto.datos, id);
            Gasto.datos[indice].confirmarTransaccion(indice, type, Gasto.datos, campoGastos, Ingreso.datos, campoIngresos);
            console.log(indice + " " + Gasto.datos[indice])
        }

        console.log(Ingreso.datos);
        console.log(Gasto.datos);
        formatearCampo();
        printDefault();
    });

    document.getElementById("cancelar").addEventListener("click", function(){
        formatearCampo();
    });
}