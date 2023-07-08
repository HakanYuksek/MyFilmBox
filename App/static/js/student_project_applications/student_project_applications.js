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

                updated_prev_page_url = "/project/student_project_applications?page=" + (init_page_num - 1).toString();
                $("#pageprev").attr("href", updated_prev_page_url);

                updated_next_page_url = "/project/student_project_applications?page=" + (init_page_num + 1).toString();
                $("#pagenext").attr("href", updated_next_page_url);



                /*PROJE LISTELEME*/

                applied_projects = template_values_curr["applied_projects"];

                /* Proje başvurusu varsa başvurulan projeler listelenir*/
                if (applied_projects[0]) {
                        //Sunucudan gelen proje listesi gosterilir
                        applied_projects.forEach(function(project, index) {

                                var name_html;

                                /* Eğer mevcut başvuru öğrenci önerisinden ise*/
                                if (project[3] == "student") {
                                        name_html = '<label>' + project[1] + '<strong> (Öğrenci Önerisi)</strong>' + '</label>';
                                }

                                else {
                                        name_html = '<label>' + project[1] + '</label>';

                                }

                                $("#projects").append(
                                        '<li class="list-group-item">' +
                                                '<input type="hidden" name="project_id" value='+project[0]+'>' +
                                                name_html +
                                                '<div class="container-fluid">' +
                                                        '<div class="row">' +
                                                                '<p class="col-1 bg-success text-white text-center">'+ project[2] + '</p>' +
                                                        '</div>' +

                                                '</div>' +

                                                '<button type="button" name="view_student_button" class="btn btn-primary float-right">Başvuran Öğrencileri Görüntüle</button>' +
                                        '</li>'
                                );

                        });


                }


                /* Proje başvurusu yok ise*/
                else {
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Proje başvurusu bulunmamaktadır!</h4>');


                        $("[name='be_deleted']").remove();

                }




                /*BAŞVURU ARAMA*/

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




                /*OGRENCILERI GORUNTULEME BUTONU*/

                var project_id; //Silinmek istenen projenin id'si bu degiskene cekilecek
                var parent_element; //Silinecek liste elemani

                $("[name='view_student_button']").click(function(){

                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();

                        //Hidden input ile gizlenen proje id sine ulasilir
                        project_id = parent_element.find("input").prop("value");

                        //Projeye başvuran öğrenci listesi sunucudan alinir (AJAX)
                        $.get("/project/get_project_application_students?project_id="+project_id, function(data, status){

                                var grouped_students = JSON.parse(data);

                                //Önceden doldurulan liste boşaltılıyor
                                $("#project_application_students").empty();

                                //Öğrenciler basiliyor

                                grouped_students.forEach(function(group, index) {

                                        var student_info_field = '';
                                        var student_no;
                                        //Gruptaki öğrenci/öğrenciler basılıyor
                                        group.forEach(function(student, index) {

                                                student_info_field += '<p>'+student[0]+' - '+ student[1] + ' ' +student[2] +'</p>';
                                                student_no = student[0];
                                        });

                                        $("#project_application_students").append('<li class="list-group-item">'+
                                                '<input type="hidden" name="student_no" value='+student_no+'>'+
                                                student_info_field+
                                                '<button type="button" name="reject_button" class="btn btn-danger float-right">Reddet</button>'+
                                                '<button type="button" name="confirm_button" class="btn btn-success float-right mr-3">Onayla</button>'+
                                        '</li>');


                                });



                        });

                        //Modal window acilir
                        $('#ogrenciGoruntuleModal').modal('show');



                });

                /* PROJE ONERISI REDDETME*/
                $(document).on("click","[name='reject_button']",function(){

                        parent_li = $(this).parent();
                        student_no = parent_li.find("input").prop("value");
                        $.get("/project/reject_project_application?student_no="+student_no, function(data, status){
                                parent_li.hide();

                        });

                });

                /* PROJE ONERISI ONAYLAMA*/
                $(document).on("click","[name='confirm_button']",function(){

                        parent_li = $(this).parent();
                        student_no = parent_li.find("input").prop("value");
                        $.get("/project/confirm_project_application?student_no="+student_no+"&project_id="+project_id, function(data, status){
                                parent_li.find("button").hide();
                                parent_li.append('<div class="alert alert-success" role="alert">'+
                                        'Proje başvurusu onaylandı!'+
                                                '</div>');

                                parent_ul = parent_li.parent();
                                parent_ul.find("li").each(function(){
                                        if ($(this).find("input").val() != student_no) {
                                                $(this).hide();

                                        }
                                });
                        });

                });


                /*OGRENCI ARAMA*/

                $("#search-box-2").keyup(function(){
                        //Arama kutusuna girilen pattern ile regular expression nesnesi olusturuluyor
                        pattern = $(this).prop("value");
                        //Case sensitive olmayan arama yapabilmek icin
                        pattern = pattern.toUpperCase();
                        var re = new RegExp(pattern);

                        $("#project_application_students li").each(function(){
                                //Mevcut liste elemanı (li) icindeki proje adı ve proje tipinde arama kutusundan girilen deger ile eslesme bulma
                                var all_student_info = "";

                                $(this).find("p").each(function(){
                                        all_student_info += $(this).text();
                                });

                                all_student_info = all_student_info.toUpperCase();

                                //Pattern icermeyen liste elemanlari gizlenir
                                if ( all_student_info.match(re)) {
                                        $(this).show();
                                }
                                else {
                                        $(this).hide();
                                }
                        });
                });






        });

}
