class Transaccion{
    static contadorId = 0;
    constructor(tipo, valor, descripcion, categoria){
        this._id = ++Ingreso.contadorId;
        this._tipo = tipo;
        this._valor = valor;
        this._descripcion = descripcion;
        this._categoria = categoria;
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

    sumarTransaccion(vector){
        let valor = 0;
        let ingresoTotal = +document.getElementById("valorIngreso").textContent;
        let gastoTotal = +document.getElementById("valorGasto").textContent;

        for (const objeto of vector) {
            valor += +objeto._valor

            if(objeto._tipo == "Ingreso"){
                document.getElementById("valorIngreso").textContent = valor;
                ingresoTotal = +document.getElementById("valorIngreso").textContent;
            }else if(objeto._tipo == "Gasto"){
                document.getElementById("valorGasto").textContent = valor;
                gastoTotal = +document.getElementById("valorGasto").textContent;
            }
        }
        

        console.log(ingresoTotal + " Ingreso")
        console.log(gastoTotal + " Gasto")
        document.getElementById("saldo").textContent = Number(ingresoTotal) - Number(gastoTotal);
        console.log(valor);
    }

    agregarTransaccion(vector, contenedor){
        if(contenedor.id == "campoIngresos"){
            contenedor.innerHTML = '<legend>Ingresos</legend>';
        }else if(contenedor.id == "campoGastos"){
            contenedor.innerHTML = '<legend>Gastos</legend>';
        }

        for(let objeto of vector){
            let elemento = `
                <div class="transaccion">
                    <h3>${objeto._categoria}</h3>
                    <p>${objeto._valor}</p>
                    <h4>${objeto._descripcion}</h4>
                    <div>
                        <button id="modificar" class="${objeto._id}">Modificar</button>
                        <button id="eliminar" class="${objeto._id}">Eliminar</button>
                    </div>
                </div>`
            contenedor.innerHTML += elemento;
        }

        this.opcionesTransaccion(contenedor, vector);
    }

    opcionesTransaccion(contenedor, vector){
        contenedor.addEventListener("click", (e) => {
            if(e.target.id == "eliminar"){
                let id = +e.target.className;
                this.eliminarTransaccion(e, vector, id);
                this.sumarTransaccion(vector);
            }
        });

        contenedor.addEventListener("click", (e) => {
            if(e.target.id == "modificar"){
                let id = +e.target.className;
                this.modificarTransaccion(e, vector, id, contenedor);
                this.sumarTransaccion(vector);
            }
        });
    }

    eliminarTransaccion(e, vector, id){
        let transaccion = e.target.closest(".transaccion"); //Closest hace referencia a un elemento ascendente, se puedo señalar a traves de su clase o id
        transaccion.remove();  // Eliminar el elemento correspondiente 
        let indice = vector.findIndex(transaccion => transaccion._id === id);

        if (indice !== -1) {
            vector.splice(indice, 1);  // Eliminar la transacción del arreglo
        }
        console.log(vector)
    }

    modificarTransaccion(e, vector, id, contenedor){
        document.getElementById("añadir").setAttribute("id", "confirmar");
        document.getElementById("confirmar").textContent = "Confirmar";
        
        if(e.target.closest(".transaccion").closest("#campoIngresos").id == "campoIngresos"){
            document.getElementById("tipo").selectedIndex = 1;
        }else if(e.target.closest(".transaccion").closest("#campoGastos").id == "campoGastos"){
            document.getElementById("tipo").selectedIndex = 2;
        }

        document.getElementById("valor").value = e.target.closest(".transaccion").querySelector("p").textContent;
        document.getElementById("descripcion").value = e.target.closest(".transaccion").querySelector("h4").textContent;
        document.getElementById("categoria").value = e.target.closest(".transaccion").querySelector("h3").textContent;

        e.target.closest(".transaccion").style.color = "gray";
        
    }
    
}




