export default class Transaccion{
    static contadorId = 0;
    static ingresos = [];
    static gastos = [];

    static transactionData = [];

    constructor(){}

    // constructor(tipo, valor, descripcion, categoria){
    //     this._id = ++Transaccion.contadorId;
    //     this._tipo = tipo;
    //     this._valor = valor;
    //     this._descripcion = descripcion;
    //     this._categoria = categoria;
    //     Transaccion.transactionData.push(this);

    //     console.log(Transaccion.transactionData)
    //     console.log(Transaccion.ingresos);
    //     console.log(Transaccion.gastos)
    // }

    createTransaction(user, tipo, valor, descripcion, categoria){
        this._user = user;
        this._id = ++Transaccion.contadorId;
        this._tipo = tipo;
        this._valor = valor;
        this._descripcion = descripcion;
        this._categoria = categoria;
        Transaccion.transactionData.push(this);

        console.log(Transaccion.transactionData)
        console.log(Transaccion.ingresos);
        console.log(Transaccion.gastos)
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

    calcularBalance(){ //Método de instancia (no es estático)
        let contadorIngreso = 0;
        let contadorGasto = 0;
        let ingresoTotal = document.getElementById("valorIngreso");
        let gastoTotal = document.getElementById("valorGasto");
        
        Transaccion.calcularTotal(Transaccion.ingresos, contadorIngreso, ingresoTotal, "Ingreso");
        Transaccion.calcularTotal(Transaccion.gastos, contadorGasto, gastoTotal, "Gasto");

        console.log(ingresoTotal + " Ingreso")
        console.log(gastoTotal + " Gasto")
        document.getElementById("saldo").textContent = Number(ingresoTotal.textContent) - Number(gastoTotal.textContent);
        console.log(valor);
    }

    static calcularTotal(transacciones, contador, elementoTotal, tipo) { //Metodo de clase (Estático)
        if (transacciones.length === 0) {
            elementoTotal.textContent = 0;
        } else {
            contador = 0; // Reiniciamos el contador
            for (const objeto of transacciones) {
                contador += +objeto._valor;
            }
            elementoTotal.textContent = contador;
            console.log(contador, tipo);
        }
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
            this.calcularBalance();
        }else if(e.target.closest(".transaccion").dataset.tipo == "Gasto"){
            this.calcularBalance();
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

    confirmarTransaccion(indice, type, vector, campo, vectorUp, campoUp){
        console.log(" Desde confirmarTransaccion ingresos")
         //Se obtiene el indice en donde se encuentra el id de la transacción en su respectivo arreglo, este id se obtiene a traves del valor de la clase establecida en el boton modificar
        console.log(indice)
        
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

        this.calcularBalance();
    }
    
}