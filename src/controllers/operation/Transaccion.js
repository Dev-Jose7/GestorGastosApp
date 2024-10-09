import TransactionManager from "./TransactionManager.js";
import TransactionFilter from "./TransactionFilter.js";

export default class Transaccion {
    static contadorId = 0;
    static ingresos = [];
    static gastos = [];

    static transactionData = [];

    constructor(user = null, tipo = null, valor = null, descripcion = null, categoria = null, fecha = null) { //Parametros del constructor se asignan nulos esto con el fin de detectar mediante una condicional si se esta instanciando con o sin argumentos
        if (user && tipo && valor && descripcion && categoria && fecha) { //Si se instancia con parametros, creará un objeto el cual es una transaccion (tipo/gasto) y mediante el método que invoca al constructor (createTransaction) almacenara este objeto en el arreglo global de transacciones para así ser organizado en los arreglos del usuario
            this._id = ++Transaccion.contadorId;
            this._user = user;
            this._tipo = tipo;
            this._valor = valor;
            this._descripcion = descripcion;
            this._categoria = categoria;
            this._fecha = fecha;
            Transaccion.transactionData.push(this); //este this se refiere a la instancia que se realizo en createTransaction
        } else { //Si se instancia vacio, creará un objeto en el atributo transactions del usuario el cual almancenará los siguientes arreglos
            this._listTransactions = [];
            this._ingresos = [];
            this._gastos = [];
            this._1manager = new TransactionManager();
            this._2filter = new TransactionFilter();
        }
    }

    getId() {
        return this._id;
    }

    getListTransaction() {
        return this._listTransactions;
    }

    getManager(){
        return this._1manager;
    }

    getFilter(){
        return this._2filter;
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

    updateListsUser(id) {
        this._listTransactions = Transaccion.transactionData.filter((transaction) => transaction._user == id)
        this._ingresos = this._listTransactions.filter((transaction) => transaction._tipo == "Ingreso");
        this._gastos = this._listTransactions.filter((transaction) => transaction._tipo == "Gasto");
        // console.log("Transacciones usuario: ", this._listTransactions);
        // console.log("Ingresos", this._ingresos);
        // console.log("Gastos", this._gastos);
    }

}