var calculator = (function () {
    var context = {
            e: Math.E,
            pi: Math.PI
        },
        FN_REGEX = /\b(([A-Za-z_](\w+)?)\()\b/g;
        VAR_NAME_REGEX = /\b([A-Za-z_](\w+)?)\b/g;

    for (var fn in Math) {
        context[fn] = Math[fn];
    }

    function runProgram(program) {
        var result;

        with (Math) {
            with (context) {
                try {
                    result = eval(program);
                } catch (err) {}
            }
        }
        return result;
    }

    return {
        run: function (program, variables) {
            for (var name in variables) {
                context[name] = runProgram(variables[name]);
            }
            try {
                return runProgram(program);
            } catch (err) {
                return undefined;
            }
        },
        /**
         *
         * extracts the variable names found in the program
         *
         * @param {string} program
         * @return {string[]} variable names found in the program
         */
        getVarNames: function (program) {
            var fnMatches = program.match(FN_REGEX);
            return _(program.match(VAR_NAME_REGEX)).filter(function (m) {
                return fnMatches.indexOf(m + '(') === -1;
            }).uniq().value();
        }
    };
}());
