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
    let indice = 0;
    let type = "";

    let ingresos = [];
    let gastos = [];

    document.getElementById("añadir").addEventListener("click", function(e){
        document.querySelector(".transacciones").addEventListener("click", function(e){
            indice = e.target.className; //Permite obtener el valor de la clase de los botones que tiene cada transacción ya que ahi se ingresa una clase con el valor del id de la transacción para poder identificarlo
            type = e.target.closest(".transaccion").dataset.tipo;
        });

        if(e.target.id == "confirmar"){
            console.log(indice, type);
            console.log(type)
            e.preventDefault()
            confirmarTransaccion(indice, type);
        }else{
            if(document.getElementById("tipo").value == "Ingreso"){
                let transaccion = new Ingreso( valor.value, descripcion.value, categoria.value);
                ingresos.push(transaccion);
                transaccion.sumarTransaccion(ingresos);
                transaccion.imprimirTransaccion(ingresos, campoIngresos);
                formatearCampo();
                console.log(ingresos);
            }else if(document.getElementById("tipo").value == "Gasto"){
                let transaccion = new Gastos(valor.value, descripcion.value, categoria.value);
                gastos.push(transaccion);
                transaccion.sumarTransaccion(gastos);
                transaccion.imprimirTransaccion(gastos, campoGastos);
                formatearCampo();
                console.log(gastos);
            }
        }
    });
    
    function confirmarTransaccion(id, type){
        if(type === "Ingreso"){
            console.log(id + " Desde confirmarTransaccion ingresos")
            let indice = ingresos.findIndex(objeto => objeto._id === Number(id));
            console.log(indice)
            if (indice !== -1) {
                // Actualizar los valores de la transacción existente en el arreglo
                ingresos[indice]._tipo = tipo.value;
                ingresos[indice]._valor = valor.value;
                ingresos[indice]._descripcion = descripcion.value;
                ingresos[indice]._categoria = categoria.value;
    
                console.log(ingresos[indice])
                // Actualizar visualmente las transacciones
                campoIngresos.innerHTML = ''; // Limpiar el campo para actualizar todo
                console.log(ingresos[indice]._tipo)
                if(ingresos[indice]._tipo != "Ingreso"){
                    // let transaccion = ingresos.splice(indice, 1)[0]
                    gastos.push(ingresos[indice]);
                    console.log(gastos)
                    ingresos.splice(indice, 1)[0]
                    gastos[indice].imprimirTransaccion(gastos, campoGastos);
                }else if(ingresos[indice]._tipo == "Ingreso"){
                    ingresos[indice].imprimirTransaccion(ingresos, campoIngresos); // Mostrar las transacciones actualizadas en su campo correspondiente (.campoIngreso o .campoGasto)
                }
            }
        }else if(type === "Gasto"){
            console.log(id + " Desde confirmarTransaccion gastos")
            let indice = gastos.findIndex(objeto => objeto._id === Number(id));
            if (indice !== -1) {
                // Actualizar los valores de la transacción existente
                gastos[indice]._tipo = tipo.value;
                gastos[indice]._valor = valor.value;
                gastos[indice]._descripcion = descripcion.value;
                gastos[indice]._categoria = categoria.value;

                // Actualizar visualmente las transacciones
                campoGastos.innerHTML = ''; // Limpiar el campo para actualizar todo
                console.log(gastos[indice]._tipo)
                if(gastos[indice]._tipo != "Gasto"){
                    ingresos.push(gastos[indice]);
                    console.log(ingresos)
                    gastos.splice(indice, 1)[0];
                    ingresos[indice].imprimirTransaccion(ingresos, campoIngresos);
                }else if(gastos[indice]._tipo == "Gasto"){
                    gastos[indice].imprimirTransaccion(gastos, campoGastos); // Mostrar las transacciones actualizadas
                }
            }
        }

        console.log(ingresos);
        console.log(gastos);
        formatearCampo();
        document.getElementById("confirmar").id = "añadir";
        document.getElementById("añadir").textContent = "Añadir";
    }

    function formatearCampo(){
        document.getElementById("tipo").selectedIndex = 0
        valor.value = "";
        descripcion.value = ""; 
        categoria.selectedIndex = 0;
    }
});