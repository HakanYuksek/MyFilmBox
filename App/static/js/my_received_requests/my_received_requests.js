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

                updated_prev_page_url = "/project/my_received_requests?page=" + (init_page_num - 1).toString();
                $("#pageprev").attr("href", updated_prev_page_url);

                updated_next_page_url = "/project/my_received_requests?page=" + (init_page_num + 1).toString();
                $("#pagenext").attr("href", updated_next_page_url);



                /*OGRENCILERI LISTELEME*/

                students = template_values_curr["sender_students"];

                /* Öğrenciler listelenir*/
                if (students[0]!=null && students!=null) {
                        //Sunucudan gelen proje listesi gosterilir
                        students.forEach(function(student, index) {

                                $("#students").append(
                                        '<li name="redirect_delete" class="list-group-item">' +
                                                '<input type="hidden" name="student_no" value='+student[0]+'>' +
                                                '<p name="ad_soyad">'+student[1]+' '+student[2]+'</p>'+
                                                '<p name="ogr_no">'+student[0]+'</p>'+
                                                '<button type="button" name="onayla_button" class="mr-3 btn btn-success float-right">Onayla</button>' +
                                                '<button type="button" name="reddet_button" class="mr-3 btn btn-danger float-right">Reddet</button>' +
                                        '</li>'
                                );

                        });


                }


                /* Ogrenci yok ise*/
                else {
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Proje arkadaşlık isteği gönderen öğrenci bulunmamaktadır!</h4>');


                        $("[name='be_deleted']").remove();

                }




                /*OGRENCI ARAMA*/

                $("#search-box").keyup(function(){
                        //Arama kutusuna girilen pattern ile regular expression nesnesi olusturuluyor
                        pattern = $(this).prop("value");
                        //Case sensitive olmayan arama yapabilmek icin
                        pattern = pattern.toUpperCase();
                        var re = new RegExp(pattern);

                        $("#students li").each(function(){
                                //Mevcut liste elemanı (li) icindeki proje adı ve proje tipinde arama kutusundan girilen deger ile eslesme bulma
                                var ogrenci_no = $(this).find("[name='ad_soyad']").text().toUpperCase();
                                var ogrenci_ad_soyad = $(this).find("[name='ogr_no']").text().toUpperCase();

                                //Pattern icermeyen liste elemanlari gizlenir
                                if ( ogrenci_no.match(re) || ogrenci_ad_soyad.match(re)) {
                                        $(this).show();
                                }
                                else {
                                        $(this).hide();
                                }
                        });
                });



                /*ISTEK REDDETME ISLEMI*/

                var student_no;
                var parent_element;


                $("[name='reddet_button']").click(function(){

                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Ogr nosuna ulasilir
                        student_no = parent_element.find("input").prop("value");

                        //Onay icin modal penceresi acilir
                        $('#reddetmeOnayiModal').modal('show');

                });


                //Modal penceresinden onay gelirse asil silme islemi yapilir
                $("#modal_onay_buton").click(function(){

                        //Sunucu tarafına AJAX call yapilir ve islem basarisi cevabi alinir
                        $.get("/project/reject_friend_request?student_no="+student_no, function(data, status){

                                var response = JSON.parse(data);
                                if (response["success"]) {
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Arkadaşlık isteği başarılı bir şekilde reddedildi!'+
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );

                                        //Kullanicinin gordugu listeden de ogrenciyi iceren liste elemani silinir
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



                /*ISTEK ONAYLAMA ISLEMI*/

                $("[name='onayla_button']").click(function(){

                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Ogr nosuna ulasilir
                        student_no = parent_element.find("input").prop("value");

                        //Onay icin modal penceresi acilir
                        $('#onaylamaOnayiModal').modal('show');

                });


                //Modal penceresinden onay gelirse asil silme islemi yapilir
                $("#modal_onay_buton_2").click(function(){

                        //Sunucu tarafına AJAX call yapilir ve islem basarisi cevabi alinir
                        $.get("/project/confirm_friend_request?student_no="+student_no, function(data, status){

                                var response = JSON.parse(data);
                                if (response["answer"] == "success") {
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Arkadaşlık isteği başarılı bir şekilde onaylandi!'+
                                                                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                                                                                                '<span aria-hidden="true">&times;</span>'+
                                                                                        '</button>'+
                                                                      '</div>'
                                                                );

                                        //Kullanicinin gordugu listeden de ogrenciyi iceren liste elemani silinir
                                        $("[name='redirect_delete']").remove();
                                        $("#search-box-parent").after('<div class="alert alert-warning" role="alert">'+
                                                                                 '"Proje arkadaşım" sayfasına yönlendiriliyorsunuz...'+
                                                                      '</div>'
                                                                );
                                        setTimeout(function(){ window.location.replace("/project/my_friend"); }, 4000);


                                }
                                else if (response["answer"] == "confirmed_friend_exist") {

                                        parent_element.remove();
                                        $("#search-box-parent").after('<div class="alert alert-danger" role="alert">'+
                                                                                 'Hata! Onaylanan öğrenci başka birisi ile arkadaş oldu!'+
                                                                      '</div>'
                                                                );



                                }

                                else if (response["answer"] == "kurnazlik") {

                                        $("#search-box-parent").after('<div class="alert alert-danger" role="alert">'+
                                                                                 'Hata! Kurnazlık yapmayınız!'+
                                                                      '</div>'
                                                                );

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
