function QueryBuilder() {
    this.getQuery = function (model) {
        var line = new String();

        if (model.firstArgument === 0 && model.operator === '') {
            if (model.module === 0) {
                return '_';
            } else {
                return '_ mod ' + model.module;
            }
        }

        line += model.firstArgument;

        if (model.operator !== '') {
            line += ' ' + model.operator;
        }

        if (model.secondArgument !== null) {
            line += ' ' + model.secondArgument;
        } else {
            if (model.operator !== '') {
                line += ' ';
            }
        }

        if (model.result !== null) {
            line += ' = ' + model.result;
        }

        line += '_';

        if (model.module !== 0) {
            line += ' mod ' + model.module;
        }

        return line;
    }
}