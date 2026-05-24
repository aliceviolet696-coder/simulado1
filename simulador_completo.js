let clientes = [];

let creditos = [];

let tasaInteres = 15;

let clienteSeleccionado = null;

let clienteCredito = null;

let montoCalculado = 0;

let cuotaCalculada = 0;

let plazoIngresado = 0;



//====================================
// NAVEGACION
//====================================

function ocultarSecciones(){

    document.getElementById("parametros").classList.remove("activa");

    document.getElementById("clientes").classList.remove("activa");

    document.getElementById("credito").classList.remove("activa");

    document.getElementById("listaCreditos").classList.remove("activa");

    document.getElementById("acerca").classList.remove("activa");

}



function mostrarSeccion(id){

    ocultarSecciones();

    document.getElementById(id).classList.add("activa");

}



//====================================
// GUARDAR TASA
//====================================

function guardarTasa(){

    let tasa;

    let montoMaximo;

    tasa = recuperarInt("tasaInteres");

    montoMaximo = recuperarFloat("montoMaximo");


    if(tasa >= 10 && tasa <= 20){

        tasaInteres = tasa;

        mostrarTexto(
            "mensajeTasa",
            "Parámetros guardados correctamente | Tasa: "
            + tasa +
            "% | Monto máximo: $" +
            montoMaximo
        );

    }else{

        mostrarTexto(
            "mensajeTasa",
            "La tasa debe estar entre 10% y 20%"
        );

    }

}



//====================================
// GUARDAR CLIENTE
//====================================

function guardarCliente(){

    let cedula;

    let nombre;

    let apellido;

    let telefono;

    let correo;

    let ingresos;

    let egresos;


    cedula = recuperaraTexto("txtCedula");

    nombre = recuperaraTexto("txtNombre");

    apellido = recuperaraTexto("txtApellido");

    telefono = recuperaraTexto("txtTelefono");

    correo = recuperaraTexto("txtCorreo");

    ingresos = recuperarFloat("txtIngresos");

    egresos = recuperarFloat("txtEgresos");


    let clienteEncontrado;

    clienteEncontrado = buscarCliente(cedula);


    if(clienteEncontrado == null){

        let cliente = {

            cedula: cedula,

            nombre: nombre,

            apellido: apellido,

            telefono: telefono,

            correo: correo,

            ingresos: ingresos,

            egresos: egresos

        };

        clientes.push(cliente);

    }else{

        clienteEncontrado.nombre = nombre;

        clienteEncontrado.apellido = apellido;

        clienteEncontrado.telefono = telefono;

        clienteEncontrado.correo = correo;

        clienteEncontrado.ingresos = ingresos;

        clienteEncontrado.egresos = egresos;

    }


    pintarClientes();

    limpiar();

}



//====================================
// PINTAR CLIENTES
//====================================

function pintarClientes(){

    let tabla;

    tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";


    let cliente;


    for(let i = 0; i < clientes.length; i++){

        cliente = clientes[i];


        tabla.innerHTML +=
        `
        <tr>

            <td>${cliente.cedula}</td>

            <td>${cliente.nombre}</td>

            <td>${cliente.apellido}</td>

            <td>${cliente.telefono}</td>

            <td>${cliente.correo}</td>

            <td>${cliente.ingresos}</td>

            <td>${cliente.egresos}</td>

            <td>

                <button onclick="seleccionarCliente('${cliente.cedula}')">
                    Actualizar
                </button>

            </td>

        </tr>
        `;
    }

}



//====================================
// BUSCAR CLIENTE
//====================================

function buscarCliente(cedula){

    let cliente;


    for(let i = 0; i < clientes.length; i++){

        cliente = clientes[i];


        if(cliente.cedula == cedula){

            return cliente;

        }

    }


    return null;

}



//====================================
// SELECCIONAR CLIENTE
//====================================

function seleccionarCliente(cedula){

    let cliente;

    cliente = buscarCliente(cedula);

    clienteSeleccionado = cliente;


    mostrarTextoEnCaja("txtCedula", cliente.cedula);

    mostrarTextoEnCaja("txtNombre", cliente.nombre);

    mostrarTextoEnCaja("txtApellido", cliente.apellido);

    mostrarTextoEnCaja("txtTelefono", cliente.telefono);

    mostrarTextoEnCaja("txtCorreo", cliente.correo);

    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);

    mostrarTextoEnCaja("txtEgresos", cliente.egresos);

}



//====================================
// LIMPIAR
//====================================

function limpiar(){

    mostrarTextoEnCaja("txtCedula", "");

    mostrarTextoEnCaja("txtNombre", "");

    mostrarTextoEnCaja("txtApellido", "");

    mostrarTextoEnCaja("txtTelefono", "");

    mostrarTextoEnCaja("txtCorreo", "");

    mostrarTextoEnCaja("txtIngresos", "");

    mostrarTextoEnCaja("txtEgresos", "");

}



//====================================
// BUSCAR CLIENTE CREDITO
//====================================

function buscarClienteCredito(){

    let cedula;

    cedula = recuperaraTexto("buscarCedulaCredito");


    let cliente;

    cliente = buscarCliente(cedula);


    let componente;

    componente = document.getElementById("datosClienteCredito");


    if(cliente == null){

        componente.innerHTML =
        `
        <h3>Cliente no encontrado</h3>
        `;

        clienteCredito = null;

    }else{

        clienteCredito = cliente;

        componente.innerHTML =
        `
        <h3>Datos del Cliente</h3>

        <p><strong>Cédula:</strong> ${cliente.cedula}</p>

        <p><strong>Nombre:</strong> ${cliente.nombre}</p>

        <p><strong>Apellido:</strong> ${cliente.apellido}</p>

        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>

        <p><strong>Correo:</strong> ${cliente.correo}</p>

        <p><strong>Ingresos:</strong> $${cliente.ingresos}</p>

        <p><strong>Egresos:</strong> $${cliente.egresos}</p>
        `;
    }

}



//====================================
// CALCULAR CREDITO
//====================================

function calcularCredito(){

    if(clienteCredito == null){

        alert("Primero debe buscar un cliente");

        return;

    }


    let monto;

    let plazo;

    monto = recuperarFloat("montoCredito");

    plazo = recuperarInt("plazoCredito");

    montoCalculado = monto;

    plazoIngresado = plazo;


    let capacidadPago;

    capacidadPago =
    clienteCredito.ingresos
    - clienteCredito.egresos;


    let interes;

    interes =
    monto * (tasaInteres / 100);


    let totalPagar;

    totalPagar =
    monto + interes;


    let cuotaMensual;

    cuotaMensual =
    totalPagar / plazo;

    cuotaCalculada = cuotaMensual;


    let resultado;

    let componenteResultado;

    componenteResultado =
    document.getElementById("resultadoCredito");


    if(cuotaMensual <= capacidadPago){

        resultado = "APROBADO";

        componenteResultado.className = "aprobado";

        document.getElementById(
            "btnAsignarCredito"
        ).disabled = false;

    }else{

        resultado = "RECHAZADO";

        componenteResultado.className = "rechazado";

        document.getElementById(
            "btnAsignarCredito"
        ).disabled = true;

    }


    componenteResultado.innerHTML =
    `
    <h3>Resultado del Crédito</h3>

    Capacidad de pago:
    $${capacidadPago}
    <br><br>

    Total a pagar:
    $${totalPagar.toFixed(2)}
    <br><br>

    Cuota mensual:
    $${cuotaMensual.toFixed(2)}
    <br><br>

    RESULTADO:
    ${resultado}
    `;

}



//====================================
// ASIGNAR CREDITO
//====================================

function asignarCredito(){

    let credito = {

        cedula: clienteCredito.cedula,

        nombre: clienteCredito.nombre,

        apellido: clienteCredito.apellido,

        monto: montoCalculado,

        tasa: tasaInteres,

        plazo: plazoIngresado,

        cuota: cuotaCalculada

    };


    creditos.push(credito);

    alert("Crédito asignado correctamente");

}



//====================================
// BUSCAR CREDITOS
//====================================

function buscarCreditos(cedula){

    let creditosEncontrados = [];

    let credito;


    for(let i = 0; i < creditos.length; i++){

        credito = creditos[i];


        if(credito.cedula == cedula){

            creditosEncontrados.push(credito);

        }

    }


    return creditosEncontrados;

}



//====================================
// PINTAR CREDITOS
//====================================

function pintarCreditos(creditosPintar){

    let tabla;

    tabla = document.getElementById("tablaCreditos");

    tabla.innerHTML = "";


    let credito;


    for(let i = 0; i < creditosPintar.length; i++){

        credito = creditosPintar[i];


        tabla.innerHTML +=
        `
        <tr>

            <td>${credito.cedula}</td>

            <td>${credito.nombre}</td>

            <td>${credito.apellido}</td>

            <td>${credito.monto}</td>

            <td>${credito.tasa}%</td>

            <td>${credito.plazo} meses</td>

            <td>${credito.cuota.toFixed(2)}</td>

        </tr>
        `;
    }

}



//====================================
// BUSCAR CREDITOS CLIENTE
//====================================

function buscarCreditosCliente(){

    let cedula;

    cedula = recuperaraTexto(
        "buscarCedulaListado"
    );


    let creditosCliente;

    creditosCliente =
    buscarCreditos(cedula);


    pintarCreditos(creditosCliente);

}



//====================================
// CREDITO VIP
//====================================

function creditoVIP(){

    let cedula;

    let nombre;

    let apellido;

    let monto;

    let tasa;

    let plazo;

    let cuota;


    cedula = recuperaraTexto("vipCedula");

    nombre = recuperaraTexto("vipNombre");

    apellido = recuperaraTexto("vipApellido");

    monto = recuperarFloat("vipMonto");

    tasa = recuperarFloat("vipTasa");

    plazo = recuperarFloat("vipPlazo");

    cuota = recuperarFloat("vipCuota");


    let credito = {

        cedula: cedula,

        nombre: nombre,

        apellido: apellido,

        monto: monto,

        tasa: tasa,

        plazo: plazo,

        cuota: cuota

    };


    creditos.push(credito);

    pintarCreditos(creditos);

}