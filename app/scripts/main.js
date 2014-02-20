console.log('\'Allo \'Allo!');

$(function () {
    for (var i = 0; i < 2; i++) {
        var $lastRow = $('#ingredientes-receta .fila-ingrediente:last-child')
        $lastRow.clone().insertAfter($lastRow);
    }

    $('#ingredientes-receta').on('keyup', '.fila-ingrediente:last-child input', function () {
        var $lastRow = $('#ingredientes-receta .fila-ingrediente:last-child'),
            $newRow,
            valid;

        valid = $lastRow.find('input').filter(function () {
            return $(this).val();
        }).length == 2;

        if (valid) {
            $newRow = $lastRow.clone();
            $newRow.find('input').val('');
            $newRow.insertAfter($lastRow);
        }
    });

    // Nueva cita.
    var $btnToggle = $('.btn-plan-toggle');
    $btnToggle.click(function(e) {
        $btnToggle.removeClass('btn-primary');
        $(this).addClass('btn-primary');
        $('.plan-nutricional-simple').slideToggle();
        $('.plan-nutricional-extendido').slideToggle();
        e.preventDefault();
    });
});
