function pass_func(template_values_curr) {
    $(document).ready(function() {
            notice_list = template_values_curr["notices"];

            //Sunucudan gelen proje listesi tabloda gosterilir
            notice_list.forEach(function(notice, index) {
                    $("#notice-list tbody").append('<tr> <th scope = "row">' + (notice[0]).toString() + '</th> <td>' + notice[1] + ' </td> <td>'  + notice[3] + '</td><td><a href="#my_modal" class="identifyingClass" data-no='+(notice[0]).toString()+' data-author='+(notice[1])+' data-id= '+"'"+(notice[2])+"'"+' data-toggle="modal" data-target="#myModal">İçeriği Görüntüle</a></td> </tr>');
            });
            $(function () {
                $(".identifyingClass").click(function () {
                    var my_id_value = $(this).data('id');
                    var head = $(this).data('author');
                    var id1 = $(this).data('no');
                    $(".modal-body #hid1").val(id1);
                    $(".modal-header #title1").text(head);
                    $(".modal-body #contentNotice").val(my_id_value);
                })
            });
            $('.modal-footer button#submit').on('click', function(e){
                //$('form#form').submit();
                var txt= document.getElementById("contentNotice").value;
                var id= document.getElementById("hid1").value;
                var link="/Notices/EditNotice?msg="+txt+"&id="+id;
                window.location.href=link;
        });

            //Table sorter plugininin calismasi icin
            $("#notice-list").tablesorter({
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

            updated_prev_page_url = "/Notices/MyNotices?page=" + (init_page_num-1).toString();
            $("#pageprev").attr("href", updated_prev_page_url);

            updated_next_page_url = "/Notices/MyNotices?page=" + (init_page_num+1).toString();
            $("#pagenext").attr("href", updated_next_page_url);





    });

}
