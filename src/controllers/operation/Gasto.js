import Transaccion from "./Transaccion.js";

export default class Gasto extends Transaccion{
    static tipo = "Gasto";
    static datos = [];
    
    constructor(user, valor, descripcion, categoria){
        super();
        super.createTransaction(user, Gasto.tipo, valor, descripcion, categoria);
        Gasto.datos.push(this); //Almacenará en el arreglo cada que se instancié un objeto
        Transaccion.gastos = Gasto.datos;
        console.log(Gasto.datos);
    }
}