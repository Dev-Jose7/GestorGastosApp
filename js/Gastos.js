class Gastos extends Transaccion{
    static tipo = "Gasto";
    constructor(valor, descripcion, categoria){
        super(Gastos.tipo, valor, descripcion, categoria);
    }

    
}