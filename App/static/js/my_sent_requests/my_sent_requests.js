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

                updated_prev_page_url = "/project/my_sent_requests?page=" + (init_page_num - 1).toString();
                $("#pageprev").attr("href", updated_prev_page_url);

                updated_next_page_url = "/project/my_sent_requests?page=" + (init_page_num + 1).toString();
                $("#pagenext").attr("href", updated_next_page_url);



                /*OGRENCILERI LISTELEME*/

                students = template_values_curr["receiver_students"];

                /* Öğrenciler listelenir*/
                if (students[0]!=null && students!=null) {
                        //Sunucudan gelen proje listesi gosterilir
                        students.forEach(function(student, index) {

                                var html;
                                var button_html = '<input type="hidden">';

                                switch (student[3]) {
                                        case "pending":
                                                html = '<p class="col-2 bg-warning text-white text-center">Onay Bekliyor</p>';
                                                button_html = '<button type="button" name="iptal_button" class="mr-3 btn btn-primary float-right">İptal Et</button>'
                                                break;
                                        case "rejected":
                                                html = '<p class="col-2 bg-danger text-white text-center">Reddedildi</p>';
                                                button_html = '<button type="button" name="iptal_button" class="mr-3 btn btn-primary float-right">Sil</button>'
                                                break;
                                        case "confirmed":
                                                html = '<p class="col-2 bg-success text-white text-center">Onaylandı</p>';
                                                break;

                                }

                                $("#students").append(
                                        '<li name="redirect_delete" class="list-group-item">' +
                                                '<input type="hidden" name="student_no" value='+student[0]+'>' +
                                                '<p name="ad_soyad">'+student[1]+' '+student[2]+'</p>'+
                                                '<p name="ogr_no">'+student[0]+'</p>'+
                                                '<div class="container-fluid">' +
                                                        '<div class="row">' +
                                                                html+
                                                        '</div>' +

                                                '</div>' +
                                                button_html+
                                        '</li>'
                                );

                        });


                }


                /* Ogrenci yok ise*/
                else {
                        $("#title").after('<div class="ml-2 alert alert-warning" role="alert">'+
                                                '<h4 class="alert-heading">Gönderilen arkadaşlık isteğiniz bulunmamaktadır!</h4>');


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



                /*ISTEK IPTAL ISLEMI*/

                var student_no;
                var parent_element;


                $("[name='iptal_button']").click(function(){

                        //Tıklanan butondan ana liste elemanina ulasilir
                        parent_element = $(this).parent();
                        //Ogr nosuna ulasilir
                        student_no = parent_element.find("input").prop("value");

                        //Onay icin modal penceresi acilir
                        $('#iptalOnayiModal').modal('show');

                });


                //Modal penceresinden onay gelirse asil silme islemi yapilir
                $("#modal_onay_buton").click(function(){

                        //Sunucu tarafına AJAX call yapilir ve islem basarisi cevabi alinir
                        $.get("/project/cancel_friend_request?student_no="+student_no, function(data, status){

                                var response = JSON.parse(data);
                                if (response["answer"] == "success") {
                                        $("#search-box-parent").after('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
                                                                                 'Arkadaşlık isteği başarılı bir şekilde silindi!'+
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







        });

}
