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
    let descripcion = document.getElementById("descripcion");
    let valor = document.getElementById("valor");
    let campoIngresos = document.getElementById("campoIngresos");
    let campoGastos = document.getElementById("campoGastos");

    let ingresos = [];
    let gastos = [];

    document.getElementById("añadir").addEventListener("click", function(){
        if(document.getElementById("tipo").value == "ingreso"){
            let transaccion = new Ingreso(descripcion.value, valor.value);
            ingresos.push(transaccion);
            transaccion.agregarTransaccion(ingresos, campoIngresos);
            console.log(ingresos);
        }else if(document.getElementById("tipo").value == "gasto"){
            let transaccion = new Gastos(descripcion.value, valor.value);
            gastos.push(transaccion);
            transaccion.agregarTransaccion(gastos, campoGastos);
            console.log(gastos);
        }
    });

    let eliminarTransaccion = (e) => {
        console.log(e);
    }
});