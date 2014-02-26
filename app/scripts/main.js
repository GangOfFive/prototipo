$(function () {
    for (var i = 0; i < 2; i++) {
        var $lastRow = $('#ingredientes-receta .fila-ingrediente:last-child');
        $lastRow.clone().insertAfter($lastRow);
    }

    $('#ingredientes-receta').on('keyup', '.fila-ingrediente:last-child input', function () {
        var $lastRow = $('#ingredientes-receta .fila-ingrediente:last-child'),
            $newRow,
            valid;

        valid = $lastRow.find('input').filter(function () {
            return $(this).val();
        }).length === 2;

        if (valid) {
            $newRow = $lastRow.clone();
            $newRow.find('input').val('');
            $newRow.insertAfter($lastRow);
        }
    });

    // Nueva receta.
    var $btnToggleReceta = $('.btn-info-nutricional-toggle');
    $btnToggleReceta.click(function(e) {
        e.preventDefault();
        if ($(this).is('.btn-primary')) {
            return;
        }
        $btnToggleReceta.removeClass('btn-primary');
        $(this).addClass('btn-primary');
        $('#nutricional-receta,#calorias-receta').slideToggle();
    });

    // Nueva cita.
    var $btnToggle = $('.btn-plan-toggle');
    $btnToggle.click(function(e) {
        e.preventDefault();
        if ($(this).is('.btn-primary')) {
            return;
        }
        $btnToggle.removeClass('btn-primary');
        $(this).addClass('btn-primary');
        $('.plan-nutricional-simple').slideToggle();
        $('.plan-nutricional-extendido').slideToggle();
    });

    $('#nav').load('nav.html');
    $('modal[src]').each(function () {
        $(this).load($(this).attr('src'));
    });
    $('[title]').tooltip();

    $('#btn-agregar-paciente').click(function() {
        $('#paciente-nuevo-form').slideToggle();
        $('#tipo-paciente-wrap').slideToggle();
    });

    $('#btn-paciente-existente').click(function() {
        $('#inyectar-busqueda-pacientes').load('partials/lista-buscar-pacientes.html');
        $('#tipo-paciente-wrap').slideToggle();
        $('#paciente-existente-form').slideToggle();
    });

    if ($('#datetimepicker1').length && $('#datetimepicker2').length) {
        $('#datetimepicker1').datetimepicker({
            useSeconds: false,
            defaultDate: '3/3/2014',
            pickTime: false
        }).on('change.dp', function() {
            var fecha = $(this).data('DateTimePicker').getDate();

            if ($('#fecha').val()) {
                $('#citas-para-fecha').slideDown();
                $('#fechaSeleccionada').text(fecha.format('DD [de] MMMM [del] YYYY'));
            }
        });

        $('#datetimepicker2').datetimepicker({
            useSeconds: false,
            minuteStepping: 15,
            pick12HourFormat: true,
            pickDate: false
        });
    }

    if ($('#fechaInicio').length) {
        $('#retoFechaInicio').datetimepicker({
            pickTime: false
        });
    }

    if ($('#fechaFinal').length) {
        $('#retoFechaFinal').datetimepicker({
            pickTime: false
        });
    }

    $('#inyectar-pacientes').load('partials/lista-pacientes.html');
});
