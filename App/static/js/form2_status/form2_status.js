function pass_func(template_values_curr) {
        $(document).ready(function() {

                /*Form-2 gönderilmişse*/
                if (template_values_curr["status"]) {

                        switch (template_values_curr["status"]) {
                                case "academician_pending":
                                        $("#apply_status").append('<p class="p-3 rounded bg-warning text-white text-center">Akademisyen Onayı Bekliyor</p>');
                                        break;

                                case "academician_rejected":
                                        $("#apply_status").append('<p class="p-3 rounded bg-danger text-white text-center">Akademisyen Tarafından Reddedildi</p>');
                                        break;

                                case "council_pending":
                                        $("#apply_status").append('<p class="p-3 rounded bg-warning text-white text-center">Kurul Onayı Bekliyor</p>');
                                        break;

                                case "council_rejected":
                                        $("#place_pointer").after('<div id="aciklama_baslik" class="row mt-2">'+
                                                                        '<h4 class="col">Kurul Açıklaması</h4>'+
                                                                  ' </div>'+
                                                                  '<div name="be_deleted" class="row">'+
                                                                        '<textarea class="col-5 ml-3" rows="5" id="comment" readonly>'+ template_values_curr["council_decision"] +'</textarea>'+
                                                                  '</div>');

                                        $("#apply_status").append('<p class="p-3 rounded bg-danger text-white text-center">Kurul Tarafından Reddedildi</p>');
                                        break;

                                case "council_confirmed":
                                        $("#place_pointer").after('<div id="aciklama_baslik" class="row mt-2">'+
                                                                        '<h4 class="col">Kurul Açıklaması</h4>'+
                                                                ' </div>'+
                                                                '<div name="be_deleted" class="row">'+
                                                                        '<textarea class="col-5 ml-3" rows="5" id="comment" readonly>'+ template_values_curr["council_decision"] +'</textarea>'+
                                                                '</div>');


                                        $("#apply_status").append('<p class="p-3 rounded bg-success text-white text-center">Kurul Tarafından Onaylandı</p>');
                                        break;
                        }

                }

                /* Form-2 gönderilmemiş*/
                else {
                        $("[name='be_deleted']").remove();
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">' +
                                '<h4 class="alert-heading">Gönderilen Form-2 bulunmamaktadır!</h4>' +
                                '<p>"Proje İşlemleri/Form-2 Gönder" sayfasından Form-2 gönderebilirsiniz.</p></div>');

                }






        });

}
