class Transaccion{
    static contadorId = 0;
    static ingresos = 0;
    static gastos = 0
    constructor(tipo, valor, descripcion, categoria){
        this._id = ++Ingreso.contadorId;
        this._tipo = tipo;
        this._valor = valor;
        this._descripcion = descripcion;
        this._categoria = categoria;
    }

    getId(){
        return this._id;
    }

    setDescripcion(descripcion){
        this._descripcion = descripcion;
    }

    setValor(valor){
        this._valor = valor;
    }

    static obtenerBalance(){
        this.calcularBalance();
    }

    obtenerBalance(vectorIngreso, vectorGastos){
        this.ingresos = vectorIngreso;
        this.gastos = vectorGastos;

        console.log(this.ingresos);
        console.log(this.gastos);

        this.calcularBalance();
    }

    calcularBalance(){
        let contadorIngreso = 0;
        let contadorGasto = 0;
        let ingresoTotal = document.getElementById("valorIngreso");
        let gastoTotal = document.getElementById("valorGasto")

        if(this.ingresos.length == 0){ //Sirve para dejar valores en cero de los tipos en el balance cuando los arreglos no tengan elementos, esto por que si no tienen elementos (objetos) los arreglos, los for of no podrán recorrer dichos arreglos por que no tendrián valores 
            ingresoTotal.textContent = 0;
        }else if(this.ingresos.length != 0){
            for (const objeto of this.ingresos) {
                contadorIngreso += +objeto._valor;
                ingresoTotal.textContent = contadorIngreso;
                console.log(contadorIngreso, "Ingreso");
            }
        }
        
        if(this.gastos.length == 0){
            gastoTotal.textContent = 0
        }else if(this.gastos.length != 0){
            for (const objeto of this.gastos) {
                contadorGasto += +objeto._valor;
                gastoTotal.textContent = contadorGasto;
                console.log(contadorGasto, "Gasto");
            }
        }

        contadorIngreso = 0;
        contadorGasto = 0;

        console.log(ingresoTotal + " Ingreso")
        console.log(gastoTotal + " Gasto")
        document.getElementById("saldo").textContent = Number(ingresoTotal.textContent) - Number(gastoTotal.textContent);
        console.log(valor);
    }

    imprimirTransaccion(vector, contenedor){
        if(contenedor.id == "campoIngresos"){
            contenedor.innerHTML = '<legend>Ingresos</legend>';
        }else if(contenedor.id == "campoGastos"){
            contenedor.innerHTML = '<legend>Gastos</legend>';
        }

        for(let objeto of vector){
            let elemento = `
                <div class="transaccion" data-tipo="${objeto._tipo}" data-id="${objeto._id}">
                    <h3>${objeto._categoria}</h3>
                    <p>${objeto._valor}</p>
                    <h4>${objeto._descripcion}</h4>
                    <div>
                        <button id="modificar">Modificar</button>
                        <button id="eliminar">Eliminar</button>
                    </div>
                </div>`
            contenedor.innerHTML += elemento;
        }

        this.opcionesTransaccion(contenedor, vector);
    }

    opcionesTransaccion(contenedor, vector){
        contenedor.addEventListener("click", (e) => {
            if(e.target.id == "eliminar"){
                let id = +e.target.closest(".transaccion").dataset.id;
                this.eliminarTransaccion(e, vector, id);
            }
        });

        contenedor.addEventListener("click", (e) => {
            if(e.target.id == "modificar"){
                this.modificarTransaccion(e);
            }
        });
    }

    eliminarTransaccion(e, vector, id){
        let transaccion = e.target.closest(".transaccion"); //Closest hace referencia a un elemento ascendente, se puedo señalar a traves de su clase o id
        transaccion.remove();  // Eliminar el elemento correspondiente 
        let indice = vector.findIndex(transaccion => transaccion._id === id);

        if (indice !== -1) {
            vector.splice(indice, 1);  // Eliminar la transacción del arreglo
        }

        if(e.target.closest(".transaccion").dataset.tipo == "Ingreso"){
            this.obtenerBalance(vector, this.gastos);
        }else if(e.target.closest(".transaccion").dataset.tipo == "Gasto"){
            this.obtenerBalance(this.ingresos, vector);
        }
        console.log(vector)
    }

    modificarTransaccion(e){
        if(e.target.closest(".transaccion").dataset.tipo == "Ingreso"){
            document.getElementById("tipo").selectedIndex = 1;
        }else if(e.target.closest(".transaccion").dataset.tipo == "Gasto"){
            document.getElementById("tipo").selectedIndex = 2;
        }
        
        document.getElementById("valor").value = e.target.closest(".transaccion").querySelector("p").textContent;
        document.getElementById("descripcion").value = e.target.closest(".transaccion").querySelector("h4").textContent;
        document.getElementById("categoria").value = e.target.closest(".transaccion").querySelector("h3").textContent;

        e.target.closest(".transaccion").style.color = "gray";
        
        document.getElementById("cancelar").addEventListener("click", function(){
            e.target.closest(".transaccion").style.color = "unset";
        });
    }

    confirmarTransaccion(id, type, vector, campo, vectorUp, campoUp){
        console.log(id + " Desde confirmarTransaccion ingresos")
        let indice = vector.findIndex(objeto => objeto._id === Number(id)); //Se obtiene el indice en donde se encuentra el id de la transacción en su respectivo arreglo, este id se obtiene a traves del valor de la clase establecida en el boton modificar
        console.log(indice)
        if (indice !== -1) {
            // Actualiza los valores de la transacción existente en el arreglo
            vector[indice]._tipo = tipo.value;
            vector[indice]._valor = valor.value;
            vector[indice]._descripcion = descripcion.value;
            vector[indice]._categoria = categoria.value;

            console.log(vector[indice])
            // Actualiza visualmente las transacciones
            campo.innerHTML = ''; // Limpiar el campo para actualizar todo
            console.log(vector[indice]._tipo)
            if(vector[indice]._tipo != type){
                vectorUp.push(vector[indice]);
                vector.splice(indice, 1)[0];
                vectorUp[0].imprimirTransaccion(vectorUp, campoUp);
                // this.obtenerBalance(vector, vectorUp);
                if(vector.length != 0){
                    vector[0].imprimirTransaccion(vector, campo);
                }
            }else if(vector[indice]._tipo == type){
                vector[0].imprimirTransaccion(vector, campo); // Mostrar las transacciones actualizadas en su campo correspondiente (.campoIngreso o .campoGasto)
                // this.obtenerBalance(vectorUp, vector);
            }

            if(type == "Ingreso"){
                this.obtenerBalance(vector, vectorUp);
            }
            
            if(type == "Gasto"){
                this.obtenerBalance(vectorUp, vector);
            }
        }
    }
    
}