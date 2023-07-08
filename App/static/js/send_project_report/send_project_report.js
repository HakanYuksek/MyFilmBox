function pass_func(template_values_curr) {
        $(document).ready(function() {


                //Sunucudan hata cevabı dönüp dönülmediği kontrol ediliyor
                if (template_values_curr.hasOwnProperty("success")) {

                        if (template_values_curr["success"] == "true") {

                                $('#title').after('<div class="ml-2 row" id="success_message">' +
                                        '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                                        'Proje raporu başarılı bir şekilde gönderildi. "Gönderilen Proje Raporları" sayfasından ulaşılabilir.' +
                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '</div>'
                                );

                        }

                }



                /* Formun default submit edilmesi engelleniyor. Asagidaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
                $("#project_form").on("submit", function() {
                        event.preventDefault()
                });





                /* Form gonderilmeden cesitli kontroller yapiliyor */
                $("#kaydet_button").on("click", function() {
                        var everythingIsOkay = true;
                        var msg = "";

                        var fileName = $("#file_id").val();



                        /*Proje secili mi?*/
                        if ($("[name='report_type_select']").val() == "no_choice") {
                                msg = " Rapor tipi seçiniz."
                                everythingIsOkay = false;
                        }




                        else if (!fileName) {

                                msg = " Lütfen bir proje raporu yükleyiniz."
                                everythingIsOkay = false;
                        }




                        /* Sorun yok ise form sunucuya gonderiliyor */
                        if (everythingIsOkay) {
                                document.forms["project_form"].submit();
                        }


                        /* Sorun var, hata mesaji basiliyor */
                        else {
                                $('#title').after('<div class="ml-2 row" id="danger_message">' +
                                        '<div class="alert alert-danger" role="alert">' +
                                        '<strong>Hata! </strong>' + '<label id="danger_source">' + msg +
                                        '</div>' +
                                        '</div>'
                                );

                        }

                });

        });

}
