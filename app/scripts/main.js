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
        //$('#inyectar-busqueda-pacientes').load('partials/lista-buscar-pacientes.html');
        $('#inyectar-busqueda-pacientes').load('partials/lista-pacientes2.html');
        $('#tipo-paciente-wrap').slideToggle();
        $('#paciente-existente-form').slideToggle();
    });

    if ($('#datetimepicker1').length && $('#datetimepicker2').length) {
        $('#datetimepicker1').datetimepicker({
            useSeconds: false,
            defaultDate: '03/01/2014',
            pickTime: false
        }).on('change.dp', function() {
                var fecha = $(this).data('DateTimePicker').getDate();

                if ($('#fecha').val()) {
                    if($('#fecha').val() != '05/03/2014'){
                        $('#citas-para-fecha').slideDown();
                    }
                    else{
                        $('#citas-para-fecha').slideUp();
                    }
                    
                    $('#fechaSeleccionada').text(fecha.format('DD [de] MMMM [del] YYYY'));
                }
            });

        $('#datetimepicker2').datetimepicker({
            useSeconds: false,
            minuteStepping: 00,
            pick12HourFormat: true,
            pickDate: false
        });

        $('#datetimepicker3').datetimepicker({
            useSeconds: false,
            minuteStepping: 00,
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

    $('#inyectar-pacientes2').load('partials/lista-pacientes2.html');

    // Calendario
    if ($('#calendar').length) {
        var calendarOpts = {
            events_source: '/scripts/citas.json',
            view: 'month',
            tmpl_path: '/bower_components/bootstrap-calendar/tmpls/',
            tmpl_cache: false,
            day: '2014-03-12',
            language: 'es-ES',
            onAfterEventsLoad: function(events) {
                if(!events) {
                    return;
                }
                var list = $('#eventlist');
                list.html('');

                $.each(events, function(key, val) {
                    $(document.createElement('li'))
                        .html('<a href="' + val.url + '">' + val.title + '</a>')
                        .appendTo(list);
                });
            },
            onAfterViewLoad: function(view) {
                $('.page-header h3').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
            },
            classes: {
                months: {
                    general: 'label'
                }
            }
        };

        var calendar = $('#calendar').calendar(calendarOpts);

        $('.btn-group button[data-calendar-nav]').each(function() {
            var $this = $(this);
            $this.click(function() {
                calendar.navigate($this.data('calendar-nav'));
            });
        });

        $('.btn-group button[data-calendar-view]').each(function() {
            var $this = $(this);
            $this.click(function() {
                calendar.view($this.data('calendar-view'));
            });
        });
    }

    $('#calendar').dblclick(function() {
        window.location.href = '/calendarizar-cita2.html';
    });

});
