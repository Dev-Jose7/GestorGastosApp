class Ingreso extends Transaccion{
    static tipo = "Ingreso";
    constructor(valor, descripcion, categoria){
        super(Ingreso.tipo, valor, descripcion, categoria);
    }
}