function facturaPdf(element) {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Guardando factura...',
        showConfirmButton: false,

    })
    var user = firebase.auth().currentUser;

    var IdVenta = element.id;
    var doc = new jsPDF('p', 'mm', [297, 80]);;

    var x = 5;
    var y = 10;
    console.log("entró")
    var entrada = false;


    doc.setFontSize(9);
    db.collection("ventas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc1) => {
            if (doc1.id == IdVenta) {
                console.log("entró")
                var datos = doc1.data();
                db.collection("clientes").where("nit", "==", datos.cliente).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc2) => {
                        var datos2 = doc2.data();
                        console.log("entró")
                        
                                function cabecera() {
                                    y = 30;
                                    
                                    doc.setFontType("bold");
                                    var titulo = "Licorera";
                                    doc.setFontType("normal");
                                    var datosCliente = `Nombre: ${datos2.RazonSocial}\nNit: ${datos2.nit}\nDirección: ${datos2.Direccion}\nTeléfono: ${datos2.telefono}\nCiudad: ${datos2.ciudad}\nBarrio: ${datos2.barrio}`
                                    var datosFactura = `Datos de la empresa`
                                    doc.setFontSize(15);
                                    doc.text(x, y, titulo);
                                    doc.setFontSize(9);
                                    y += 20
                                    doc.text(x, y, datosCliente);
                                    doc.text(x + 80, y, datosFactura);
                                }
                                cabecera();
                                var y1 = y + 50;
                                var columns = ["Cantidad", "Descripcion", "Total"];
                                var data = [];
                                var cantidades = datos.cantidades;
                                var idProducto = datos.idProducto;
                                var cont = 0;
                                var sumaTotal = 0;
                                var sumaDescuentos = 0;
                                for (let i = 0; i < idProducto.length; i++) {
                                    db.collection("productos").get().then((querySnapshot) => {
                                        querySnapshot.forEach((doc4) => {
                                            if (doc4.id == idProducto[i]) {
                                                cont += 1;
                                                datos4 = doc4.data();

                                                console.log();
                                                data.push([ingresar(cantidades[i]), datos4.DESCRIPCION, ingresar(cantidades[i] * datos4.PRECIO_VENTA - (cantidades[i] * datos4.PRECIO_VENTA * (datos.descuentos[i] / 100)))]);
                                                sumaTotal += cantidades[i] * datos4.PRECIO_VENTA;
                                                sumaDescuentos += cantidades[i] * datos4.PRECIO_VENTA * (datos.descuentos[i] / 100)
                                                xp = 10;
                                                yp = 90;
                                                xc = 5;
                                                yc = 90;
                                                if (idProducto.length == i + 1) {
                                                    function columnas() {
                                                        doc.setFontType("bold");
                                                        for (let h = 0; h < columns.length; h++) {
                                                            doc.text(xc, yc, columns[h].toString())

                                                            if (h == 2) {
                                                                xc += 65
                                                            } else {
                                                                xc += 22
                                                            }
                                                        }


                                                        xc = 5;
                                                        yc = 90;
                                                        doc.line(xc, yc + 2, xc + 200, yc + 2);
                                                        doc.setFontType("normal");

                                                    }
                                                    columnas();
                                                    yc + 10
                                                    for (let j = 0; j < data.length; j++) {
                                                        aux = data[j]
                                                        xp = 5
                                                        yp += 5

                                                        for (let k = 0; k < aux.length; k++) {

                                                            doc.text(xp, yp, aux[k].toString())
                                                            if (k == 2) {
                                                                xp += 65
                                                            } else {
                                                                xp += 22
                                                            }


                                                        }
                                                        
                                                        if (data.length == j + 1) {
                                                            doc.setFontSize(12);
                                                            
                                                            doc.text(5,yp+10, `Subtotal: ${ingresar(sumaTotal)}\nDescuentos: ${ingresar(sumaDescuentos)}\nTotal: ${ingresar(datos.suma)}`)

                                                        }
                                                    }

                                                    doc.save("test.pdf");
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: 'Factura Guardada',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                }
                                            }
                                        })


                                    })

                                }

                            })

                        

                    

                })

            }
        })

    })




}