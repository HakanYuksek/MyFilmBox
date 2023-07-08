function pass_func(template_values_curr) {
        $(document).ready(function() {


                /*PAGING*/

                //bulunulan sayfa set edilir
                $("#pagenum").text((template_values_curr["init_page_num"]).toString());


                //Paging icin enable-disable
                if (template_values_curr["disable_next_page"]) {
                        $("#pagenext-li").attr("class", "page-item disabled");

                } else {
                        $("#pagenext-li").attr("class", "page-item");

                }

                if (template_values_curr["init_page_num"] == 1) {
                        $("#pageprev-li").attr("class", "page-item disabled");

                } else {
                        $("#pageprev-li").attr("class", "page-item");
                }


                //İleri ve geri butonlari icin bulunulan sayfaya gore guncellemeler
                var init_page_num = template_values_curr["init_page_num"]

                updated_prev_page_url = "/project/form2_pending_projects?page=" + (init_page_num - 1).toString();
                $("#pageprev").attr("href", updated_prev_page_url);

                updated_next_page_url = "/project/form2_pending_projects?page=" + (init_page_num + 1).toString();
                $("#pagenext").attr("href", updated_next_page_url);



                /*PROJE LISTELEME*/

                project_list = template_values_curr["projects"];


                //Sunucudan gelen proje listesi gosterilir (varsa)
                if (project_list!=null && project_list[0]!=null) {

                        project_list.forEach(function(project, index) {
                                $("#projects").append(
                                        '<li class="list-group-item">' +
                                                '<input type="hidden" name="project_id" value='+project[0]+'>' +
                                                '<label>' + project[1] + '</label>' +
                                                '<div class="container-fluid">' +
                                                        '<div class="row">' +
                                                                '<p class="col-1 bg-success text-white text-center">'+ project[2] + '</p>' +
                                                        '</div>' +

                                                '</div>' +
                                                '<button name="download_button" onclick="location.href=\'/project/download_report?report_type=form2&project_id='+ (project[0]).toString() +'\'" type="button" class="btn btn-primary float-right"><i class="fa fa-download"></i> İndir</button>' +
                                                '<button type="button" name="confirm_button" class="btn btn-success float-right mr-3">Onayla</button>' +
                                                '<button type="button" name="reject_button" class="btn btn-danger float-right mr-3">Reddet</button>' +
                                        '</li>'
                                );
                        });

                }

                //Proje önerisi yoksa
                else {

                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Onay bekleyen Form-2 bulunmamaktadır!</h4>');


                        $("[name='be_deleted']").remove();


                }




                /*PROJE ARAMA*/

                $("#search-box").keyup(function(){
                        //Arama kutusuna girilen pattern ile regular expression nesnesi olusturuluyor
                        pattern = $(this).prop("value");
                        //Case sensitive olmayan arama yapabilmek icin
                        pattern = pattern.toUpperCase();
                        var re = new RegExp(pattern);

                        $("#projects li").each(function(){
                                //Mevcut liste elemanı (li) icindeki proje adı ve proje tipinde arama kutusundan girilen deger ile eslesme bulma
                                var project_name = $(this).find("label").text().toUpperCase();
                                var project_type = $(this).find("div div p").text().toUpperCase();

                                //Pattern icermeyen liste elemanlari gizlenir
                                if ( project_name.match(re) || project_type.match(re)) {
                                        $(this).show();
                                }
                                else {
                                        $(this).hide();
                                }
                        });
                });




                /*FORM-2 REDDETME ISLEMI*/

                var project_id; //Silinmek istenen projenin id'si bu degiskene cekilecek
                var parent_element; //Silinecek liste elemani

                $("[name='reject_button']").click(function(){
                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Hidden input ile gizlenen proje id sine ulasilir
                        project_id = parent_element.find("input").prop("value");

                        //Onay icin modal penceresi acilir
                        $('#reddetmeOnayiModal').modal('show');

                });


                //Modal penceresinden onay gelirse asil silme islemi yapilir
                $("#modal_onay_buton").click(function(){

                        //Sunucu tarafına AJAX call yapilir ve islem basarisi cevabi alinir
                        $.get("/project/reject_form2?project_id="+project_id, function(data, status){

                                var response = JSON.parse(data);
                                if (response["success"]) {
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Seçilen Form-2 başarılı bir şekilde reddedildi!'+
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );

                                        //Kullanicinin gordugu listeden de projeyi iceren liste elemani silinir
                                        parent_element.remove();

                                }

                                else {

                                        $("#search-box-parent").after('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                                                                                 '<strong>Hata!</strong> Lütfen tekrar deneyiniz.' +
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );

                                }


                        });





                });





                /*FORM-2 ONAYLAMA ISLEMI*/

                $("[name='confirm_button']").click(function(){
                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Hidden input ile gizlenen proje id sine ulasilir
                        project_id = parent_element.find("input").prop("value");

                        //Onay icin modal penceresi acilir
                        $('#onaylamaOnayiModal').modal('show');

                });


                //Modal penceresinden onay gelirse asil silme islemi yapilir
                $("#modal_onay_buton_2").click(function(){

                        //Sunucu tarafına AJAX call yapilir ve islem basarisi cevabi alinir
                        $.get("/project/confirm_form2?project_id="+project_id, function(data, status){

                                var response = JSON.parse(data);
                                if (response["success"]) {
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Seçilen Form-2 başarılı bir şekilde onaylandı!'+
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );

                                        //Kullanicinin gordugu listeden de projeyi iceren liste elemani silinir
                                        parent_element.remove();

                                }

                                else {

                                        $("#search-box-parent").after('<div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                                                                                 '<strong>Hata!</strong> Lütfen tekrar deneyiniz.' +
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );

                                }


                        });





                });



        });

}
