let clientes = [];

let creditos = [];

let tasaInteres = 15;

let clienteSeleccionado = null;



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


    mostrarTextoEnCaja(
        "txtCedula",
        cliente.cedula
    );

    mostrarTextoEnCaja(
        "txtNombre",
        cliente.nombre
    );

    mostrarTextoEnCaja(
        "txtApellido",
        cliente.apellido
    );

    mostrarTextoEnCaja(
        "txtTelefono",
        cliente.telefono
    );

    mostrarTextoEnCaja(
        "txtCorreo",
        cliente.correo
    );

    mostrarTextoEnCaja(
        "txtIngresos",
        cliente.ingresos
    );

    mostrarTextoEnCaja(
        "txtEgresos",
        cliente.egresos
    );

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


    let tabla;

    tabla = document.getElementById("tablaCreditos");


    tabla.innerHTML +=
    `
    <tr>

        <td>${cedula}</td>

        <td>${nombre}</td>

        <td>${apellido}</td>

        <td>${monto}</td>

        <td>${tasa}%</td>

        <td>${plazo} meses</td>

        <td>${cuota}</td>

    </tr>
    `;


    alert("Crédito VIP agregado correctamente");

}