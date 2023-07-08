function pass_func(template_values_curr) {
    $(document).ready(function() {
            student_list = template_values_curr["students"];

            //Sunucudan gelen proje listesi tabloda gosterilir
            student_list.forEach(function(student, index) {
                    $("#student-list tbody").append('<tr> <th scope = "row">' + (student[0]).toString() + '</th> <td>' + student[1] + ' </td> <td>' + student[2] + '</td> <td>' + student[3] + '</td> <td>'+student[4]+ '</td><td><a href="#my_modal" class="identifyingClass" data-id= '+"'"+(student[0]).toString()+"'"+' data-toggle="modal" data-target="#myModal" id="notu">'+(student[5]).toString()+'</a></td> </tr>');
            });
            $(function () {
                $(".identifyingClass").click(function () {
                    var my_id_value = $(this).data('id');
                    $(".modal-body #studentNoValue").val(my_id_value);
                })
            });
            $('.modal-footer button#submit').on('click', function(e){
                //$('form#form').submit();
                var sno= document.getElementById("studentNoValue").value;
                var grade=document.getElementById("grade").value;
                var link="/Grades/GradeEdit?sno="+sno+"&grade="+grade;
                window.location.href=link;
        });

            //Table sorter plugininin calismasi icin
            $("#student-list").tablesorter({
                    widgets: ["zebra", "filter"],
                    widgetOptions: {
                            // filter_anyMatch replaced! Instead use the filter_external option
                            // Set to use a jQuery selector (or jQuery object) pointing to the
                            // external filter (column specific or any match)
                            filter_external: '.search',
                            // add a default type search to the first name column
                            filter_defaultFilter: {
                                    1: '~{query}'
                            },
                            // include column filters
                            filter_columnFilters: true,
                            filter_placeholder: {
                                    search: 'Ara...'
                            },
                            filter_saveFilters: true,
                            filter_reset: '.reset'
                    }

            });



            //bulunulan sayfa set edilir
            $("#pagenum").text( (template_values_curr["init_page_num"]).toString() );


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

            updated_prev_page_url = "/Grades/NotDüzenle?page=" + (init_page_num-1).toString();
            $("#pageprev").attr("href", updated_prev_page_url);

            updated_next_page_url = "/Grades/NotDüzenle?page=" + (init_page_num+1).toString();
            $("#pagenext").attr("href", updated_next_page_url);





    });

}
