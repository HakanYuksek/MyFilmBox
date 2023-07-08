function pass_func(template_values_curr) {
        $(document).ready(function() {

                if ("success" in template_values_curr) {
                        $('#title').after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                         'Form-2 başarılı bir şekilde gönderildi!'+
                                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                        '<span aria-hidden="true">&times;</span>'+
                                                '</button>'+
                                        '</div>'
                        );
                }

                /* Formun default submit edilmesi engelleniyor. Asagidaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
                $("#sen_form").on("submit", function() {
                        event.preventDefault()
                });





                /* Form gonderilmeden cesitli kontroller yapiliyor */
                $("#kaydet_button").on("click", function() {
                        var everythingIsOkay = true;
                        var msg = "";

                        var fileName = $("#file_id").val();


                        if (!fileName) {

                                msg = " Lütfen bir form-2 yükleyiniz."
                                everythingIsOkay = false;
                        }


                        /* Sorun yok ise form sunucuya gonderiliyor */
                        if (everythingIsOkay) {
                                document.forms["send_form"].submit();
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
