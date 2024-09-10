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

    let ingresos = [];
    let gastos = [];

    document.getElementById("añadir").addEventListener("click", function(e){
        
        document.querySelector(".transacciones").addEventListener("click", function(e){
            indice = e.target.className; //Permite obtener el valor de la clase de los botones que tiene cada transacción ya que ahi se ingresa una clase con el valor del id de la transacción para poder identificarlo
        });

        if(e.target.id == "confirmar"){
            confirmarTransaccion(indice);
            console.log(indice);
            e.preventDefault()
        }else{
            if(document.getElementById("tipo").value == "ingreso"){
                let transaccion = new Ingreso( valor.value, descripcion.value, categoria.value);
                ingresos.push(transaccion);
                transaccion.sumarTransaccion(ingresos);
                transaccion.agregarTransaccion(ingresos, campoIngresos);
                formatearCampo();
                console.log(ingresos);
            }else if(document.getElementById("tipo").value == "gasto"){
                let transaccion = new Gastos(valor.value, descripcion.value, categoria.value);
                gastos.push(transaccion);
                transaccion.sumarTransaccion(gastos);
                transaccion.agregarTransaccion(gastos, campoGastos);
                formatearCampo();
                console.log(gastos);
            }
        }
    });
    
    function confirmarTransaccion(id){
        console.log(id)
        if(document.getElementById("tipo").value == "ingreso"){
            console.log(id + " Desde confirmarTransaccion")
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
                if(ingresos[indice]._tipo != "ingreso"){
                    let transaccion = ingresos.splice(indice, 1)[0]
                    gastos.push(transaccion);
                    gastos.agregarTransaccion(gastos, campoGastos);
                }else {
                    ingresos[indice].agregarTransaccion(ingresos, campoIngresos); // Mostrar las transacciones actualizadas en su campo correspondiente (.campoIngreso o .campoGasto)
                }
            }
            console.log(ingresos);
        }else if(document.getElementById("tipo").value == "gasto"){
            let indice = gastos.findIndex(objeto => objeto._id === Number(id));
            if (indice !== -1) {
                // Actualizar los valores de la transacción existente
                gastos[indice]._tipo = tipo.value;
                gastos[indice]._valor = valor.value;
                gastos[indice]._descripcion = descripcion.value;
                gastos[indice]._categoria = categoria.value;

                // Actualizar visualmente las transacciones
                campoGastos.innerHTML = ''; // Limpiar el campo para actualizar todo
                if(ingresos[indice]._tipo != "Gasto"){
                    ingresos.push(gastos[indice].agregarTransaccion(ingresos, campoIngresos));
                }else{
                    gastos[indice].agregarTransaccion(gastos, campoGastos); // Mostrar las transacciones actualizadas
                }
            }
            console.log(gastos);
        }

        formatearCampo();
        document.getElementById("confirmar").id = "añadir";
        document.getElementById("añadir").textContent = "Añadir";
    }

    // function confirmarTransaccion(id){
    //     let tipoSeleccionado = document.getElementById("tipo").value;
    //     console.log(id);
    
    //     if(tipoSeleccionado == "ingreso"){
    //         let indice = gastos.findIndex(objeto => objeto._id === Number(id));
    //         if (indice !== -1) {
    //             // Mover la transacción de gastos a ingresos
    //             let transaccion = gastos.splice(indice, 1)[0]; // Remover de gastos
    //             transaccion._tipo = "Ingreso"; // Actualizar el tipo
    //             transaccion._valor = valor.value;
    //             transaccion._descripcion = descripcion.value;
    //             transaccion._categoria = categoria.value;
    
    //             ingresos.push(transaccion); // Añadir a ingresos
    
    //             // Actualizar visualmente los ingresos y gastos
    //             campoIngresos.innerHTML = '<legend>Ingresos</legend>';
    //             campoGastos.innerHTML = '<legend>Gastos</legend>';
    //             transaccion.agregarTransaccion(ingresos, campoIngresos);
    //             transaccion.agregarTransaccion(gastos, campoGastos);
    //         }
    //     } else if(tipoSeleccionado == "gasto") {
    //         let indice = ingresos.findIndex(objeto => objeto._id === Number(id));
    //         if (indice !== -1) {
    //             // Mover la transacción de ingresos a gastos
    //             let transaccion = ingresos.splice(indice, 1)[0]; // Remover de ingresos
    //             transaccion._tipo = "Gasto"; // Actualizar el tipo
    //             transaccion._valor = valor.value;
    //             transaccion._descripcion = descripcion.value;
    //             transaccion._categoria = categoria.value;
    
    //             gastos.push(transaccion); // Añadir a gastos
    
    //             // Actualizar visualmente los ingresos y gastos
    //             campoIngresos.innerHTML = '<legend>Ingresos</legend>';
    //             campoGastos.innerHTML = '<legend>Gastos</legend>';
    //             transaccion.agregarTransaccion(ingresos, campoIngresos);
    //             transaccion.agregarTransaccion(gastos, campoGastos);
    //         }
    //     }
    
    //     formatearCampo(); // Limpiar el formulario
    //     document.getElementById("confirmar").id = "añadir";
    //     document.getElementById("añadir").textContent = "Añadir";
    // }

    function formatearCampo(){
        document.getElementById("tipo").selectedIndex = 0
        valor.value = "";
        descripcion.value = ""; 
        categoria.selectedIndex = 0;
    }
});