class Transaccion{
    static contadorId = 0;
    constructor(tipo, descripcion, valor){
        this._id = ++Ingreso.contadorId;
        this._tipo = tipo;
        this._descripcion = descripcion;
        this._valor = valor;
    }

    getId(){
        return this._id;
    }

    setDescripcion(descripcion){
        this._descripcion = descripcion;
    }

    setValor(valor){
        this._valor = valor;
    }

    agregarTransaccion(vector, contenedor){
        console.log(contenedor.id)
        if(contenedor.id == "campoIngresos"){
            contenedor.innerHTML = '<legend>Ingresos</legend>';
        }else if(contenedor.id == "campoGastos"){
            contenedor.innerHTML = '<legend>Gastos</legend>';
        }

        for(let objeto of vector){
            let elemento = `
                <div class="transaccion">
                    <h3>${objeto._descripcion}</h3>
                    <p>${objeto._valor}</p>
                    <div>
                        <button id="eliminar" class="${objeto._id}">Eliminar</button>
                    </div>
                </div>`
            contenedor.innerHTML += elemento;
        }

        contenedor.addEventListener("click", (e) => {
            if(e.target.id == "eliminar"){
                let id = e.target.className;
                this.eliminarTransaccion(e, vector, id);
            }
        });
    }

    eliminarTransaccion(e, vector, id){
        let transaccion = e.target.closest(".transaccion");
        transaccion.remove();  // Eliminar el elemento correspondiente 
        let indice = vector.findIndex(transaccion => transaccion._id === id);
        // Verificar si se encontró el índice
        if (indice !== -1) {
            // Eliminar el objeto del arreglo
            vector.splice(indice, 1);
        }
        console.log(vector)
    }
}




