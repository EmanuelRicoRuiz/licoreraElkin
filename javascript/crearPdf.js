function facturaPdf(element) {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Guardando factura...',
        showConfirmButton: false,

    })
    var user = firebase.auth().currentUser;

    var IdVenta = element.id;


   
    db.collection("ventas").doc(IdVenta).get().then((doc1) => {
        var datos = doc1.data();
        
        var doc = new jsPDF('p', 'mm', [1000, 80]);;
        var x = 5;
        var y = 10;
        
        var entrada = false;
        var logo1 = new Image();
        logo1.src = `KorchosLogo.jpg`;
        doc.setFontSize(7);
       
        
        db.collection("clientes").where("nit", "==", datos.cliente).get().then((querySnapshot) => {
            querySnapshot.forEach((doc2) => {
                var datos2 = doc2.data();
                

                function cabecera() {
                    doc.addImage(logo1, 'jpg', 20, y, 40, 20);
                    var hoy=new Date();
                    hora=`Hora: `+hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                    dia=`Fecha: `+hoy.getDate() + '/' + ( hoy.getMonth() + 1 ) + '/' + hoy.getFullYear();
                    y+=22
                    doc.text(x+25,y,hora);
                    doc.text(x+25,y+5,dia)
                }
                cabecera();
                var y1 = y + 50;
                var columns = ["Cantidad", "Descripcion", "Total"];
                var data = [];
                var cantidades = datos.cantidades;
                var idProducto = datos.idProducto;
                var valor =datos.valor;
                var cont = 0;
                var sumaTotal = 0;
                var sumaDescuentos = 0;
                for (let i = 0; i < idProducto.length; i++) {
                    db.collection("productos").doc(idProducto[i]).get().then((doc4) => {
                        
                                cont += 1;
                                datos4 = doc4.data();

                               
                                data.push([ingresar(cantidades[i]), datos4.DESCRIPCION, ingresar(valor[i])]);
                                sumaTotal += cantidades[i] * datos4.PRECIO_VENTA;
                                
                                xp = 10;
                                yp = 45;
                                xc = 5;
                                yc = 45;
                                if (idProducto.length == i + 1) {
                                    function columnas() {
                                        doc.setFontType("bold");
                                        for (let h = 0; h < columns.length; h++) {
                                            doc.text(xc, yc, columns[h].toString())

                                            if (h == 1) {
                                                xc += 30
                                            } else {
                                                xc += 22
                                            }
                                        }


                                        xc = 5;
                                        yc = 45;
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
                                            aux2 = aux[k];
                                            aux2 = aux2.toString();
                                            var aux3 = "";
                                            if (aux2.length > 18) {
                                                for (let p = 0; p < 18; p++) {
                                                    aux3 += aux2[p]
                                                }
                                            } else {
                                                aux3 = aux2
                                            }

                                            doc.text(xp, yp, aux3)
                                            if (k == 1) {
                                                xp += 30
                                            } else {
                                                xp += 22
                                            }


                                        }

                                        if (data.length == j + 1) {
                                            doc.setFontSize(12);

                                            doc.text(30, yp + 20, `Total: ${ingresar(datos.suma)}`)

                                        }
                                    }

                                    doc.save(`venta${datos.NumeroFactura}`);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Factura Guardada',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            


                    })

                }

            })





        })




    })




}
