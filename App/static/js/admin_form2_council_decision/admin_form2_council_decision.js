function pass_func(template_values_curr) {
        $(document).ready(function() {


                /* Formun default submit edilmesi engelleniyor. Asagidaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
                $("council_form").on("submit", function() {
                        event.preventDefault()
                });


                /* Form gonderilmeden cesitli kontroller yapiliyor */
                $("[name='kaydet_button']").on("click", function() {
                        var everythingIsOkay = true;
                        var msg = "";


                        /* Ogr secildi mi? */
                        if ($("#ogr_list").val() == "no_choice") {
                                everythingIsOkay = false;
                                msg = " Lütfen bir öğrenci seçiniz!";
                        }



                        /* Sorun yok ise form sunucuya gonderiliyor */
                        if (everythingIsOkay) {

                                $("#op_type").val($(this).attr("id"));

                                document.forms["council_form"].submit();
                        }


                        /* Sorun var, hata mesaji basiliyor */
                        else {
                                $('#title').after('<div class="form-group row ml-4" id="danger_message">' +
                                                        '<div class="alert alert-danger" role="alert">' +
                                                                '<strong>Hata! </strong>' + '<label id="danger_source">' + msg +
                                                        '</div>' +
                                                  '</div>'
                                            )

                        }

                });




                /* Sunucudan gelen cevaba gore hata mesajlari*/

                if(template_values_curr["response"] === "success"){

                        $("#title").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                'İşlem başarılı!'+
                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                        '</div>');

                }

                students = template_values_curr["students"]


                students.forEach(function(student, index) {
                        $("#ogr_list").append('<option value='+student[0]+'>'+student[0]+' - '+student[1]+' '+student[2]+'</option>');
                });






        });

}
