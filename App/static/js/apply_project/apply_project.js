function pass_func(template_values_curr) {
        $(document).ready(function() {

                academician_list = template_values_curr["academicians"];

                //Sunucudan gelen akademisyen listesi gosterilir (Akademisyen seçimi kısmında)
                academician_list.forEach(function(academician, index) {

                        $("[name='academician_choice']").append('<option value='+academician[0]+'>'+academician[0]+' - '+academician[1]+' '+academician[2]+'</option>');

                });


                //Sunucudan hata cevabı dönüp dönülmediği kontrol ediliyor
                if (template_values_curr.hasOwnProperty("success")) {

                        if (template_values_curr["success"] == "true") {

                                $('#title').after('<div class="ml-2 row" id="success_message">' +
                                                        '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                                                                'Proje başvurusu başarılı bir şekilde sisteme eklendi. "Proje Başvuru Durumu" sayfasından takip edilebilir.' +
                                                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                        '<span aria-hidden="true">&times;</span>' +
                                                                '</button>'+
                                                        '</div>'+
                                                '</div>'
                                        );

                        }


                        else if(template_values_curr["success"] == "false") {
                                if (template_values_curr["capacity_full"] == "true") {
                                        $('#title').after('<div class="ml-2 row" id="danger_message">' +
                                                                '<div class="alert alert-danger" role="alert">' +
                                                                        '<strong>Hata! </strong>' + '<label id="danger_source">' + " Başvurulan projenin kapasitesi dolu." +
                                                                '</div>' +
                                                          '</div>'
                                                  );

                                }
                                else {
                                        $('#title').after('<div class="ml-2 row" id="danger_message">' +
                                                                '<div class="alert alert-danger" role="alert">' +
                                                                        '<strong>Hata! </strong>' + '<label id="danger_source">' + " Proje başvuru işlemi başarısız oldu. Lütfen tekrar deneyiniz." +
                                                                '</div>' +
                                                          '</div>'
                                                  );
                                }

                        }


                }



                //Öğrenci veya akademisyen önerisine göre değişen ekran eventi
                $("#proposal_type_select").change(function(){

                        if ($("#proposal_type_select").val() == "student_proposal") {

                                $("[name='academician_proposal_display']").remove();
                                $("[name='student_proposal_display']").show();
                        }

                        else if ($("#proposal_type_select").val() == "academician_proposal") {

                                $("[name='student_proposal_display']").hide();


                                var html = $('<div name="academician_proposal_display" class="form-group row ml-1 mt-5">'+
                                                                '<label class="col">2) Proje Seçiniz</label>'+
                                                        '</div>'+
                                                        '<div name="academician_proposal_display" class="form-group row ml-3">'+
                                                                '<select name="project_choice" data-live-search="true" class="col-6 selectpicker">'+
                                                                        '<option selected value="no_choice">Seçiniz</option>'+
                                                                        '<optgroup label="Ara Projeler">'+
                                                                        '</optgroup>'+
                                                                        '<optgroup label="Bitirme Projeleri">'+
                                                                        '</optgroup>'+
                                                                '</select>'+
                                                        '</div>');



                                $("#proposal_type_select_2").after(html);

                                $("[name='project_choice']").selectpicker();

                                project_list = template_values_curr["projects"];

                                //Sunucudan gelen proje listesi gosterilir
                                project_list.forEach(function(project, index) {

                                        if (project[2] == "Ara") {
                                                $("[label='Ara Projeler']").append('<option value='+project[0]+'>'+project[1]+' - '+project[3]+'</option>');
                                        }

                                        else if (project[2] == "Bitirme") {
                                                $("[label='Bitirme Projeleri']").append('<option value='+project[0]+'>'+project[1]+' - '+project[3]+'</option>');
                                    }


                                });




                        }

                });




                /* Formun default submit edilmesi engelleniyor. Asagidaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
                $("#apply_form").on("submit", function() {
                        event.preventDefault()
                });





                /* Form gonderilmeden cesitli kontroller yapiliyor */
                $("#kaydet_button").on("click", function() {
                        var everythingIsOkay = true;
                        var msg = "";


                        //Akademisyen önerisi ekrani
                        if ($("#proposal_type_select").val() == "academician_proposal") {

                                /*Proje secili mi?*/
                                if ($("[name='project_choice']").val() == "no_choice") {
                                        msg =  " Proje seçiniz."
                                        everythingIsOkay = false;
                                }

                        }

                        //Öğrenci önerisi
                        else {

                                if ($("[name='project_name']").val() == "") {
                                        msg = " Proje adı giriniz."
                                        everythingIsOkay = false;
                                }
                                else if ($("[name='project_type_choice']").val() == "no_choice") {
                                        msg = " Proje tipi seçiniz."
                                        everythingIsOkay = false;

                                }

                                else if ($("[name='academician_choice']").val() == "no_choice") {
                                        msg = " Akademisyen seçiniz."
                                        everythingIsOkay = false;

                                }

                        }




                        /* Sorun yok ise form sunucuya gonderiliyor */
                        if (everythingIsOkay) {
                                document.forms["apply_form"].submit();
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
