$(document).ready(function() {

        $('input[type=radio][name=tipsec]').change(function(event) {
                //alert('Hi there!');
                if (this.value == 'student') {
                        $('#girisbaslik').text("Öğrenci Girişi");
                        $('#nickveyano').text("Öğrenci Numarası:");

                        //alert("ogrenci");
                } else if (this.value == 'academician') {
                        $('#girisbaslik').text("Akademisyen Girişi");
                        $('#nickveyano').text("Kullanıcı Adı:");
                        //alert("akademisyen");
                }
        });
});
