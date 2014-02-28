var calculator = (function () {
    var context = {
            e: Math.E,
            pi: Math.PI
        },
        FN_REGEX = /\b(([A-Za-z_](\w+)?)\()\b/g,
        VAR_NAME_REGEX = /(\b([A-Za-z_](\w+)?)\b)/g,
        POW_REGEX = /\b(\w+?)\s*\^\s*(\w+?)\b/g;

    function runProgram(program) {
        var result;

        // allow a^b notation for exponentiation
        // this is not robust, should use an actual parser sooner or later
        program = program.replace(POW_REGEX, 'pow($1, $2)');

        console.log(program);
        with (Math) {
            with (context) {
                result = eval(program);
            }
        }
        return result;
    }

    return {
        /**
         * runs a program, injecting variables
         *
         * @param {string} program
         * @param {variables} object containing the variables
         * @return {float} the value returned by the program
         */
        run: function (program, variables) {
            for (var name in variables) {
                context[name] = runProgram(variables[name]);
            }

            try {
                return runProgram(program);
            } catch (err) {
                console.log(err);
                return undefined;
            }
        },
        /**
         * extracts the variable names found in the program
         *
         * @param {string} program
         * @return {string[]} variable names found in the program
         */
        getVarNames: function (program) {
            var fnMatches = program.match(FN_REGEX) || [];
            return _(program.match(VAR_NAME_REGEX)).filter(function (m) {
                return fnMatches.indexOf(m + '(') === -1 && (Math[m] === undefined);
            }).uniq().value();
        }
    };
}());
