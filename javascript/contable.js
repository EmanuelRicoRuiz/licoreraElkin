function contabilidad() {
    var _0x3ab4x2 = document['getElementById']('main');
    var _0x3ab4x3 = document['getElementById']('login-page');
    _0x3ab4x2['innerHTML'] = '';
    _0x3ab4x3['innerHTML'] = '';
    var _0x3ab4x4 = new Date();
    _0x3ab4x2['innerHTML'] = `${'<div class="wrap">\x0D\x0A    <center>\x0D\x0A    <ul class="tabs">\x0D\x0A        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Gastos</span></a></li>\x0D\x0A        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Deudas</span></a></li>\x0D\x0A        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Ganancia</span></a></li>\x0D\x0A  <li><a href="#tab4"><span class="fa fa-home"></span><span class="tab-text">Cartera</span></a></li>\x0D\x0A  </ul>\x0D\x0A    </center>\x0D\x0A    <div class="secciones">\x0D\x0A        <article id="tab1">\x0D\x0A\x0D\x0A            <div id="tabOne">\x0D\x0A              \x0D\x0A            <form>\x0D\x0A                <div class="col-md-8">\x0D\x0A                    <div class="form-group">\x0D\x0A                        <input type="text" class="form-control" placeholder="Valor del gasto" id="valor">\x0D\x0A                    </div>\x0D\x0A                    <div class="form-group">\x0D\x0A                        <input type="text" class="form-control" placeholder="Descripci\xF3n del gasto" id="Descripcion">\x0D\x0A                    </div>\x0D\x0A                    <div class="form-group">\x0D\x0A                        <button class="btn btn-success" onclick="GuardarGasto()">Guardar Gasto</button>\x0D\x0A                    </div>\x0D\x0A                </div>\x0D\x0A            </form>\x0D\x0A            <div id="ListaGastos">\x0D\x0A\x0D\x0A            </div>\x0D\x0A            \x0D\x0A            \x0D\x0A            </div>\x0D\x0A        </article>\x0D\x0A        <article id="tab2">\x0D\x0A            <div id="tabTwo">\x0D\x0A            \x0D\x0A            </div>\x0D\x0A        </article>\x0D\x0A        <article id="tab3">\x0D\x0A            <div id="tabTree">\x0D\x0A            \x0D\x0A            </div>\x0D\x0A        </article>\x0D\x0A\x0D\x0A   <article id="tab4">\x0D\x0A            <div id="tabFour">\x0D\x0A            \x0D\x0A            </div>\x0D\x0A        </article>\x0D\x0A\x0D\x0A     \x0D\x0A    </div>\x0D\x0A</div>'}`;
    cargarTabs();
    listarGastos();
    deudas();
    carteraGeneral();
    var hoy = new Date();

    ganancia(hoy.getMonth() + 1);
}
const getAbonos = () => db.collection("abonos").get();
async function ganancia(mes) {
    var tabTree = document.getElementById("tabTree");
    tabTree.innerHTML = `<table></table>`
    query = await getAbonos();
    suma = 0;
    query.forEach(doc => {

        var datos = doc.data();
        if (datos.fecha[1] == mes) {
           
            suma += datos.cantidad_abono
        }

    })
    tabTree.innerHTML = `${suma}`
}
async function carteraGeneral() {
    var tabFour = document.getElementById("tab4");
    tabFour.innerHTML = `<h3 id="titulo">No hay facturas pendientes.</h3>
    `
    tabFour.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="cabecera">
            <tr>
                <th>Número de factura</th>
                <th>Cliente</th>
                <th>Estado de entrega</th>
                <th>Estado de pago</th>
                <th>Valor</th>
                <th>debe</th>
                <th>fecha</th>
                <th>plazo</th>
                <th>fecha de vencimiento</th>
                <th colspan=3>Acciones</th>
            </tr>
        </table></div>`;
    CarteraCliente = document.getElementById("CarteraCliente");
    querySnapshot = await obtenerTodasVentas();
    querySnapshot.forEach(async doc => {
        var datos = doc.data();

        if (datos.debe > 0) {
            var titulo = document.getElementById("titulo")
            titulo.innerHTML = "";

            var tablaPedidos = document.getElementById("cabecera");

            cliente = await obtenerCliente(datos.cliente);
            cliente = cliente.data();

            tablaPedidos.innerHTML += `
            <tr>
                <td>${datos.NumeroFactura}</td>
                <td>${cliente.RazonSocial}</td>
                <td>${datos.entregado}</td>
                <td>${datos.pagado}</td>
                <td>${ingresar(datos.suma)}</td>
                <td>${ingresar(datos.debe)}</td>
                <td>${datos.diaV}/${datos.mesV}/${datos.añoV}</td>
                <td>${datos.plazo} dias</td>
                <td>${datos.diaF}/${datos.mesF}/${datos.añoF}</td>
                <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a><br>
                <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a><br>
                <a class="cursor" id="${doc.id}" onclick="contenidoPedido(this)"><img src="img/contenido.png" width=30></a></td>
                
            </tr>
            <tr>
                <td colspan=9>
                     <div id="contenido${doc.id}"></div>
                </td>
            </tr>
            
                `
        }




    })
}
function deudas() {
    var tabTwo = document.getElementById("tabTwo");
    tabTwo.innerHTML = `
        <div class="form-group col-md-8">
            <input type="text" class="form-control" id="NombreD" placeholder="Descripción de la dedua"><br>
            <input type="number" class="form-control" id="ValorD" placeholder="Valor de la deuda"><br>
            <input type="text" class="form-control" id="entidadD" placeholder="Entidad"><br>
            <button class="btn btn-success" onclick="GuardarDeuda()">Guardar Deuda</button>  
        </div>
        <div id="listaDeudas">
           
        </div>
    `
    listarDeudas();
}
function listarDeudas() {
    var listaDeudas = document.getElementById("listaDeudas");
    listaDeudas.innerHTML = `
                <table class="table table-striped table-bordered" id="deudasTable">
                    <tr>
                        <th>Entidad</th>
                        <th>Descripción</th>
                        <th>Valor</th>
                        <th>pendiente</th>
                        <th>fecha</th>
                        <th>estado de pago</th>
                    </tr>
                </table>
                <div id="aviso"></div>
            
            `;
    var entrada = false;
    var deudasTable = document.getElementById("deudasTable");
    db.collection("deudas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            entrada = true;
            deudasTable.innerHTML += `
                <td>${datos.entidad}</td>
                <td>${datos.descripcion}</td>
                <td>${ingresar(datos.valor)}</td>
                <td>${ingresar(datos.pendiente)}</td>
                <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                <td>${datos.estado}</td>
                <td><a id="${doc.id}" onclick="abonarPago(this)" class="cursor"><img src="img/abono.png" width=30></a></td>
            `
        })
        if (!entrada) {
            var aviso = document.getElementById("aviso");
            aviso.innerHTML = `<center><h6>No hay deudas disponibles.</h6></ceneter>`
        }
    })
}
function abonarPago(element) {
    Swal.fire({
        title: 'Ingrese el valor pago',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        showLoaderOnConfirm: true,
        CancelButtonText: 'Cancelar'

    }).then((result) => {
        if (result.isConfirmed) {
            entrada = false;
            var codigo;
            db.collection("deudas").doc(element.id).get().then((doc) => {
                var datos = doc.data();
                var valor = datos.valor;
                var pendiente = datos.pendiente;
                var entidad = datos.entidad;
                var descripcion = datos.descripcion;
                var fecha = datos.fecha;
                var estado = datos.estado;
                var abono = result.value;
                abono = parseInt(abono, 10);
                if (abono <= pendiente) {

                    if (abono == pendiente) {
                        estado = true;
                    }
                    pendiente -= abono
                    db.collection("deudas").doc(element.id).set({
                        entidad,
                        descripcion,
                        valor,
                        fecha,
                        pendiente,
                        estado
                    })
                    Swal['fire']('Guardado!', '', 'success');
                    listarDeudas();

                }

            })




        }
    })
}
function GuardarDeuda() {
    var entidad = document.getElementById("entidadD").value;
    var descripcion = document.getElementById("NombreD").value;
    var valor = document.getElementById("ValorD").value;
    if (valor != "" && descripcion != "" && entidad != "") {
        var hoy = new Date();
        fecha = [hoy.getDate(), hoy.getMonth() + 1, hoy.getFullYear()];
        var estado = false;
        valor = parseInt(valor, 10);
        var pendiente = valor;
        db.collection("deudas").doc().set({
            entidad,
            descripcion,
            valor,
            fecha,
            pendiente,
            estado
        })
        Swal['fire']('Guardado!', '', 'success');
        listarDeudas();
    }
}
function GuardarGasto() {
    event['preventDefault']();
    var _0x3ab4x6 = document['getElementById']('Descripcion')['value'];
    var _0x3ab4x7 = document['getElementById']('valor')['value'];
    _0x3ab4x7 = parseInt(_0x3ab4x7, 10);
    var _0x3ab4x4 = new Date;
    var _0x3ab4x8 = [];
    _0x3ab4x8['push'](_0x3ab4x4['getDate']());
    _0x3ab4x8['push'](_0x3ab4x4['getMonth']() + 1);
    _0x3ab4x8['push'](_0x3ab4x4['getFullYear']());
    if (_0x3ab4x6 != '' && !isNaN(_0x3ab4x7)) {
        var _0x3ab4x9 = firebase['auth']()['currentUser'];
        _0x3ab4x9 = _0x3ab4x9['uid'];
        db['collection']('gastos')['doc']()['set']({
            user,
            descripcion,
            valor,
            fecha
        });
        Swal['fire']('Guardado!', '', 'success');
        listarGastos()
    }
}

function listarGastos() {
    var _0x3ab4xb = document['getElementById']('ListaGastos');
    _0x3ab4xb['innerHTML'] = `${'\x0D\x0A        <table class="table table-striped table-bordered" id="tabla1">\x0D\x0A            <thead>\x0D\x0A                <tr>\x0D\x0A                    <th colspan=3><center>Lista de gastos</center></th>\x0D\x0A                </tr>\x0D\x0A                <tr>\x0D\x0A                    <th>Descripci\xF3n</th>\x0D\x0A                    <th>Valor</th>\x0D\x0A                    <th>Fecha</th>\x0D\x0A                </tr>\x0D\x0A            </thead>\x0D\x0A        </table>\x0D\x0A    '}`;
    var _0x3ab4xc = document['getElementById']('tabla1');
    db['collection']('gastos')['get']()['then']((_0x3ab4xd) => {
        _0x3ab4xd['forEach']((_0x3ab4xe) => {
            var _0x3ab4xf = _0x3ab4xe['data']();
            _0x3ab4xc['innerHTML'] += `${'\x0D\x0A                <tr>\x0D\x0A                    <td>'}${_0x3ab4xf['descripcion']}${'</td>\x0D\x0A                    <td>'}${ingresar(_0x3ab4xf['valor'])}${'</td>\x0D\x0A                    <td>'}${_0x3ab4xf['fecha'][0]}${'/'}${_0x3ab4xf['fecha'][1]}${'/'}${_0x3ab4xf['fecha'][2]}${'</td>\x0D\x0A                </tr>\x0D\x0A\x0D\x0A            '}`
        })
    })
}

function RegistrarProveedor() {
    event.preventDefault();
    var nombre = document.getElementById("NombreP").value;
    var codigo = document.getElementById("codigoP").value;
    var deuda = 0;
    db.collection("proveedores").doc(codigo).set({
        nombre,
        codigo,
        deuda
    })
    Swal.fire('Guardado!', '', 'success');
    ListarProveedores();
}
function RegistrarCompra() {

    event.preventDefault();
    var NumeroFactura = document.getElementById("Nfactura").value;
    var Proveedor = document.getElementById("proveedor").value;
    var valorFactura = document.getElementById("valorFactura").value;
    var pagado = document.getElementById("si").checked;
    var estado = false;
    valorFactura = parseInt(valorFactura, 10);
    if (pagado) {
        estado = true;
    }
    var productos = [];
    var cantidades = [];
    var costos = [];
    var fecha1 = [];
    var existe = false;
    if (NumeroFactura != "" && Proveedor != "" && valorFactura != "") {
        db.collection("compras").where("NumeroFactura", "==", NumeroFactura).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                existe = true;

            })

            if (!existe) {
                if (!estado) {
                    var deuda = valorFactura

                } else {
                    var deuda = 0;
                }

                db.collection("compras").doc(NumeroFactura).set({
                    NumeroFactura,
                    Proveedor,
                    valorFactura,
                    productos,
                    cantidades,
                    costos,
                    fecha1,
                    estado,
                    deuda
                })

                if (!estado) {
                    db.collection("proveedores").where("codigo", "==", Proveedor).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                var datos = doc.data();
                                var codigo = datos.codigo;
                                var deuda = datos.deuda;
                                var nombre = datos.nombre;
                                deuda += valorFactura;
                                db.collection("proveedores").doc(codigo).set({
                                    codigo,
                                    deuda,
                                    nombre
                                })
                            })
                        })
                    Swal.fire('Guardado!', '', 'success');
                }
            } else {
                Swal.fire({

                    icon: 'info',
                    title: 'Ya hay una compra con este código',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        })

    }
}
function verProveedor(element) {
    var id = element.id;
    var feed = document.getElementById("tabTwo");
    db.collection("proveedores").where("codigo", "==", id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc2) => {
            var datos = doc2.data();
            feed.innerHTML = `
    <a onclick="ListarProveedores()" class="cursor"><img src="img/undo.png" width="30"></a><br><br>
    <table class="table table-striped table-bordered">
        <tr>
            <td>Código</td>
            <td>Nombre</td>
            <td>Deuda</td>
        </tr>
        <tr>
            <td>${doc2.id}</td>
            <td>${datos.nombre}</td>
            <td>$${ingresar(datos.deuda)}</td>
        </tr>
    </table>
    <br><h3>Lista de compras:</h3><br><div class="overflow-auto" id="tabla6"></div>`;
            var tabla6 = document.getElementById("tabla6");
            db.collection("compras").where("Proveedor", "==", id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        datos = doc.data();

                        tabla6.innerHTML +=
                            `<table  class="table table-striped table-bordered" id="${doc.id}"><tr>
                            <td colspan=3>Número de factura:${doc.id}</td>
                            <td colspan=2><a id="${doc.id}" onclick="eliminarCompra(this)"><img src="img/delete.png" width=30 class="cursor"></a></td
                            </tr>
            <tr>
            <th>Codigo producto</th>
            <th>cantidad</th>
            <th>costo</th>
            <th>fecha</th>
            <th>Acciones</th>
          </tr></table>`;
                        costos = datos.costos;
                        var suma = 0;

                        for (let i = 0; i < costos.length; i++) {
                            suma += costos[i] * datos.cantidades[i];
                        }
                        var tabla7 = document.getElementById(doc.id);
                        for (let i = 0; i < costos.length; i++) {
                            tabla7.innerHTML += `
                    <tr>
                    <td>${datos.productos[i]}</td>
                    <td>${datos.cantidades[i]}</td>
                    <td>${datos.costos[i]}</td>
                    <td>${datos.fecha1[i]}</td>
                    <td><a id="${doc.id}/${i}" onclick="eliminarPCompra(this)"><img src="img/delete.png" width=30 class="cursor"></a>
                    </td>
                    </tr>`;
                        }
                        tabla7.innerHTML += `
                    <tr>
                        <td colspan=5 id="tablaSuma">
                            suma de la compra:${suma}<br>
                            valor total de la compra: ${datos.valorFactura}<br>
                            valor restante de la compra: ${datos.deuda}<br>
                            <a id="${doc.id}" onclick="abonarDeuda(this)" class="cursor"><img src="img/abono.png" width=40></a>
                        </td>
                    </tr>`

                    })
                });
        })
    })

}
function verProveedor2(id) {
    
    var feed = document.getElementById("tabTwo");
    db.collection("proveedores").where("codigo", "==", id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc2) => {
            var datos = doc2.data();
            feed.innerHTML = `
    <a onclick="ListarProveedores()" class="cursor"><img src="img/undo.png" width="30"></a><br><br>
    <table class="table table-striped table-bordered">
        <tr>
            <td>Código</td>
            <td>Nombre</td>
            <td>Deuda</td>
        </tr>
        <tr>
            <td>${doc2.id}</td>
            <td>${datos.nombre}</td>
            <td>$${ingresar(datos.deuda)}</td>
        </tr>
    </table>
    <br><h3>Lista de compras:</h3><br><div class="overflow-auto" id="tabla6"></div>`;
            var tabla6 = document.getElementById("tabla6");
            db.collection("compras").where("Proveedor", "==", id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        datos = doc.data();

                        tabla6.innerHTML +=
                            `<table  class="table table-striped table-bordered" id="${doc.id}"><tr>
            <td colspan=3>Número de factura:${doc.id}</td>
            <td colspan=2><a id="${doc.id}" onclick="eliminarCompra(this)"><img src="img/delete.png" width=30 class="cursor"></a></td
            </tr>
            <tr>
            <th>Codigo producto</th>
            <th>cantidad</th>
            <th>costo</th>
            <th>fecha</th>
            <th>Acciones</th>
          </tr></table>`;
                        costos = datos.costos;
                        var suma = 0;

                        for (let i = 0; i < costos.length; i++) {
                            suma += costos[i] * datos.cantidades[i];
                        }
                        var tabla7 = document.getElementById(doc.id);
                        for (let i = 0; i < costos.length; i++) {
                            tabla7.innerHTML += `
                    <tr>
                    <td>${datos.productos[i]}</td>
                    <td>${datos.cantidades[i]}</td>
                    <td>${datos.costos[i]}</td>
                    <td>${datos.fecha1[i]}</td>
                    <td><a id="${doc.id}/${i}" onclick="eliminarPCompra(this)"><img src="img/delete.png" width=30 class="cursor"></a>
                    </td>
                    </tr>`;
                        }
                        tabla7.innerHTML += `
                    <tr>
                        <td colspan=5 id="tablaSuma">
                            suma de la compra:${suma}<br>
                            valor total de la compra: ${datos.valorFactura}<br>
                            valor restante de la compra: ${datos.deuda}<br>
                            <a id="${doc.id}" onclick="abonarDeuda(this)" class="cursor"><img src="img/abono.png" width=40></a>
                        </td>
                    </tr>`

                    })
                });
        })
    })

}
async function eliminarProveedor(element){
    await db.collection("proveedores").doc(element.id).delete();
    Swal.fire('Borrado!', '', 'success');
    ListarProveedores();

}
async function eliminarCompra(element){
    var id=element.id
    var doc =await obtenerCompra(id);
    var datos=doc.data();
    var deuda=datos.deuda;
    
    var doc2=await obtenerProveedor(datos.Proveedor);
    var datos2=doc2.data();
    var deuda2=datos2.deuda;
    var codigo=datos2.codigo;
    var nombre=datos2.nombre;
    console.log(deuda,deuda2)
    deuda2-=deuda;
    
    db.collection("compras").doc(doc.id).delete();
    actualizarProveedor(codigo, deuda2, nombre);
}
function abonarDeuda(element) {

    Swal.fire({
        title: 'Ingrese el valor pago',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        showLoaderOnConfirm: true,
        CancelButtonText: 'Cancelar'

    }).then((result) => {
        if (result.isConfirmed) {
            entrada = false;
            var codigo;

            db.collection("compras").where("NumeroFactura", "==", element.id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var datos = doc.data();

                    if (datos.deuda >= result.value) {

                        entrada = true;
                        codigo = datos.Proveedor
                        NumeroFactura = datos.NumeroFactura;
                        Proveedor = datos.Proveedor;
                        valorFactura = datos.valorFactura;
                        productos = datos.productos;
                        cantidades = datos.cantidades;
                        costos = datos.costos;
                        fecha1 = datos.fecha1;
                        estado = datos.estado;
                        deuda = datos.deuda;
                        deuda -= result.value;

                        db.collection("compras").doc(NumeroFactura).set({
                            NumeroFactura,
                            Proveedor,
                            valorFactura,
                            productos,
                            cantidades,
                            costos,
                            fecha1,
                            estado,
                            deuda
                        })
                    }
                })
                if (entrada) {
                    db.collection("proveedores").where("codigo", "==", codigo).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            var datos = doc.data();
                            var deuda = datos.deuda;
                            var nombre = datos.nombre;
                            var codigo = datos.codigo;
                            deuda -= result.value;
                            db.collection("proveedores").doc(codigo).set({
                                deuda,
                                nombre,
                                codigo
                            })
                            valor = result.value;
                            tipo = "pago de factura"
                            db.collection("pagos").doc().set({
                                valor,
                                tipo,

                            })

                            Swal.fire('Guardado!', '', 'success');
                        })
                    })
                }
            })


        }
    })
}

const obtenerTodasVentas = () => db.collection("ventas").get();

const obtenerVentasCliente = (id) => db.collection("ventas").where("cliente", "==", id).get();
const obtenerCliente = (id) => db.collection("clientes").doc(id).get();
async function historialCompra(element) {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    cliente = await obtenerCliente(element.id);
    cliente = cliente.data();
    main.innerHTML = `
    `
    CarteraCliente = document.getElementById("CarteraCliente");
    querySnapshot = await obtenerVentasCliente(element.id);
    querySnapshot.forEach(doc => {
        var datos = doc.data();


        main.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
            <tr>
                <th>Número de factura</th>
                <th>Cliente</th>
                <th>Estado de entrega</th>
                <th>Estado de pago</th>
                <th>Valor</th>
                <th>debe</th>
                <th>fecha</th>
                <th>plazo</th>
                <th>fecha de vencimiento</th>
                <th colspan=3>Acciones</th>
            </tr>
        </table></div>`;

        var tablaPedidos = document.getElementById("Cabecera" + doc.id);


        tablaPedidos.innerHTML += `
            <tr>
                <td>${datos.NumeroFactura}</td>
                <td>${cliente.RazonSocial}</td>
                <td>${datos.entregado}</td>
                <td>${datos.pagado}</td>
                <td>${datos.suma}</td>
                <td>${datos.debe}</td>
                <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                <td>${datos.plazo} dias</td>
                <td>${datos.fechaVencimiento[0]}/${datos.fechaVencimiento[1]}/${datos.fechaVencimiento[2]}</td>
                <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a><br>
                <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a><br>
                <a class="cursor" id="${doc.id}" onclick="contenidoPedido(this)"><img src="img/contenido.png" width=30></a></td>
                
            </tr>
            <tr>
                <td colspan=9>
                     <div id="contenido${doc.id}"></div>
                </td>
            </tr>
            
                `





    })
}

async function cartera(element) {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    cliente = await obtenerCliente(element.id);
    cliente = cliente.data();
    main.innerHTML = `
    ${cliente.RazonSocial} No tiene facturas pendientes.
    `
    CarteraCliente = document.getElementById("CarteraCliente");
    querySnapshot = await obtenerVentasCliente(element.id);
    querySnapshot.forEach(doc => {
        var datos = doc.data();
        if (datos.debe > 0) {
            main.innerHTML = ""
            main.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
            <tr>
                <th>Número de factura</th>
                <th>Cliente</th>
                <th>Estado de entrega</th>
                <th>Estado de pago</th>
                <th>Valor</th>
                <th>debe</th>
                <th>fecha</th>
                <th>plazo</th>
                <th>fecha de vencimiento</th>
                <th colspan=3>Acciones</th>
            </tr>
        </table></div>`;

            var tablaPedidos = document.getElementById("Cabecera" + doc.id);


            tablaPedidos.innerHTML += `
            <tr>
                <td>${datos.NumeroFactura}</td>
                <td>${cliente.RazonSocial}</td>
                <td>${datos.entregado}</td>
                <td>${datos.pagado}</td>
                <td>${datos.suma}</td>
                <td>${datos.debe}</td>
                <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                <td>${datos.plazo} dias</td>
                <td>${datos.fechaVencimiento[0]}/${datos.fechaVencimiento[1]}/${datos.fechaVencimiento[2]}</td>
                <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a><br>
                <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a><br>
                <a class="cursor" id="${doc.id}" onclick="contenidoPedido(this)"><img src="img/contenido.png" width=30></a></td>
                
            </tr>
            <tr>
                <td colspan=9>
                     <div id="contenido${doc.id}"></div>
                </td>
            </tr>
            
                `
        }




    })
}
async function CalcularNomina() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `
    <div class="wrap">
        <center>
        <ul class="tabs">
            <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Calcular Nómina</span></a></li>
            <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Salarios</span></a></li>
            <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Agregar salario</span></a></li>
        </ul>
        </center>
        <div class="secciones">
            <article id="tab1">
    
                <div id="tabOne">
                <div class="form-group col-md-6" >
                    <div class="form-group"><select class="form-control" id="salarios"><option value="">seleccione el tipo de salario</option></select></div>
                    <div class="form-group"><input type="number" id="cantidadNominas" placeholder="ingrese la cantidad de nóminas" class="form-control"> </div>
                    <div class="form-group"><input type="number" id="diasTrabajados" placeholder="ingrese la cantidad de días trabajados" class="form-control"> </div>
                    <div class="form-group"><input type="number" id="cantidadSalarios" placeholder="ingrese la cantidad de salarios" class="form-control"> </div>
                    <div class="form-group"><button class="btn btn-success" onclick="SacarNomina()">Calcular nómina</button></div>
                </div>
                <hr>
                <div class="form-group" id="tablaNomina1">
                    
                </div>
                  </div>
            </article>
            <article id="tab2">
                <div id="tabTwo">
                
                
                    <table class="table table-striped table-bordered" id="TablaSalarios">
                        <tr>
                            <th>Nombre del salario</th>
                            <th>Valor del salario mensualmente</th>
                            <th>Deducciones</th>
                            <th>Auxilios</th>
                        </tr>
                        <div id="aviso">No hay salarios registrados</div>
                    </table>
                </div>
            </article>
            <div class="secciones">
            <article id="tab3">
    
                <div id="tabTree">
                <center>
                <div class="form-group col-md-6">
                <div class="form-group"> <input type="text" class="form-control" placeholder="Nombre del salario*" id="NombreSalario"></div>
                <div class="form-group"> <input type="number" class="form-control" placeholder="Valor del salario mensualmente*" id="valorSalario"></div>
                 <h4>Deducciones</h4>
                 <div id="ListaDeducciones"></div>
                 <div class="form-group"> <input type="text" class="form-control" placeholder="Nombre de la deducción*" id="NombreDeduccion"> </div>
                 <div class="form-group">  <input type="number" class="form-control" placeholder="Porcentaje de la deducción sobre el salario*" id="PorcentajeDeduccion"></div>
                 <a class="cursor" onclick="AgregarDeduccion()"><img src="img/add.png" width=30></a>
                 <hr>
                 <h4>Auxilios</h4>
                 <div id="ListaAuxilios"></div>
                 <div class="form-group"><input type="text" class="form-control" placeholder="Nombre del auxilio*" id="NombreAuxilio"> </div>
                 <div class="form-group"> <input type="number" class="form-control" placeholder="Valor del auxilio mensualmente*" id="ValorAuxilio"></div>
                 <div class="form-group"><a class="cursor" onclick="AgregarAuxilio()"><img src="img/add.png" width=30></a></div>
                 <div class="form-group"><button class="btn btn-danger" onclick="AgregarSalario()">Agregar</button></div>
             </div>
             </center>
                  </div>
            </article>
            
    
            
        </div>
    </div>`;
    cargarTabs();
    var TablaSalarios = document.getElementById("TablaSalarios");
    busquedaSalarios = await obtenerSalarios();
    selectsalarios = document.getElementById("salarios");

    aviso = document.getElementById("aviso")
    busquedaSalarios.forEach(doc => {
        aviso.innerHTML = "";
        var datos = doc.data();
        option = document.createElement("option");
        option.value = doc.id;
        option.text = datos.NombreSalario;
        selectsalarios.appendChild(option);
        TablaSalarios.innerHTML += `
            <td>${datos.NombreSalario}</td>
            <td>${ingresar(datos.valorSalario)}</td>
            <td id="deducciones${doc.id}"></td>
            <td id="auxilios${doc.id}"></td>
        `
        deducciones1 = document.getElementById("deducciones" + doc.id);
        for (let i = 0; i < datos.deducciones.length; i++) {
            deducciones1.innerHTML += `${datos.deducciones[i]} ${datos.deduccionesValor[i]}%<br>`
        }
        auxilios1 = document.getElementById("auxilios" + doc.id);
        for (let i = 0; i < datos.auxilios.length; i++) {
            auxilios1.innerHTML += `${datos.auxilios[i]} $${ingresar(datos.auxiliosValor[i])}<br>`
        }
    })

}
var deducciones = [];
var auxilios = [];
var deduccionesValor = [];
var auxiliosValor = [];

function AgregarDeduccion() {
    var NombreDeduccion = document.getElementById("NombreDeduccion").value;
    var PorcentajeDeduccion = document.getElementById("PorcentajeDeduccion").value;
    PorcentajeDeduccion = parseInt(PorcentajeDeduccion, 10);
    if (PorcentajeDeduccion != NaN && NombreDeduccion != "") {
        deducciones.push(NombreDeduccion);
        deduccionesValor.push(PorcentajeDeduccion);
        var ListaDeducciones = document.getElementById("ListaDeducciones");
        ListaDeducciones.innerHTML = "";
        for (let i = 0; i < deducciones.length; i++) {
            ListaDeducciones.innerHTML += `
                <div class="form-group border" style="padding=3%">
                ${i + 1}. ${deducciones[i]}
                  ${deduccionesValor[i]}%
                </div>
            `
        }
    } else {
        
    }
}
function AgregarAuxilio() {
    var NombreAuxilio = document.getElementById("NombreAuxilio").value;
    var PorcentajeAuxilio = document.getElementById("ValorAuxilio").value;
    PorcentajeAuxilio = parseInt(PorcentajeAuxilio, 10);

    if (PorcentajeAuxilio != NaN && NombreAuxilio != "") {
       
        auxilios.push(NombreAuxilio);
        auxiliosValor.push(PorcentajeAuxilio);

        var ListaAuxilios = document.getElementById("ListaAuxilios");
        ListaAuxilios.innerHTML = "";
        for (let i = 0; i < auxilios.length; i++) {
            ListaAuxilios.innerHTML += `
                <div class="form-group border" style="padding=3%">
                    ${i + 1}. ${auxilios[i]}
                     $${auxiliosValor[i]}
                </div>
            `
        }
    } else {
       
    }
}
const obtenerSalarios = () => db.collection("salarios").get();
function AgregarSalario() {
    var NombreSalario = document.getElementById("NombreSalario").value;
    var valorSalario = document.getElementById("valorSalario").value;
    valorSalario = parseInt(valorSalario, 10);
    if (NombreSalario != "" && valorSalario != NaN) {
        db.collection("salarios").doc().set({ NombreSalario, valorSalario, deducciones, deduccionesValor, auxilios, auxiliosValor })
    }
}
const obtenerSalariosIndividual = (id) => db.collection("salarios").doc(id).get();
async function SacarNomina() {
    cantidadNominas = document.getElementById("cantidadNominas").value;
    salarios = document.getElementById("salarios").value;
    diasTrabajados = document.getElementById("diasTrabajados").value;
    cantidadSalarios = document.getElementById("cantidadSalarios").value;
    tablaNomina1 = document.getElementById("tablaNomina1");
    tablaNomina1.innerHTML = ``;
    if (cantidadNominas != "" && salarios != "" && diasTrabajados != "" && cantidadSalarios != "") {
        doc = await obtenerSalariosIndividual(salarios);
        salario = doc.data();
        cantidadNominas = parseInt(cantidadNominas, 10);
        diasTrabajados = parseInt(diasTrabajados, 10);

        var listaA = []
        var sumaA = 0;
        for (let i = 0; i < salario.auxilios.length; i++) {
            listaA[i] = salario.auxiliosValor[i] / 30
            sumaA += listaA[i] * diasTrabajados;
        }
        var listaD = []
        var sumaD = 0;
        for (let i = 0; i < salario.deducciones.length; i++) {
            listaD[i] = salario.deduccionesValor[i] / 100 * (salario.valorSalario / 30) * diasTrabajados
            sumaD += listaD[i]
        }

        tablaNomina1.innerHTML = `
            <table class="table table-striped table-bordered">
                <tr>
                    <th>Cantidad de salarios</th>
                    <th>Valor mensual del salario</th>
                    <th>Días trabajados</th>
                    <th>Valor Día</th>
                    <th>Devengado</th>
                    <th>Auxilios</th>
                    <th>Deducciones</th>
                    <th>Total a pagar</th>
                    <th>Nómina completa</th>
                </tr>
                <tr>
                    <td>${cantidadNominas}</td>
                    <td>${salario.valorSalario}</td>
                    <td>${diasTrabajados}</td>
                    <td>${salario.valorSalario / 30}</td>
                    <td>${(salario.valorSalario / 30) * diasTrabajados}</td>
                    <td id="Auxilios4"></td>
                    <td id="deducciones4"></td>
                    <td>${(((salario.valorSalario / 30) * diasTrabajados) - sumaD + sumaA).toFixed(2)}</td>
                    <td>${((((salario.valorSalario / 30) * diasTrabajados) - sumaD + sumaA) * cantidadNominas).toFixed(2)}</td>
                </tr>
            </table>
        `
        var auxilios4 = document.getElementById("Auxilios4");
        for (let i = 0; i < listaA.length; i++) {
            auxilios4.innerHTML += `${salario.auxilios[i]}: ${listaA[i] * diasTrabajados}`
        }
        var deducciones4 = document.getElementById("deducciones4");
        for (let i = 0; i < listaD.length; i++) {
           
            deducciones4.innerHTML += `${salario.deducciones[i]}: ${listaD[i].toFixed(2)}<br>`
        }
    }
}