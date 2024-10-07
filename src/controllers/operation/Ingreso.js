import Transaccion from "./Transaccion.js";

export default class Ingreso extends Transaccion{
    static tipo = "Ingreso";
    static datos = [];
    
    constructor(user, valor, descripcion, categoria){
        super();
        super.createTransaction(user, Ingreso.tipo, valor, descripcion, categoria);
        Ingreso.datos.push(this); //Almacenará en el arreglo cada que se instancié un objeto
        Transaccion.ingresos = Ingreso.datos
        console.log(Ingreso.datos);
    }
}