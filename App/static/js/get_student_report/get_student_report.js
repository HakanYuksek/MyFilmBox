function pass_func(template_values_curr) {
        $(document).ready(function() {


                /* Formun default submit edilmesi engelleniyor. Asagidaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
                $("#student_report").on("submit", function() {
                        event.preventDefault()
                });


                /* Form gonderilmeden cesitli kontroller yapiliyor */
                $("#download_button").on("click", function() {
                        var everythingIsOkay = true;
                        var msg = "";


                        /* Proje adi bos mu? */
                        if ($("#project_list").val() === "no_choice") {
                                everythingIsOkay = false;
                                msg = " Lütfen bir proje seçiniz!";
                        }

                        else if ( $("#report_type_select").val() === "no_choice" ) {
                                everythingIsOkay = false;
                                msg = " Lütfen rapor tipi seçiniz!";
                        }


                        /* Sorun yok ise form sunucuya gonderiliyor */
                        if (everythingIsOkay) {
                                document.forms["student_report"].submit();
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



                projects = template_values_curr["projects"]


                projects.forEach(function(project, index) {
                        $("#project_list").append('<option value='+project[0]+'>'+project[0]+' - '+project[1]+' - '+project[2]+'</option>');
                });






        });

}
