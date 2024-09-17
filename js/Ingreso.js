class Ingreso extends Transaccion{
    static tipo = "Ingreso";
    static datos = [];
    
    constructor(valor, descripcion, categoria){
        super(Ingreso.tipo, valor, descripcion, categoria);
        Ingreso.datos.push(this); //Almacenará en el arreglo cada que se instancié un objeto
        Transaccion.ingresos = Ingreso.datos
        console.log(Ingreso.datos);
    }
}