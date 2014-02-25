    var context = {};

    function executeCalc() {
        var result;

        result = calculator.run($("#formula").val(), context);

        if (result === undefined) {
            result = 'Error al procesar la fórmula';
        }

        $("#resultado").val(result);
    };

    function updateVarInputs() {
        var varInput = '<div class="col-md-4">' +
            '    <label for="var-{var}">{var}</label>' +
            '    <input value="{value}" id="var-{var}" data-var="{var}" class="form-control input-lg">' +
            '</div>',
            vars = calculator.getVarNames($("#formula").val()),
            varInputs = [],
            i;

        for (i in vars) {
            varInputs.push(varInput.
                replace(/\{var\}/g, vars[i]).
                replace(/\{value}/g, context[vars[i]] || 0)
            );
        }

        $("#var-input-container").html(varInputs.join(''));
    }

    function updateVars() {
        $("[data-var]").each(function () {
            var varName = $(this).attr("data-var");
            context[varName] = $(this).val();
        });
    }

    function update(e) {
        if (!$(this).attr("data-var")) {

            // update var input fields if formula was modified
            updateVarInputs();
        }

        updateVars();
        executeCalc();
    }

    $(function () {
        $("#formulas").on('keyup', 'input', update);
    });
