function pass_func(template_values_curr) {
        $(document).ready(function() {


                /* Formun default submit edilmesi engelleniyor. Asagidaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
                $("#friend_request_form").on("submit", function() {
                        event.preventDefault()
                });


                /* Form gonderilmeden cesitli kontroller yapiliyor */
                $("#kaydet_button").on("click", function() {
                        var everythingIsOkay = true;
                        var msg = "";


                        /* Proje adi bos mu? */
                        if ($("#ogr_list").val() == "no_choice") {
                                everythingIsOkay = false;
                                msg = " Lütfen bir öğrenci seçiniz!";
                        }


                        /* Sorun yok ise form sunucuya gonderiliyor */
                        if (everythingIsOkay) {
                                document.forms["friend_request_form"].submit();
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
                if (template_values_curr["response"] == "you_friend_exist") {
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Proje grup arkadaşınız bulunmaktadır!</h4>'+
                                                        '<p>Dilerseniz proje grup arkadaşınızı "Proje Grup Arkadaşı" sayfasından silebilirsiniz. </p></div>');

                        $("#friend_request_form").hide();

                }

                else if(template_values_curr["response"] == "other_friend_exist") {
                        $("#title").after('<div class="ml-2 alert alert-danger" role="alert">'+
                                                        '<p>Seçilen öğrencinin proje grup arkadaşı bulunmaktadır. </p></div>');

                }

                else if(template_values_curr["response"] == "friend_request_exist") {
                        $("#title").after('<div class="ml-2 alert alert-danger" role="alert">'+
                                                        '<p>Seçilen öğrenciye gönderilmiş isteğiniz bulunmaktadır. Reddedilmiş bir istek ise lütfen "Gönderilen Arkadaşlık İstekleri" sayfasından isteği siliniz. </p></div>');

                }

                else if(template_values_curr["response"] == "friend_request_exist_reverse") {
                        $("#title").after('<div class="ml-2 alert alert-danger" role="alert">'+
                                                        '<p>Seçilen öğrencinin size gönderilmiş isteği vardır veya daha önceden reddettiğiniz istek seçilen öğrenci tarafından silimedi. Lütfen öğrenci ile irtibata geçip bu isteğin silinmesini talep ediniz.</p></div>');

                }

                else if(template_values_curr["response"] == "success"){

                        $("#title").after('<div class="ml-2 alert alert-success" role="alert">'+
                                                        '<p>Arkadaşlık isteği başarıyla gönderildi. </p></div>');

                }

                students = template_values_curr["students"]


                students.forEach(function(student, index) {
                        $("#ogr_list").append('<option value='+student[0]+'>'+student[0]+' - '+student[1]+' '+student[2]+'</option>');
                });






        });

}
