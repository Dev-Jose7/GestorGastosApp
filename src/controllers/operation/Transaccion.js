export default class Transaccion {
    static contadorId = 0;
    static ingresos = [];
    static gastos = [];

    static transactionData = [];

    constructor(user = null, tipo = null, valor = null, descripcion = null, categoria = null) { //Parametros del constructor se asignan nulos esto con el fin de detectar mediante una condicional si se esta instanciando con o sin argumentos
        if (user && tipo && valor && descripcion && categoria) { //Si se instancia con parametros, creará un objeto el cual es una transaccion (tipo/gasto) y mediante el método que invoca al constructor (createTransaction) almacenara este objeto en el arreglo global de transacciones para así ser organizado en los arreglos del usuario
            this._id = ++Transaccion.contadorId;
            this._user = user;
            this._tipo = tipo;
            this._valor = valor;
            this._descripcion = descripcion;
            this._categoria = categoria;
            Transaccion.transactionData.push(this); //este this se refiere a la instancia que se realizo en createTransaction
        } else { //Si se instancia vacio, creará un objeto en el atributo transactions del usuario el cual almancenará los siguientes arreglos
            this._listTransactions = [];
            this._ingresos = [];
            this._gastos = [];
        }
    }

    getId() {
        return this._id;
    }

    getListTransaction() {
        return this._listTransactions;
    }

    getListIngreso() {
        return this._ingresos;
    }

    getListGasto() {
        return this._gastos;
    }

    setDescripcion(descripcion) {
        this._descripcion = descripcion;
    }

    setValor(valor) {
        this._valor = valor;
    }

    createTransaction(user, tipo, valor, descripcion, categoria) {
        let transaction = new Transaccion(user, tipo, valor, descripcion, categoria);
        //El método al ser de instancia nos asegura siempre estar dentro de la instancia contenedora (atributo transactions de la instancia User) ya que para acceder a este método de instancia es necesario tener un objeto instanciado de transaccion y el primer objeto que se instancia es el objeto contenedor transactions de la instancia de User
        //Además este método de instancia busca instanciar un nuevo objeto de transacción terminando de asegurar que siempre se cree una nueva transaccion en la instancia contenedora de transacciones de un usuario
        this.updateListsUser(transaction._user);
        console.log("Base de datos: ", Transaccion.transactionData);
    }

    updateListsUser(id) {
        this._listTransactions = Transaccion.transactionData.filter((transaction) => transaction._user == id)
        this._ingresos = this._listTransactions.filter((transaction) => transaction._tipo == "Ingreso");
        this._gastos = this._listTransactions.filter((transaction) => transaction._tipo == "Gasto");
        // console.log("Transacciones usuario: ", this._listTransactions);
        // console.log("Ingresos", this._ingresos);
        // console.log("Gastos", this._gastos);
    }

    calcularBalance() { //Método de instancia (no es estático)
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

    printTransaction(vector, container) {
        container.innerHTML = "";
        if (container.id == "campoIngresos") {
            container.innerHTML = '<legend>Ingresos</legend>';
        } else if (container.id == "campoGastos") {
            container.innerHTML = '<legend>Gastos</legend>';
        }

        for (let objeto of vector) {
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
            container.innerHTML += elemento;
        }

        this.settingTransaction(container, vector);
    }


    settingTransaction(container, vector) {
        container.addEventListener("click", (e) => {
            if (e.target.id == "eliminar") {
                let id = +e.target.closest(".transaccion").dataset.id;
                this.eliminarTransaccion(e, vector, id);
            }
        });

        container.addEventListener("click", (e) => {
            if (e.target.id == "modificar") {
                this.modificarTransaccion(e);
            }
        });
    }

    eliminarTransaccion(e, vector, id) {
        let transaccion = e.target.closest(".transaccion"); //Closest hace referencia a un elemento ascendente, se puedo señalar a traves de su clase o id
        transaccion.remove();  // Eliminar el elemento correspondiente 
        let indice = vector.findIndex(transaccion => transaccion._id === id);

        if (indice !== -1) {
            vector.splice(indice, 1);  // Eliminar la transacción del arreglo
        }

        if (e.target.closest(".transaccion").dataset.tipo == "Ingreso") {
            this.calcularBalance();
        } else if (e.target.closest(".transaccion").dataset.tipo == "Gasto") {
            this.calcularBalance();
        }

        console.log(vector)
    }

    modificarTransaccion(e) {
        if (e.target.closest(".transaccion").dataset.tipo == "Ingreso") {
            document.getElementById("tipo").selectedIndex = 1;
        } else if (e.target.closest(".transaccion").dataset.tipo == "Gasto") {
            document.getElementById("tipo").selectedIndex = 2;
        }

        document.getElementById("valor").value = e.target.closest(".transaccion").querySelector("p").textContent;
        document.getElementById("descripcion").value = e.target.closest(".transaccion").querySelector("h4").textContent;
        document.getElementById("categoria").value = e.target.closest(".transaccion").querySelector("h3").textContent;

        e.target.closest(".transaccion").style.color = "gray";

        document.getElementById("cancelar").addEventListener("click", function () {
            e.target.closest(".transaccion").style.color = "unset";
        });
    }

    confirmarTransaccion(indice, type, vector, campo, vectorUp, campoUp) {
        console.log(" Desde confirmarTransaccion ingresos")
        //Se obtiene el indice en donde se encuentra el id de la transacción en su respectivo arreglo, este id se obtiene a traves del valor de la clase establecida en el boton modificar
        console.log(indice)

        // Actualiza los valores de la t´ransacción existente en el arreglo
        vector[indice]._tipo = tipo.value;
        vector[indice]._valor = valor.value;
        vector[indice]._descripcion = descripcion.value;
        vector[indice]._categoria = categoria.value;

        console.log(vector[indice])
        // Actualiza visualmente las transacciones
        campo.innerHTML = ''; // Limpiar el campo para actualizar todo
        console.log(vector[indice]._tipo)
        if (vector[indice]._tipo != type) {
            vectorUp.push(vector[indice]);
            vector.splice(indice, 1)[0];
            vectorUp[0].printTransaction(vectorUp, campoUp);
            // this.obtenerBalance(vector, vectorUp);
            if (vector.length != 0) {
                vector[0].printTransaction(vector, campo);
            }
        } else if (vector[indice]._tipo == type) {
            vector[0].printTransaction(vector, campo); // Mostrar las transacciones actualizadas en su campo correspondiente (.campoIngreso o .campoGasto)
            // this.obtenerBalance(vectorUp, vector);
        }

        this.calcularBalance();
    }

}