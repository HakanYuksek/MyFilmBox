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

                updated_prev_page_url = "/project/my_proposals?page=" + (init_page_num - 1).toString();
                $("#pageprev").attr("href", updated_prev_page_url);

                updated_next_page_url = "/project/my_proposals?page=" + (init_page_num + 1).toString();
                $("#pagenext").attr("href", updated_next_page_url);



                /*PROJE LISTELEME*/

                project_list = template_values_curr["projects"];


                //Sunucudan gelen proje listesi gosterilir (varsa)
                if (project_list!=null && project_list[0]!=null) {

                        var process_str = "";

                        //Surec acik mi?
                        if (template_values_curr["PROCESS_1"]) {
                                process_str = '<button type="button" name="edit_button" class="btn btn-primary float-right">Düzenle</button>'+'<button type="button" name="delete_button" class="btn btn-danger float-right mr-3">Sil</button>';
                        }


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
                                                process_str+

                                        '</li>'
                                );
                        });

                }

                //Proje önerisi yoksa
                else {

                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Önerdiğiniz proje bulunmamaktadır!</h4>');


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




                /*PROJE SILME ISLEMI*/

                var project_id; //Silinmek istenen projenin id'si bu degiskene cekilecek
                var parent_element; //Silinecek liste elemani

                $("[name='delete_button']").click(function(){
                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Hidden input ile gizlenen proje id sine ulasilir
                        project_id = parent_element.find("input").prop("value");

                        //Onay icin modal penceresi acilir
                        $('#silmeOnayiModal').modal('show');

                });


                //Modal penceresinden onay gelirse asil silme islemi yapilir
                $("#modal_onay_buton").click(function(){

                        //Sunucu tarafına AJAX call yapilir ve islem basarisi cevabi alinir
                        $.get("/project/delete_proposal?project_id="+project_id, function(data, status){

                                var response = JSON.parse(data);
                                if (response["success"]) {
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Proje önerisi başarılı bir şekilde silindi!'+
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



                /* PROJE ONERISI DUZENLEME ISLEMI*/

                $("[name='edit_button']").click(function(){
                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Hidden input ile gizlenen proje id sine ulasilir
                        project_id = parent_element.find("input").prop("value");

                        //Duzenleme icin olan modal windowda gerekli ilklendirmeler yapilir
                        $("#edit_project_name").prop("value",parent_element.find("label").text());

                        //Duzenleme icin modal window acilir
                        $('#duzenlemeModal').modal('show');

                });


                $("#modal_onay_buton_2").click(function(){

                        //Guncellemis proje bilgileri cekiliyor
                        new_project_name = $("#edit_project_name").prop("value");
                        new_project_type = $("#select_id").prop("value");


                        //Guncellenen proje bilgileri sunucuya AJAX POST ile aktariliyor
                        $.ajax({
                                type : "POST",
                                url : "/project/edit_proposal",
                                contentType: "application/json;charset=UTF-8",
                                dataType: "json",
                                data : JSON.stringify({"project_id":project_id,
                                        "new_project_name":new_project_name,
                                        "new_project_type":new_project_type}),

                                success: function(data, status, xhr){
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Değişiklikler başarılı bir şekilde kaydedildi!'+
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );


                                        //Guncellenen degerler set kullanicin gordugu ekranda set ediliyor
                                        parent_element.find("label").text(new_project_name);
                                        parent_element.find("div div p").text(new_project_type);


                                }
                        });
                });







        });

}
