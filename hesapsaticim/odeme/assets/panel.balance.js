$(function () {
    $("#couponCodeForm").submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        $(".sweet-overlay, .sweet-alert").remove();
        var loading = Swal.fire({
            heightAuto: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
                swal.showLoading();
            }
        });
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function (data) {
                var obj = $.parseJSON(data);
                loading.close();
                if (obj.success) {
                    Swal.fire({
                        title: obj.title,
                        text: obj.message,
                        icon: "success",
                        heightAuto: false
                    });
                    setTimeout(function () {
                        window.location = "/panel/";
                    }, 1000);
                }
                else {
                    Swal.fire({
                        title: obj.title,
                        text: obj.message,
                        icon: "error",
                        heightAuto: false
                    });
                }
            }
        });
    });
});