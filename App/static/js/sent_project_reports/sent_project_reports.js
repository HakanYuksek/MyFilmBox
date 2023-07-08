function pass_func(template_values_curr) {
        $(document).ready(function() {


                if (template_values_curr["project_report_situations"] === null || template_values_curr["project_report_situations"][0] !== "true") {
                        $("#report1").empty();
                        $("#report1").append('<p class="p-2 rounded bg-danger text-white text-center">Gönderilmedi</p>');
                }

                if (template_values_curr["project_report_situations"] === null || template_values_curr["project_report_situations"][1] !== "true") {
                        $("#report2").empty();
                        $("#report2").append('<p class="p-2 rounded bg-danger text-white text-center">Gönderilmedi</p>');
                }


                if (template_values_curr["project_report_situations"] === null || template_values_curr["project_report_situations"][2] !== "true") {
                        $("#report3").empty();
                        $("#report3").append('<p class="p-2 rounded bg-danger text-white text-center">Gönderilmedi</p>');
                }


        });

}
