$(document).ready(function() {

        /* Uyari mesajlari document ilk yukledinden disable ediliyor */
        $('#danger_message').hide()
        $('#success_message').hide()


        /* Radio butonlarda akademisyen-ogrenci gecisi saglaniyor */
        $('input[type=radio][name=tipsec]').change(function(event) {


                if (this.value == 'student') {
                        $('#student_no_username1').text("Öğrenci Numarası");
                        $('#student_no_username2').attr("placeholder", "Öğrenci No");


                } else if (this.value == 'academician') {
                        $('#student_no_username1').text("Kullanıcı Adı");
                        $('#student_no_username2').attr("placeholder", "Kullanıcı Adı");


                }
        });


        /* Form gonderilmeden cesitli kontroller yapiliyor */
        $("#kaydet_button").on("click", function() {
                var everythingIsOkay = true;
                var msg = "";


                /* Bos birakilan alan var mi? */
                if ($("#student_no_username2").val() == "") {
                        everythingIsOkay = false;
                        msg = " Kullanıci adi/Ogrenci Numarasi bos birakilamaz."
                } else if ($("#email").val() == "") {
                        everythingIsOkay = false;
                        msg = " Eposta bos bırakilamaz."
                } else if ($("#name").val() == "") {
                        everythingIsOkay = false;
                        msg = " Isim bos bırakilamaz."
                } else if ($("#sname").val() == "") {
                        everythingIsOkay = false;
                        msg = " Soyisim bos bırakilamaz."
                }


                /* Sorun yok ise form sunucuya gonderiliyor */
                if (everythingIsOkay) {
                        document.forms["form-to-be-sent"].submit();
                }


                /* Sorun var, hata mesaji basiliyor */
                else {
                        $('#danger_source').text(msg);
                        $('#danger_message').show();

                }

        });


        /* Formun default submit edilmesi engelleniyor. Yukaridaki gibi kontroller yapildiktan sonra manuel olarak submit ediliyor. */
        $("#form-to-be-sent").on("submit", function() {
                event.preventDefault()
        });

});


/* Sunucudan gelen cevaba gore sunucu tarafi hata/basariyi bildirme */
function pass_func(template_values) {

        switch (template_values.message) {
                case "success":

                        jQuery(function($) {
                                $('#success_message').show()
                        });

                        break;

                case "error":
                        jQuery(function($) {
                                $('#danger_source').text(template_values.error);
                                $('#danger_message').show()
                        });
                        break;

        }


}
