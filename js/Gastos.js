class Gastos extends Transaccion{
    static tipo = "Gasto";
    constructor(descripcion, valor){
        super(Gastos.tipo, descripcion, valor);
    }

    
}