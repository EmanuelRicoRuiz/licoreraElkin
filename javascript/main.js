function RegistrarUsuario() {
    toggle();
    var main = document.getElementById("main");
    main.innerHTML = "";
    main = document.getElementById("login-page");
    main.innerHTML = `

    <div class="form" id="registroPermiso">
        <div class="cabecera">
            <h4>datos del nuevo usuario</h4>
        </div>
        <form class="login-form">
            <input class="input" id="correo" type="text" placeholder="correo electrónico" />
            <input class="input" id="contraseña" type="password" placeholder="contraseña" />
            <input class="input" id="confirmarContra" type="password" placeholder="confirmar contraseña" />
            <h4>Tus datos</h4>
            <input class="input" id="correoAdmin" type="text" placeholder="correo electrónico del gerente" />
            <input class="input" id="contraseñaAdmin" type="password" placeholder="contraseña del gerente" />
            <div id="sugerencias" class="form-gruop">

            </div>
            <input onclick="registrar()" href="#datosPersonales" type="button" class="boton" value="registrar">
            <div id="formularioRegistro">

            </div>

        </form>
    </div>
`;
}
function gestionarusuario() {

    toggle();
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Tipos
                    de usuario</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Agregar o editar</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div class="delimitado" id="tabOne">
              
        
            <div id="nombre">

            <div>
            <br>
            <div id="permisos">
            
            </div>
            </div>
        </article>
        <article id="tab2">
            <div  id="tabTwo">
            <input class="form-control" type="text" id="NombreUsuario" placeholder="ingrese el tipo de usuario*">
                <br>
                <input  type="checkbox" id="permiso1">
                <label  for="permiso1">Gestión de proveedores</label>
                <br>
                <input  type="checkbox" id="permiso2">
                <label  for="permiso2">Gestión de usuarios</label>
                <br>
                <input  type="checkbox" id="permiso3">
                <label  for="permiso3">Registrar nuevos usuarios</label>
                <br>
                <input  type="checkbox" id="permiso4">
                <label  for="permiso4">Gestión de productos</label>
                <br>
                <input  type="checkbox" id="permiso5">
                <label  for="permiso5">Gestionar las ventas</label>
                <br>
                <input  type="checkbox" id="permiso6">
                <label  for="permiso6">Hacer ventas</label>
                <br>
                <input  type="checkbox" id="permiso7">
                <label  for="permiso7">Registro de clientes globales</label>
                <br>
                <input  type="checkbox" id="permiso8">
                <label  for="permiso8">Realizar devoluciones</label>
                <br>
                <input  type="checkbox" id="permiso9">
                <label  for="permiso9">Gestión contable</label>
                <br>
                <input  type="checkbox" id="permiso10">
                <label  for="permiso10">Ver el inventario global</label>
                <br>
                <input  type="checkbox" id="permiso11">
                <label  for="permiso11">Registrar clientes propios</label>
                <br>
                <input  type="checkbox" id="permiso12">
                <label  for="permiso12">Calcular nómina</label>
                <br>
                <input  type="checkbox" id="permiso13">
                <label  for="permiso13">Registrar factura de compra</label>
                <br>
                
                <button class="btn btn-success" onclick="guardarTipoDeUsuario()">Guardar</button>
                <br><br>
                <div id="sugerencia">
               </div>
               <div id="aviso">
               </div>
            </div>
        </article>

        
    </div>
</div>`;
    cargarTabs();

    buscarTU();
}
function inicio() {
    event.preventDefault();
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<h1>estadísticas</h1>`;
}



function ventasGenerales() {
    event.preventDefault();

    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Lista de ventas</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Recaudo</span></a></li>
        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Lista de vencidas</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            </div>
        </article>
        <article id="tab3">
            <div id="tabTree">
            
            </div>
        </article>
        

        
    </div>
</div>`;
    cargarTabs();
    var hoy = new Date();

    tabOneVentasG(hoy.getMonth() + 1, hoy.getFullYear());
    tabTwoVentasG(hoy.getMonth() + 1, hoy.getFullYear());
    tabTreeVentasG(hoy.getMonth() + 1, hoy.getFullYear());
    LlenarFechas(true, true, true);
}
function tabTreeVentasG(mes, año) {
    var tabTree = document.getElementById("tabTree");
    tabTree.innerHTML = `
    <div >
    <h3>Filtros:</h3>
    <div class="OuterMostClass row">
    <div class="outerClass col-md-4">
        <select id="meses3" class="form-control">
            <option value="" >Seleccione el mes</option>
        </select>
    </div>
    <div class="outerClass2 col-md-4">
        <select id="años3" class="form-control">
            <option value="" >Seleccione el año</option>
        </select><br>
    </div>
    <div class="outerClass3 col-md-4">
        <button class="btn btn-danger" id="3" onclick="FiltrarG(this)">Filtrar</button>
    </div>
    </div>
    </div>
    <hr>
    
    `
    var meses = document.getElementById("meses3");
    var años = document.getElementById("años3");
    meses.value = mes;
    años.value = año;

    db.collection("ventas").orderBy("NumeroFactura", "desc").where("entregado", "==", true).get().then(querySnapshot=> {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();


            var fechaVencimiento = new Date(datos.fechaVencimiento[2], datos.fechaVencimiento[1] - 1, datos.fechaVencimiento[0])
            var fechaActual = new Date();

            if (fechaActual >= fechaVencimiento && datos.entregado && mes == datos.fecha[1] && año == datos.fecha[2]) {


                tabTree.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera2${doc.id}">
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

                var tablaPedidos1 = document.getElementById("Cabecera2" + doc.id);


                tablaPedidos1.innerHTML += `
                <tr>
                    <td>${datos.NumeroFactura}</td>
                    <td id="${datos.cliente}1${datos.NumeroFactura}"></td>
                    <td>${datos.entregado}</td>
                    <td>${datos.pagado}</td>
                    <td>${ingresar(datos.suma)}</td>
                    <td>${ingresar(datos.debe)}</td>
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
                db.collection("clientes").where("nit", "==", datos.cliente).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc2) => {
                        var datosCliente = document.getElementById(`${datos.cliente}1${datos.NumeroFactura}`);
                        datos2 = doc2.data();
                        datosCliente.innerHTML = `${datos2.RazonSocial}`
                    })
                })
            }
        })


    })

}
function tabTwoVentasG(mes, año) {

    var tabTwo = document.getElementById("tabTwo");
    tabTwo.innerHTML = `
    <div >
    <h3>Filtros:</h3>
    <div class="OuterMostClass row">
    <div class="outerClass col-md-4">
        <select id="meses2" class="form-control">
            <option value="" >Seleccione el mes</option>
        </select>
    </div>
    <div class="outerClass2 col-md-4">
        <select id="años2" class="form-control">
            <option value="" >Seleccione el año</option>
        </select><br>
    </div>
    <div class="outerClass3 col-md-4">
        <button class="btn btn-danger" id="2" onclick="FiltrarG(this)">Filtrar</button>
    </div>
    </div>
    </div>
    <hr>
    `
    var meses = document.getElementById("meses2");
    var años = document.getElementById("años2");
    meses.value = mes;
    años.value = año;

    tabTwo.innerHTML += `
    
    <div id="ValorRecaudo"></div>
    <h5 id="aviso"></h5>
    
    <div>
    <p id="aviso1">no hay abonos este mes.</p>
        <table id="tablaRecaudo" class="table table-striped table-bordered">
        <tr><th colspan=6><center>Lista de Abonos</center></th></tr>
            <tr>
                <th>Número de factura</th>
                <th>Cantidad del abono</th>
                <th>Fecha</th>
                <th>Rentabilidad</th>
                
                <th>Ganacia</th>
            </tr>
        </table>
    </div>`;
    var suma = 0;
    var promedio = 0;
    var suma1 = 0;
    var entrada = false;
    var user = firebase.auth().currentUser;
    user = user.uid;
    comision = 0
    db.collection("abonos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            db.collection("ventas").where("NumeroFactura", "==", datos.NumeroFactura).get().then((querySnapshot) => {
                querySnapshot.forEach((doc2) => {
                    var datos2 = doc2.data();


                    entrada = true;
                    var avis = document.getElementById("aviso1");
                    avis.innerHTML = "";
                    suma += datos.cantidad_abono;


                    var tablaRecaudo = document.getElementById("tablaRecaudo");


                    tablaRecaudo.innerHTML += `
                                    <tr>
                                        <td>${datos.NumeroFactura}</td>
                                        <td>${ingresar(datos.cantidad_abono)}</td>
                                        <td>${datos.fecha}</td>
                                        <td>${datos.rentabilidad.toFixed(2)}</td>
                                        <td>${nombre} ${apellido}</td>
                                        <td>${(datos.rentabilidad / 100 * datos.cantidad_abono).toFixed(2)}</td>
                                    </tr>
                                    `

                    var recaudo1 = document.getElementById("ValorRecaudo");
                    recaudo1.innerHTML = `
                        <center>
                        <div class="col-md-6">
                            <table class="table table-striped table-bordered">
                                <tr>
                                    <td>Mes/Año: ${mes}/${año}</td>
                                </tr>
                                <tr>
                                    <td>Recaudo: $${ingresar(suma)}</td>
                                </tr>
                                
                            </table>
                        </div>
                        </center>`



                })

            })




        })

    })







}
function tabOneVentasG(mes, año) {
    var tabOne = document.getElementById("tabOne");
    tabOne.innerHTML = `
    <div >
    <h3>Filtros:</h3>
    <div class="OuterMostClass row">
    <div class="outerClass col-md-4">
        <select id="meses1" class="form-control">
            <option value="" >Seleccione el mes</option>
        </select>
    </div>
    <div class="outerClass2 col-md-4">
        <select id="años1" class="form-control">
            <option value="" >Seleccione el año</option>
        </select><br>
    </div>
    <div class="outerClass3 col-md-4">
        <button class="btn btn-danger" id="1" onclick="FiltrarG(this)">Filtrar</button>
    </div>
    </div>
    </div>
    <hr>
    `

    db.collection("ventas").orderBy("NumeroFactura", "desc").get().then(querySnapshot=> {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var fechaVencimiento = new Date(datos.fechaVencimiento[2], datos.fechaVencimiento[1] - 1, datos.fechaVencimiento[0])
            var fechaActual = new Date();

            if (fechaActual < fechaVencimiento && datos.entregado && mes == datos.fecha[1] && año == datos.fecha[2]) {


                tabOne.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
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
                    <td id="${datos.cliente}${datos.NumeroFactura}"></td>
                    <td>${datos.entregado}</td>
                    <td>${datos.pagado}</td>
                    <td>${ingresar(datos.suma)}</td>
                    <td>${ingresar(datos.debe)}</td>
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
                db.collection("clientes").where("nit", "==", datos.cliente).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc2) => {
                        var datosCliente = document.getElementById(`${datos.cliente}${datos.NumeroFactura}`);
                        datos2 = doc2.data();
                        datosCliente.innerHTML = `${datos2.RazonSocial}`
                    })
                })
            }
        })




    })

}
function FiltrarG(element) {
    var id = element.id;
    if (id == "1") {
        var meses = document.getElementById("meses1").value;
        var años = document.getElementById("años1").value;
        if (meses != "" && años != "") {
            tabOneVentas(meses, años);
            LlenarFechas(true, false, false);
        }

    } else if (id == "2") {
        var meses = document.getElementById("meses2").value;
        var años = document.getElementById("años2").value;
        if (meses != "" && años != "") {
            tabTwoVentas(meses, años);
            LlenarFechas(false, true, false);
        }
    } else if (id == "3") {
        var meses = document.getElementById("meses3").value;
        var años = document.getElementById("años3").value;
        if (meses != "" && años != "") {
            tabTreeVentas(meses, años);
            LlenarFechas(false, false, true);
        }
    }
}
function Proveedores() {

    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap ">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Registro de proveedores</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Lista de proveedores</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            <center>
                <form class="form-group col-md-8">
                    <div class="form-group">
                        <input type="text" placeholder="Nombre del proveedor*" id="NombreP" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Código del proveedor*" id="codigoP" class="form-control">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-danger" onclick="RegistrarProveedor()">Registrar</button>
                    </div>
                </form>
            </center>
            </div>
        </article>
        <article id="tab2">
            <div class="delimitado" id="tabTwo">
            
            </div>
        </article>
    </div>
</div>`;
    cargarTabs();
    ListarProveedores();
}
function onKeyUp(element, event) {
    
        if (event.keyCode == "13" || event.keyCode == "69") {
            console.log(element.value);
            db.collection("productos").doc(element.value).get().then(doc => {
                var datos = doc.data();
                var valor = document.getElementById("valor");
                valor.value = datos.PRECIO_VENTA;
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Producto inválido',
                    text: 'El producto no existe',
        
                }) 
            });
            
        }

    

}
const obtenerVentasSinEntregar = () => db.collection("ventas").orderBy("NumeroFactura", "desc").where("entregado", "==", false).get();

async function pedidosGenerales() {
    var main = document.getElementById("main");
    main.innerHTML = ``;
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    main.innerHTML += `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Hacer pedido</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Lista de pedidos</span></a></li>
        
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            <br>
            <center><h2>Montar venta</h2></center>
            
            <input onkeyup="onKeyUp(this,event)" list="productos" id="productos1" class="form-control"
                placeholder="Nombre del producto">
        
            <center>
                <table class="table">
                    <tr>
                        <td>
                            cliente:
                            <input list="clientes" id="clientes1" class="form-control"
                                placeholder="Nombre del cliente">
                        </td>
                        <td>
                            Cantidad:
                            <input id="cantidadVenta" class="form-control " placeholder="cantidad" value="1">
                        </td>
                        <td>
                            Valor:
                            <input id="valor" class="form-control " placeholder="Valor del producto">
                        </td>
                    </tr>
                </table>
                <datalist class="form-select" id="productos"></datalist>
                <datalist class="form-select" id="clientes"> </datalist>
                <br><button class="btn btn-primary" onclick="Emitir()">Emitir</button>
                    <br><br>
            </center>
            <div class="overflow-auto">
                <table>
                    <h3>Lista de productos:</h3><br>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Código del producto</th>
                                <th>Nombre del producto</th>
                                <th>stock</th>
                                <th>precio del producto</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tabla5"></tbody>
                        <tbody id="tabla4"></tbody>
                        <tr>
                            <td  colspan="6" class="text-right">
                            Subtotal:
                            <div id="ValorVentaT"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan=7>
                                <center>
                                    <div id="botonGuadar"></div>
                                </center>
                            </td>
                        </tr>
                        
        
                    </table>
                </table>
            </div>
        
            <div id="nombre">

            <div>
            <br>
            <div id="permisos">
            
            </div>
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            <h3>Lista de pedidos: </h3>
            </div>
        </article>
        

        
    </div>
</div>
  `;
    
        var listaProductos = document.getElementById("productos")
        db.collection("productos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var datos = doc.data();
                var option = document.createElement("option");
                option.value = datos.CODIGO;
                option.text = `Nombre: ${datos.DESCRIPCION}\n Cantidad: ${datos.STOCK}`;
                listaProductos.appendChild(option);
            });
        })
    var clientes = document.getElementById("clientes")
    var user = firebase.auth().currentUser;
    user = user.uid
    db.collection("clientes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var datos = doc.data();
            if (datos.RazonSocial == "generico") {
                var clientes1 = document.getElementById("clientes1");
                clientes1.value = doc.id;
            }
            var option = document.createElement("option");
            option.value = doc.id;
            option.text = `Nombre: ${datos.RazonSocial}`;
            clientes.appendChild(option);
        });
    })
    cargarTabs();

    var tabTwo = document.getElementById("tabTwo");
    var user = firebase.auth().currentUser;
    user = user.uid;
    var ventas = await obtenerVentasSinEntregar();
    var posiciones = [];

    ventas.forEach((doc) => {

        var datos = doc.data();
        tabTwo.innerHTML += `<div class="overflow-auto"><table  class="table table-striped table-bordered" id="Cabecera${doc.id}">
                    <tr>
                        <th>Número de factura</th>
                        <th>Estado de entrega</th>
                        <th>Estado de pago</th>
                        <th>Valor</th>
                        <th>debe</th>
                        <th>fecha</th>
                        <th>Rentabilidad</th>
                        <th>Plazo</th>
                       
                    </tr>
                </table></div>`;
        var tablaPedidos = document.getElementById("Cabecera" + doc.id);
        tablaPedidos.innerHTML += `
                    <tr>
                        <td>${datos.NumeroFactura}</td>
                        <td>${datos.entregado}</td>
                        <td>${datos.pagado}</td>
                        <td>${ingresar(datos.suma)}</td>
                        <td>${ingresar(datos.debe)}</td>
                        <td>${datos.fecha[0]}/${datos.fecha[1]}/${datos.fecha[2]}</td>
                        <td>${datos.rentabilidad.toFixed(2)}%</td>
                        <td>${datos.plazo} Dias</td>
                        <td><a class="cursor" id="${doc.id}" onclick="AbonarPedido(this)"><img src="img/abono.png" width=30></a>
                        <a class="cursor" id="${doc.id}" onclick="cambiarEstado(this)"><img src="img/envio.png" width=30></a>
                        <a class="cursor" id="${doc.id}" onclick="facturaPdf(this)"><img src="img/factura.png" width=30></a>
                        <a class="cursor" id="${doc.id}" onclick="contenidoPedido(this)"><img src="img/contenido.png" width=30></a></td>
                    </tr>
                    
                    <tr>
                        <td colspan=8   >
                             <div id="contenido${doc.id}"></div>
                        </td>
                    </tr>
                    
                        `
    })

}
function ListarProveedores() {
    var tabTwo = document.getElementById("tabTwo");
    tabTwo.innerHTML = `
        <table class="table table-striped table-bordered delimitado" id="tablaP">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre proveedor</th>
                    <th>Deuda</th>
                <tr>
            <thead>
        </table>
    
    `
    var tablaP = document.getElementById("tablaP");
    db.collection("proveedores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            tablaP.innerHTML += `
                <tr>
                    <td>${datos.codigo}</td>
                    <td>${datos.nombre}</td>
                    <td>$${ingresar(datos.deuda)}</td>
                    <td><a id="${doc.id}" onclick="verProveedor(this)"><img src="img/ojo.png" width=30 class="cursor"></a>
                    <a id="${doc.id}" onclick="eliminarProveedor(this)"><img src="img/delete.png" width=30 class="cursor"></a></td>
                </tr>    
            
        `
        })
    })
}

function comprasInterface() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `
        <center>
            <h2>Registrar Compra</h2>
            <div class="col-md-8">
                <form class="form-group">
                    <div class="form-group">
                        <input type="text" placeholder="Número de la factura" class="form-control" id="Nfactura">
                    </div>
                    <div class="form-group">
                        <input list="proveedores" placeholder="Proveedor" class="form-control" id="proveedor">
                        <datalist id="proveedores"></datalist>
                    </div>
                    <div class="form-group">
                        <input type="number" placeholder="Valor de la factura" class="form-control" id="valorFactura">
                    </div>
                    <div class="form-group">
                        <input type="radio" id="si" name="drone" value="si"
                                checked class="form-check-input">
                        <label for="si" class="form-check-label">Pagado</label>
                    </div>

                    <div class="form-group">
                        <input type="radio" id="no" name="drone" value="no" class="form-check-input">
                        <label for="no" class="form-check-label">No pagado</label>
                    </div>
                    <div class="form-group">
                        <button onclick="RegistrarCompra()" class="btn btn-danger">Registrar compra</button>
                    </div>
                </form>
            </div>
        </center>
        `
    var ListaProveedores = document.getElementById("proveedores");
    db.collection("proveedores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var option = document.createElement("option");
            option.value = datos.codigo;
            option.text = datos.nombre;
            ListaProveedores.appendChild(option);
        })
    })
}


function ingresarProductosInterface() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<br><br><center><div class="col-md-10" >
    <div class="card">
        <div class="card-body" id="contenido3">
            <form>
                <div class="form-gruop">
                    <h3>Registrar Producto</h3>
                    <br><hr><br>
                </div>
                <div class="form-group">
                    <h5>Código del producto</h5>
                    <input type="text" id="codidoPR" class="form-control" placeholder="código">
                </div>
                
                <div class="form-group">
                    <h5>Descripción del producto</h5>
                    <input type="text" id="nombrePR" class="form-control" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <h5>Precio de venta del producto</h5>
                    <input type="text" id="precioPr" class="form-control" placeholder="precio">
                </div>
                <div class="form-group">
                    <h5>Precio de costo del producto</h5>
                    <input type="text" id="costoPr" class="form-control" placeholder="Costo" >
                </div>
                <div class="form-group">
                    <h5>Cantidad del producto</h5>
                    <input type="text" id="stockPr" class="form-control" placeholder="cantidad" >
                </div>
                <div class="form-group">
                    <h5>Proveedor</h5>
                    <input type="text" class="form-control" id="proveedores1" placeholder="proveedor">
                </div>
                <div class="form-group">
                    <h5>Límite Mínimo del producto</h5>
                    <input type="text" id="limiteM" class="form-control" placeholder="límite mínimo">
                </div>
                <div class="form-group">
                    <h5>categoría</h5>
                    <input type="text" id="categoria" class="form-control" placeholder="categoria">
                </div>
                <div class="form-group">
                    <h5>Cantidad de tragos</h5>
                    <input type="text" id="ventasTrago" class="form-control" placeholder="Cantidad de tragos por unidad*">
                </div>
                <div class="form-group">
                    <h5>Valor venta por trago</h5>
                    <input type="text" id="valorTrago" class="form-control" placeholder="valor del trago*">
                </div>
                <div id="sugerencias" class="form-gruop">

                </div>
                <div id="botonE">
                    <button onclick="hacerRegistroProducto()" class="btn btn-danger" id="btn-task-form">
                        Registrar Producto
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
<br><hr><br></center>`;



}


async function cargarClientes() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Lista de clientes</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Registrar nuevo cliente</span></a></li>
        
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
              <h3>Lista de clientes</h3>
                <div id="ListaClientes" class="overflow-auto"></div>
            <div id="nombre">

            
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            <div id="RegistroClientes">
            
            </div>
            </div>
        </article>
        
        

        
    </div>
</div>`;
    cargarTabs();
    var ListaClientes = document.getElementById("ListaClientes");
    ListaClientes.innerHTML = `<table class="table table-striped table-bordered" id="tabla8">
        <tr>
            <th>Nit</th>
            <th>Razón social</th>
            <th>Direccion</th>
            
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Barrio</th>
            <th>Plazo de pago</th>
            <th colspan=4>Acciones</th>
        </tr>
    </table>`;
    db.collection("clientes").get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
            var datos = doc.data();
            var RazonSocial = datos.RazonSocial
            var nit = datos.nit;
            var Direccion = datos.Direccion;

            var tabla8 = document.getElementById("tabla8");




            tabla8.innerHTML += `
            <tr>
                <td>${nit}</td>
                <td>${RazonSocial}</td>
                <td>${Direccion}</td>
                
                <td>${datos.ciudad}</td>
                <td>${datos.telefono}</td>
                <td>${datos.barrio}</td>
                <td>${datos.plazo}</td>
                <td><a id="${doc.id}" class="cursor" onclick="EditarCliente(this)"><img src="img/editar.png" width=30></a></td>
                <td><a id="${doc.id}" class="cursor" onclick="EliminarCliente(this)"><img src="img/delete.png" width=30></a></td>
                <td><a id="${doc.id}" class="cursor" onclick="cartera(this)"><img src="img/cartera.png" width=30></a></td>
                <td><a class="cursor" id="${doc.id}" onclick="historialCompra(this)"><img src="img/cuadrado.png" width=30></a></td>
            </tr>`;
        })
    })
    var RegistroClientes = document.getElementById("RegistroClientes");
    RegistroClientes.innerHTML = `<center><div class="col-md-10" >
    <div class="card">
        <div class="card-body" id="contenido3">
            <form>
                <div class="form-gruop">
                    <h3>Registrar Cliente</h3>
                    <br><hr><br>
                </div>
                <div class="form-group">
                    <h5>Nit del cliente*</h5>
                    <input type="text" id="nit" class="form-control" placeholder="Nit*">
                </div>
                <div class="form-group">
                    <h5>Razón Social*</h5>
                    <input type="text" id="RazonSocial" class="form-control" placeholder="Razon Social*">
                </div>
                <div class="form-group">
                    <h5>Direccion*</h5>
                    <input type="text" id="Direccion" class="form-control" placeholder="Direccion*">
                </div>
                <div class="form-group">
                    <h5>Teléfono*</h5>
                    <input type="text" id="telefono" class="form-control" placeholder="teléfono*">
                </div>
                <div class="form-group">
                    <h5>Ciudad*</h5>
                    <input type="text" id="ciudad" class="form-control" placeholder="Ciudad*">
                </div>
                <div class="form-group">
                    <h5>Barrio*</h5>
                    <input type="text" id="barrio" class="form-control" placeholder="Barrio*">
                </div>
                <div class="form-group">
                    <h5>Plazo de pago*</h5>
                    <input type="number" id="plazo" class="form-control" placeholder="Plazo de pago en días*">
                </div>
                
                
                
                <br>
                <div id="botonE">
                    <button onclick="hacerRegistroCliente()" class="btn btn-danger" id="btn-task-form">
                        Registrar cliente
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
<br><hr><br></center>`;

}

function ventas() {
    event.preventDefault();

    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Lista de ventas</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Recaudo</span></a></li>
        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Lista de vencidas</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            </div>
        </article>
        <article id="tab3">
            <div id="tabTree">
            
            </div>
        </article>
        

        
    </div>
</div>`;
    cargarTabs();
    var hoy = new Date();

    tabOneVentas(hoy.getMonth() + 1, hoy.getFullYear());
    tabTwoVentas(hoy.getMonth() + 1, hoy.getFullYear());
    tabTreeVentas(hoy.getMonth() + 1, hoy.getFullYear());
    LlenarFechas(true, true, true);
}

function Filtrar(element) {
    var id = element.id;
    if (id == "1") {
        var meses = document.getElementById("meses1").value;
        var años = document.getElementById("años1").value;
        if (meses != "" && años != "") {
            tabOneVentas(meses, años);
            LlenarFechas(true, false, false);
        }

    } else if (id == "2") {
        var meses = document.getElementById("meses2").value;
        var años = document.getElementById("años2").value;
        if (meses != "" && años != "") {
            tabTwoVentas(meses, años);
            LlenarFechas(false, true, false);
        }
    } else if (id == "3") {
        var meses = document.getElementById("meses3").value;
        var años = document.getElementById("años3").value;
        if (meses != "" && años != "") {
            tabTreeVentas(meses, años);
            LlenarFechas(false, false, true);
        }
    }
}
function FiltrarG(element) {
    var id = element.id;
    if (id == "1") {
        var meses = document.getElementById("meses1").value;
        var años = document.getElementById("años1").value;
        if (meses != "" && años != "") {
            tabOneVentasG(meses, años);
            LlenarFechas(true, false, false);
        }

    } else if (id == "2") {
        var meses = document.getElementById("meses2").value;
        var años = document.getElementById("años2").value;
        if (meses != "" && años != "") {
            tabTwoVentasG(meses, años);
            LlenarFechas(false, true, false);
        }
    } else if (id == "3") {
        var meses = document.getElementById("meses3").value;
        var años = document.getElementById("años3").value;
        if (meses != "" && años != "") {
            tabTreeVentasG(meses, años);
            LlenarFechas(false, false, true);
        }
    }
}
function LlenarFechas(uno, dos, tres) {
    var meses = document.getElementById("meses1");
    var años = document.getElementById("años1");
    var meses2 = document.getElementById("meses2");
    var años2 = document.getElementById("años2");
    var meses3 = document.getElementById("meses3");
    var años3 = document.getElementById("años3");
    if (uno) {
        for (let i = 1; i < 13; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            meses.appendChild(option);

        }
        var hoy = new Date();
        año = hoy.getFullYear();
        for (let i = año; i > 2000 - 1; i--) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            años.appendChild(option);

        }
    }
    if (dos) {
        for (let i = 1; i < 13; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;

            meses2.appendChild(option);

        }
        var hoy = new Date();
        año = hoy.getFullYear();
        for (let i = año; i > 2000 - 1; i--) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;

            años2.appendChild(option);

        }
    }
    if (tres) {
        for (let i = 1; i < 13; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;

            meses3.appendChild(option);
        }
        var hoy = new Date();
        año = hoy.getFullYear();
        for (let i = año; i > 2000 - 1; i--) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;

            años3.appendChild(option);
        }
    }

}
function contenidoPedido(element) {
    var container = document.getElementById(`contenido${element.id}`);
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == element.id) {


                var datos = doc.data();
                container.innerHTML =
                    `<center><button class="btn btn-success btn-block" id="${element.id}" onclick="ocultarPedido(this)">Ocultar contenido</button></td></center>
                    <td colspan=10>
                    <table  class="table table-striped table-bordered" id="tabla${element.id}">
                        <tr>
                            <th>Código del producto</th>
                            <th>Nombre del producto</th>
                            <th>Cantidad</th>
                            <th>Valor</th>
                        </tr>
                    </table>
                    </td>
                
            `
                var contenido = document.getElementById("tabla" + element.id);
                for (let i = 0; i < datos.cantidades.length; i++) {
                    contenido.innerHTML += `
                        <tr>
                            <th>${datos.idProducto[i]}</th>
                            <th id="${datos.NumeroFactura}${datos.idProducto[i]}${i}"></th>
                            <th>${datos.cantidades[i]}</th>
                            <th>${datos.descuentos[i]}</th>
                        </tr>

                `;
                    var cont = 0;
                    db.collection("productos").where("CODIGO", "==", datos.idProducto[i]).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            var nombre = document.getElementById(datos.NumeroFactura + datos.idProducto[i] + cont);
                            datos2 = doc2.data();
                            nombre.innerHTML = `${datos2.DESCRIPCION}`;
                            cont += 1;
                        })
                    })
                }
            }
        })
    })

}
function contenidoFactura(element) {
    var container = document.getElementById(`contenido1${element.id}`);
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == element.id) {


                var datos = doc.data();
                container.innerHTML =
                    `<center><button class="btn btn-success btn-block" id="${element.id}" onclick="ocultarFactura(this)">Ocultar contenido</button></td></center>
                    <td colspan=10>
                    <table  class="table table-striped table-bordered" id="tablaV${element.id}">
                        <tr>
                        <th>Código del producto</th>
                        <th>Nombre del producto</th>
                        <th>Cantidad</th>
                        <th>Descuento</th>
                        </tr>
                    </table>
                    </td>
                
            `
                var contenido = document.getElementById("tablaV" + element.id);
                for (let i = 0; i < datos.cantidades.length; i++) {
                    contenido.innerHTML += `
                        <tr>
                            <th>${datos.idProducto[i]}</th>
                            <th id="${datos.NumeroFactura}${datos.idProducto[i]}"></th>
                            <th>${datos.cantidades[i]}</th>
                            <th>${datos.descuentos[i]}%</th>
                        </tr>

                `;
                    db.collection("productos").where("CODIGO", "==", datos.idProducto[i]).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            var nombre = document.getElementById(datos.NumeroFactura + datos.idProducto[i]);
                            datos2 = doc2.data();
                            nombre.innerHTML = `${datos2.DESCRIPCION}`;
                        })
                    })
                }
            }
        })
    })

}
function ocultarPedido(element) {

    var container = document.getElementById(`contenido${element.id}`);
    container.innerHTML = "";
}
function ocultarFactura(element) {

    var container = document.getElementById(`contenido1${element.id}`);
    container.innerHTML = "";
}
const obtenerProductosglobal = () => db.collection("productos").get();
var productos1;
async function InventarioGlobal() {

    var tabTree = document.getElementById("main");
    tabTree.innerHTML = "";
    tabTree.innerHTML = `
    <br><br><hr>
    <input class="form-control" type="text" id="buscador" placeholder="Nombre del producto">
    <br>
    <button class="btn btn-info" onclick="filterProductosGlobal()">Buscar</button>
    <br><h3>Lista de productos:<div id="ValorInventario"></div></h3><br><div class="delimitado"><table class="table table-striped table-bordered">
     <thead>
       <tr>
         <th>CODIGO</th>
         <th>DESCRIPCION</th>
         <th>PRECIO DE VENTA</th>
         
         <th>STOCK</th>
         
         
         <th colspan=4>Acciones</th>
         <tbody id="tabla3">

         </tbody>
       </tr>
     </thead>
   </table></div>`;
    var validado = false;
    if (!validado) {
        tabTree.innerHTML += `<center><div id="aviso"><img width="100" src="img/carga.gif"></div></center>`;
    }


    productos1 = await obtenerProductosglobal();
    cargarListaglobal();



}
function filterProductosGlobal() {
    var tabla3 = document.getElementById("tabla3");
    tabla3.innerHTML = "";

    productos1.forEach((doc) => {
        datos = doc.data();
        let nombre = datos.DESCRIPCION.toLowerCase();
        let texto = document.getElementById("buscador").value.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {

            validado = true;


            var aviso = document.getElementById("aviso");
            aviso.innerHTML = "";
            fila = document.createElement("tr");
            Ccodigo = document.createElement("td");
            Ccodigo.innerHTML = datos.CODIGO
            Cdescripcion = document.createElement("td");
            Cdescripcion.innerHTML = datos.DESCRIPCION;
            CprecioVenta = document.createElement("td");
            CprecioVenta.innerHTML = ingresar(datos.PRECIO_VENTA);

            Cstock = document.createElement("td");
            Cstock.innerHTML = datos.STOCK;



            Cacciones = document.createElement("td");
            Cacciones.innerHTML = `<a class="cursor" id="${doc.id}" onclick="observacion(this)"><img src="img/obs.png" width=20 title="Observación"></a><br>
                <a class="cursor" id="${doc.id}" onclick="mirarObsAdmin(this)"><img src="img/ojo.png" width=20 title="Observaciones"></a><br>
                `
            fila.appendChild(Ccodigo);
            fila.appendChild(Cdescripcion);
            fila.appendChild(CprecioVenta);

            fila.appendChild(Cstock);


            fila.appendChild(Cacciones);
            tabla3.appendChild(fila);
        }


    })

}
function cargarListaglobal() {
    var tabla3 = document.getElementById("tabla3");
    var suma = [];
    productos1.forEach((doc) => {
        validado = true;
        datos = doc.data();

        var aviso = document.getElementById("aviso");
        aviso.innerHTML = "";
        fila = document.createElement("tr");
        Ccodigo = document.createElement("td");
        Ccodigo.innerHTML = datos.CODIGO
        Cdescripcion = document.createElement("td");
        Cdescripcion.innerHTML = datos.DESCRIPCION;
        CprecioVenta = document.createElement("td");
        CprecioVenta.innerHTML = ingresar(datos.PRECIO_VENTA);

        Cstock = document.createElement("td");
        Cstock.innerHTML = datos.STOCK;



        Cacciones = document.createElement("td");
        Cacciones.innerHTML = `<a class="cursor" id="${doc.id}" onclick="observacion(this)"><img src="img/obs.png" width=20 title="Observación"></a><br>
                <a class="cursor" id="${doc.id}" onclick="mirarObsAdmin(this)"><img src="img/ojo.png" width=20 title="Observaciones"></a><br>
                `
        fila.appendChild(Ccodigo);
        fila.appendChild(Cdescripcion);
        fila.appendChild(CprecioVenta);

        fila.appendChild(Cstock);


        fila.appendChild(Cacciones);
        tabla3.appendChild(fila);

    })

}
function RealizarDevoluciones() {
    var login = document.getElementById("login-page");
    login.innerHTML = "";
    var main = document.getElementById("main");
    main.innerHTML = `<div class="wrap">
    <center>
    <ul class="tabs">
        <li><a href="#tab1"><span class="fa fa-home"></span><span class="tab-text">Realizar devolución</span></a></li>
        <li><a href="#tab2"><span class="fa fa-group"></span><span class="tab-text">Listado de devoluciones</span></a></li>
        <li><a href="#tab3"><span class="fa fa-group"></span><span class="tab-text">Garantías</span></a></li>
    </ul>
    </center>
    <div class="secciones">
        <article id="tab1">

            <div id="tabOne">
            <table class="table">
            <tr>
               <td> <input list="productos" id="productos1" class="form-control"
                placeholder="Nombre del producto">
                </td>
                <td> 
                <input list="clientes" id="clientes1" class="form-control"
                                placeholder="Nombre del cliente">
                </td>
               
               <td>
               <select class="form-control" id="tipoDeDevolucion">
               <option class="form-select" value="">Seleccione el tipo de devolución</option>
                <option class="form-select" value="garantia">Garantía</option>
                <option class="form-select" value="inventario">Inventario</option>
               </select>
               </td>
               <td> <input id="cantidades" class="form-control" placeholder="cantidad"></td>
               
               
            </tr>
            <tr>
                <td><button class="btn btn-danger" onclick="Devolver()">Ingresar</button></td>
            </tr>
            </table>
            <br>
            <datalist class="form-select" id="productos">
                </datalist>
                <datalist class="form-select" id="clientes">
                </datalist>
            </div>
        </article>
        <article id="tab2">
            <div id="tabTwo">
            
            </div>
        </article>
        <article id="tab3">
            <div id="tabTree">
            
            </div>
        </article>
        

        
    </div>
</div>`;
    var listaProductos = document.getElementById("productos")
    db.collection("productos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var option = document.createElement("option");
            option.value = datos.CODIGO;
            option.text = `Nombre: ${datos.DESCRIPCION}\n Cantidad: ${datos.STOCK}`;
            listaProductos.appendChild(option);
        });
    })
    var clientes = document.getElementById("clientes")
    db.collection("clientes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            var option = document.createElement("option");
            option.value = doc.id;
            option.text = `Nombre: ${datos.RazonSocial}`;
            clientes.appendChild(option);
        });
    })
    cargarTabs();
    cargarDevoluciones();
    cargarGarantias();
}
function cargarDevoluciones() {
    var tabTwo = document.getElementById("tabTwo");
    tabTwo.innerHTML = `<h5>Devoluciones por inventario:</h5>
           
   `
    db.collection("devoluciones").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            estado = false;
            for (let j = 0; j < datos.tipo.length; j++) {

                if (datos.tipo[j] == "inventario") {
                    estado = true;
                }
            }

            if (estado) {


                tabTwo.innerHTML += `<br><br>
                    <table id=tabla${doc.id} class="table table-striped table-bordered">
                        <tr><th colspan=2>Código del producto: ${doc.id}<th></tr>
                        <tr>
                            <td>Cantidades</td>
                            <td>Clientes</td>
                            <td>fechas</td>
                        </tr>
                    </table>
            `
                var cantidad = datos.cantidad;
                var cliente = datos.cliente;
                var fecha = datos.fecha;
                for (let j = 0; j < datos.tipo.length; j++) {

                    if (datos.tipo[j] == "inventario") {

                        var tabla = document.getElementById(`tabla${doc.id}`);
                        tabla.innerHTML +=
                            `
                                          <tr>
                                            <td>${cantidad[j]}</td>
                                            <td>${cliente[j]}</td>
                                            <td>${fecha[j]}</td>
                                        
                                          </tr>
                                        `
                    }
                }


            }
        })
    })
}

function cargarGarantias() {
    var tabTree = document.getElementById("tabTree");
    tabTree.innerHTML = `<h5>Devoluciones por Garantía:</h5>
           
   `
    db.collection("devoluciones").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var datos = doc.data();
            estado = false;
            for (let j = 0; j < datos.tipo.length; j++) {

                if (datos.tipo[j] == "garantia") {
                    estado = true;
                }
            }

            if (estado) {


                tabTree.innerHTML += `<br><br>
                    <table id=tablaG${doc.id} class="table table-striped table-bordered">
                        <tr><th colspan=2>Código del producto: ${doc.id}<th></tr>
                        <tr>
                            <td>Cantidades</td>
                            <td>Clientes</td>
                            <td>fechas</td>
                        </tr>
                    </table>
            `
                var cantidad = datos.cantidad;
                var cliente = datos.cliente;
                var fecha = datos.fecha;

                for (let j = 0; j < datos.tipo.length; j++) {

                    if (datos.tipo[j] == "garantia") {

                        var tabla = document.getElementById(`tablaG${doc.id}`);
                        tabla.innerHTML +=
                            `
                                          <tr>
                                            <td>${cantidad[j]}</td>
                                            <td>${cliente[j]}</td>
                                            <td>${fecha[j]}</td>
                                        
                                          </tr>
                                        `
                    }
                }

            }

        })
    })

}
