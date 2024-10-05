class Gasto extends Transaccion{
    static tipo = "Gasto";
    static datos = [];
    
    constructor(valor, descripcion, categoria){
        super(Gasto.tipo, valor, descripcion, categoria);
        Gasto.datos.push(this); //Almacenará en el arreglo cada que se instancié un objeto
        Transaccion.gastos = Gasto.datos;
        console.log(Gasto.datos);
    }
}