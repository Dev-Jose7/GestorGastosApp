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


document.addEventListener("DOMContentLoaded", function(){
    let tipo = document.getElementById("tipo");
    let valor = document.getElementById("valor");
    let descripcion = document.getElementById("descripcion");
    let categoria = document.getElementById("categoria");
    let campoIngresos = document.getElementById("campoIngresos");
    let campoGastos = document.getElementById("campoGastos");
    let id = 0;
    let type = "";

    let ingresos = [];
    let gastos = [];

    document.getElementById("confirmar").style.display = "none";

    document.getElementById("añadir").addEventListener("click", function(){
        if(tipo.value == "Ingreso" && valor.value != 0){
            let transaccion = new Ingreso( valor.value, descripcion.value, categoria.value);
            ingresos.push(transaccion);
            transaccion.obtenerBalance(ingresos, gastos);
            transaccion.imprimirTransaccion(ingresos, campoIngresos);
            formatearCampo();
            console.log(ingresos);
        }else if(tipo.value == "Gasto" && valor.value != 0){
            let transaccion = new Gastos(valor.value, descripcion.value, categoria.value);
            gastos.push(transaccion);
            transaccion.obtenerBalance(ingresos, gastos);
            transaccion.imprimirTransaccion(gastos, campoGastos);
            formatearCampo();
            console.log(gastos);
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
        
    });

    document.getElementById("confirmar").addEventListener("click", function(){
        if(type === "Ingreso"){
            let indice = selectObject(ingresos, id);
            ingresos[indice].confirmarTransaccion(id, type, ingresos, campoIngresos, gastos, campoGastos);
            
        }else if(type === "Gasto"){
            let indice = selectObject(gastos, id);
            gastos[indice].confirmarTransaccion(id, type, gastos, campoGastos, ingresos, campoIngresos);
        }

        console.log(ingresos);
        console.log(gastos);
        formatearCampo();
        printDefault();
    });

    document.getElementById("cancelar").addEventListener("click", function(){
        formatearCampo();
    });

    function selectObject(vector, id){
        return vector.findIndex(transaccion => transaccion._id == id);
    }

    function printDefault(){
        if(ingresos.length == 0){
            campoIngresos.innerHTML = `
                <legend>Ingresos</legend>
                <p>Sin transacciones</p>`;
        }else if (gastos.length == 0){
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
});