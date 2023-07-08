function pass_func(template_values_curr) {
        $(document).ready(function() {

                /*Başvurulan proje varsa*/
                if (template_values_curr["project_info"]) {
                        $("#project_name").text(template_values_curr["project_info"][0]);

                        if (template_values_curr["project_info"][1] == "academician") {
                                $("#project_proposal_type").text("Akademisyen Önerisi");
                        }
                        else {
                                $("#project_proposal_type").text("Öğrenci Önerisi");
                        }

                        $("#project_type").text(template_values_curr["project_info"][2]);
                        $("#academician_username").text(template_values_curr["project_info"][3]);

                        switch (template_values_curr["project_info"][4]) {
                                case "pending":
                                        $("#apply_status").append('<p class="p-2 rounded bg-warning text-white text-center">Onay Bekliyor</p>');
                                        break;

                                case "rejected":
                                        $("#apply_status").append('<p class="p-2 rounded bg-danger text-white text-center">Reddedildi</p>');
                                        $("#cancel_button div button").text("Başvuruyu Sil");
                                        $("#modal_body").text("Proje başvurusunu silmek istediğinize emin misiniz?");
                                        break;

                                case "confirmed":
                                        $("#apply_status").append('<p class="p-2 rounded bg-success text-white text-center">Onaylandı</p>');
                                        $("#cancel_button").remove();
                                        break;

                        }

                }

                /* Proje başvurusu yok ise*/
                else {
                        $("[name='be_deleted']").remove();
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Proje başvurusu bulunmamaktadır!</h4>'+
                                                        '<p>Proje başvurusunu "Proje İşlemleri/Proje Başvurusu Yap" sayfasından yapabilirsiniz.</p></div>');

                }




                /*Proje başvuru iptali*/
                $("#cancel_onay_button").on("click", function() {
                        $.get("/project/delete_project_apply", function(data, status){
                                $("#title").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                         'Proje başvurusu başarılı bir şekilde silindi!'+
                                                                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                        '<span aria-hidden="true">&times;</span>'+
                                                                                '</button>'+
                                                              '</div>'
                                                        );
                        });





                });



        });

}
