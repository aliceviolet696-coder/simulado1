let clientes = [];

let creditos = [];

let tasaInteres = 15;

let montoMaximoGlobal = 10000;

let clienteCredito = null;

//====================================
// NAVEGACION
//====================================

function ocultarSecciones(){

    document.getElementById("parametros").style.display = "none";

    document.getElementById("clientes").style.display = "none";

    document.getElementById("creditos").style.display = "none";

    document.getElementById("listaCreditos").style.display = "none";

    document.getElementById("creditosVIP").style.display = "none";

    document.getElementById("acercaDe").style.display = "none";

}

function mostrarSeccion(id){

    ocultarSecciones();

    document.getElementById(id).style.display = "block";

}

//====================================
// GUARDAR PARAMETROS
//====================================

function guardarTasa(){

    tasaInteres = parseFloat(
        document.getElementById("tasaInteres").value
    );

    montoMaximoGlobal = parseFloat(
        document.getElementById("montoMaximo").value
    );

    document.getElementById("mensajeTasa").innerHTML =
    "Parámetros guardados correctamente";

}

//====================================
// GUARDAR CLIENTE
//====================================

function guardarCliente(){

    let cedula =
    document.getElementById("cedula").value;

    let nombre =
    document.getElementById("nombre").value;

    let apellido =
    document.getElementById("apellido").value;

    let telefono =
    document.getElementById("telefono").value;

    let email =
    document.getElementById("email").value;

    let ingresos =
    parseFloat(document.getElementById("ingresos").value);

    let egresos =
    parseFloat(document.getElementById("egresos").value);

    let cliente = {

        cedula: cedula,

        nombre: nombre,

        apellido: apellido,

        telefono: telefono,

        email: email,

        ingresos: ingresos,

        egresos: egresos

    };

    clientes.push(cliente);

    pintarClientes();

    limpiarFormulario();

}

//====================================
// PINTAR CLIENTES
//====================================

function pintarClientes(){

    let tabla =
    document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    for(let i = 0; i < clientes.length; i++){

        let cliente = clientes[i];

        tabla.innerHTML +=
        `
        <tr>

            <td>${cliente.cedula}</td>

            <td>${cliente.nombre}</td>

            <td>${cliente.apellido}</td>

            <td>${cliente.telefono}</td>

            <td>${cliente.email}</td>

            <td>${cliente.ingresos}</td>

            <td>${cliente.egresos}</td>

            <td>

                <button onclick="eliminarCliente(${i})">
                    Eliminar
                </button>

            </td>

        </tr>
        `;
    }

}

//====================================
// ELIMINAR CLIENTE
//====================================

function eliminarCliente(posicion){

    clientes.splice(posicion, 1);

    pintarClientes();

}

//====================================
// LIMPIAR FORMULARIO
//====================================

function limpiarFormulario(){

    document.getElementById("cedula").value = "";

    document.getElementById("nombre").value = "";

    document.getElementById("apellido").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("email").value = "";

    document.getElementById("ingresos").value = "";

    document.getElementById("egresos").value = "";

}

//====================================
// BUSCAR CLIENTE CREDITO
//====================================

function buscarClienteCredito(){

    let cedula =
    document.getElementById("buscarCedulaCredito").value;

    let encontrado = null;

    for(let i = 0; i < clientes.length; i++){

        if(clientes[i].cedula == cedula){

            encontrado = clientes[i];

            break;
        }
    }

    if(encontrado == null){

        alert("Cliente no encontrado");

        return;
    }

    clienteCredito = encontrado;

    document.getElementById("datosClienteCredito").innerHTML =
    `
    <p><strong>Cliente:</strong> ${encontrado.nombre} ${encontrado.apellido}</p>

    <p><strong>Teléfono:</strong> ${encontrado.telefono}</p>

    <p><strong>Email:</strong> ${encontrado.email}</p>
    `;

    document.getElementById("montoCredito").disabled = false;

    document.getElementById("plazoCredito").disabled = false;

    document.getElementById("btnCalcular").disabled = false;

}

//====================================
// CALCULAR CREDITO
//====================================

function calcularCredito(){

    let monto =
    parseFloat(document.getElementById("montoCredito").value);

    let plazo =
    parseInt(document.getElementById("plazoCredito").value);

    if(monto > montoMaximoGlobal){

        alert("El monto supera el máximo permitido");

        document.getElementById("montoCredito").value = "";

        return;
    }

    let interes =
    monto * (tasaInteres / 100);

    let total =
    monto + interes;

    let cuota =
    total / plazo;

    document.getElementById("resultadoCredito").innerHTML =
    `
    <h3>Resultado del Crédito</h3>

    <p>Total a pagar: $${total.toFixed(2)}</p>

    <p>Cuota mensual: $${cuota.toFixed(2)}</p>
    `;

    document.getElementById("btnSolicitarCredito").disabled = false;

}

//====================================
// ASIGNAR CREDITO
//====================================

function asignarCredito(){

    let monto =
    parseFloat(document.getElementById("montoCredito").value);

    let plazo =
    parseInt(document.getElementById("plazoCredito").value);

    let interes =
    monto * (tasaInteres / 100);

    let total =
    monto + interes;

    let cuota =
    total / plazo;

    let credito = {

        cedula: clienteCredito.cedula,

        nombre: clienteCredito.nombre,

        apellido: clienteCredito.apellido,

        monto: monto,

        tasa: tasaInteres,

        plazo: plazo,

        cuota: cuota.toFixed(2)

    };

    creditos.push(credito);

    pintarCreditos(creditos);

    alert("Crédito registrado correctamente");

}

//====================================
// PINTAR CREDITOS
//====================================

function pintarCreditos(lista){

    let tabla =
    document.getElementById("tablaCreditos");

    tabla.innerHTML = "";

    for(let i = 0; i < lista.length; i++){

        let credito = lista[i];

        tabla.innerHTML +=
        `
        <tr>

            <td>${credito.cedula}</td>

            <td>${credito.nombre}</td>

            <td>${credito.apellido}</td>

            <td>${credito.monto}</td>

            <td>${credito.tasa}%</td>

            <td>${credito.plazo} meses</td>

            <td>${credito.cuota}</td>

        </tr>
        `;
    }

}

//====================================
// BUSCAR CREDITOS CLIENTE
//====================================

function buscarCreditosCliente(){

    let cedula =
    document.getElementById("buscarCedulaListado").value;

    let lista = [];

    for(let i = 0; i < creditos.length; i++){

        if(creditos[i].cedula == cedula){

            lista.push(creditos[i]);
        }
    }

    pintarCreditos(lista);

}

//====================================
// CREDITOS VIP
//====================================

function pintarCreditosVIP(creditos){

    let tabla =
    document.getElementById("tablaCreditosVIP");

    tabla.innerHTML = "";

    for(let i = 0; i < creditos.length; i++){

        let credito = creditos[i];

        if(credito.monto > 5000){

            tabla.innerHTML +=
            `
            <tr>

                <td>${credito.cedula}</td>

                <td>${credito.nombre}</td>

                <td>${credito.apellido}</td>

                <td>${credito.monto}</td>

                <td>${credito.tasa}%</td>

                <td>${credito.plazo} meses</td>

                <td>${credito.cuota}</td>

            </tr>
            `;
        }
    }

}

//====================================
// INICIO
//====================================

ocultarSecciones();

mostrarSeccion("parametros");