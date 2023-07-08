function pass_func(template_values_curr) {
        $(document).ready(function() {
                project_list = template_values_curr["projects"];

                //Sunucudan gelen proje listesi tabloda gosterilir
                project_list.forEach(function(project, index) {
                        $("#project-list tbody").append('<tr> <th scope = "row">' + (project[0]).toString() + '</th> <td>' + project[1] + ' </td> <td>' + project[2] + '</td> <td>' + project[3] + '</td> </tr>');
                });



                //Table sorter plugininin calismasi icin
                $("#project-list").tablesorter({
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

                updated_prev_page_url = "/project/academician_proposals?page=" + (init_page_num-1).toString();
                $("#pageprev").attr("href", updated_prev_page_url);

                updated_next_page_url = "/project/academician_proposals?page=" + (init_page_num+1).toString();
                $("#pagenext").attr("href", updated_next_page_url);





        });

}
