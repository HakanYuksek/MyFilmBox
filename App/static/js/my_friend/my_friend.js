function pass_func(template_values_curr) {
        $(document).ready(function() {

                /*Arkadaş varsa*/
                if (template_values_curr["student_info"]) {
                        $("#student_no").text(template_values_curr["student_info"][0]);

                        $("#student_name").text(template_values_curr["student_info"][1]);

                        $("#student_sname").text(template_values_curr["student_info"][2]);

                }

                /* Arkadaş yok ise*/
                else {
                        $("[name='be_deleted']").remove();
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Proje ekip arkadaşı bulunmamaktadır!</h4>'+
                                                        '<p>Arkadaşlık isteğini "Proje İşlemleri/Proje Arkadaşı Ekle" sayfasından yapabilirsiniz.</p></div>');

                }




                /*Arkadaşlık silme*/
                $("#cancel_onay_button").on("click", function() {
                        $.get("/project/delete_friend", function(data, status){
                                $("#title").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                         'Proje ekip arkadaşı başarılı bir şekilde silindi!'+
                                                                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                        '<span aria-hidden="true">&times;</span>'+
                                                                                '</button>'+
                                                              '</div>'
                                                        );
                        });





                });



        });

}
