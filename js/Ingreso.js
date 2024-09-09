class Ingreso extends Transaccion{
    static tipo = "Ingreso";
    constructor(descripcion, valor){
        super(Ingreso.tipo, descripcion, valor);
    }
}