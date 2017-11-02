function divAndMod(firstArgument, secondArgument) {
    var resultDiv = new Integer();

    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation div!'
    }
    else {
        if (firstArgument.isNegative === secondArgument.isNegative) {
            resultDiv.isNegative = false;
        }
        else {
            resultDiv.isNegative = true;
        }

        firstArgument.isNegative = false;
        secondArgument.isNegative = false;

        if (compasion(firstArgument, secondArgument)) {
            var count = 0;
            var firstArgumentDivDigits = new Integer();

            if (firstArgument.digits.length === secondArgument.digits.length) {
                while (compasion(firstArgument, secondArgument)) {
                    firstArgument = Integer.sub(firstArgument, secondArgument);
                    count++;
                }
                resultDiv.digits.unshift(count);
            }

            while (firstArgument.digits.length !== 0 && firstArgumentDivDigits.digits.length != secondArgument.digits.length) {
                firstArgumentDivDigits.digits.unshift(firstArgument.digits.pop());
            }

            while (firstArgument.digits.length !== 0) {
                if (!compasion(firstArgumentDivDigits, secondArgument)) {
                    firstArgumentDivDigits.digits.unshift(firstArgument.digits.pop());
                }
                var i = firstArgumentDivDigits.digits.length - 1;

                while (firstArgumentDivDigits.digits[i] == 0 && firstArgumentDivDigits.digits.length !== 1) {
                    firstArgumentDivDigits.digits.length--;
                    i--;
                }

                if (!(firstArgumentDivDigits.digits[0] === 0 && firstArgumentDivDigits.length === 1)) {
                    while (compasion(firstArgumentDivDigits, secondArgument)) {
                        firstArgumentDivDigits = Integer.sub(firstArgumentDivDigits, secondArgument);
                        count++;
                    }
                }

                resultDiv.digits.unshift(count);
                count = 0;
            }
        }

        else {
            resultDiv.digits.unshift(0);
        }
        if (resultDiv.digits.length === 1 && resultDiv.digits[0] === 0) {
            resultDiv.isNegative = false;
        }

        return { remainer: firstArgumentDivDigits, quotient: resultDiv };
    }
}

function compasion(firstArgument, secondArgument) {
    if (firstArgument.digits.length > secondArgument.digits.length) {
        return true;
    }
    if (firstArgument.digits.length < secondArgument.digits.length) {
        return false;
    }
    if (firstArgument.digits.length = secondArgument.digits.length) {
        var i = firstArgument.digits.length - 1;
        while (firstArgument.digits[i] === secondArgument.digits[i] && i != 0) {
            i--;
        }

        if (firstArgument.digits[i] < secondArgument.digits[i]) {
            return false;
        }
        else {
            return true;
        }


    }
}

function Integer(number) {
    var pattern = /-*\d/;

    this.digits = [];
    this.isNegative = false;

    if (number !== undefined) {
        if (typeof number === "string" && pattern.test(number)) {
            var start = 0;

            if (number[0] === '-') {
                this.isNegative = true;
                start = 1;
            }

            for (var i = number.length - 1; i >= start; i--) {
                this.digits.push(parseInt(number[i]));
            }
        }
        else {
            throw "Format error!";
        }
    }
}

Integer.prototype.toString = function () {
    var result = '';

    if (this.isNegative) {
        result = '-';
    }

    result += String(this.digits.reduce(function (previousValue, currentValue) {
        return '' + currentValue + previousValue;
    }));

    return result;
}

Integer.add = function (firstArgument, secondArgument) {
    var result = new Integer();

    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation Add!'
    }
    else {
        if (firstArgument.isNegative === false && secondArgument.isNegative === true) {
            secondArgument.isNegative = false;
            result = Integer.sub(firstArgument, secondArgument);
            return result;
        }

        if (firstArgument.isNegative === true && secondArgument.isNegative === false) {
            firstArgument.isNegative = false;
            result = Integer.sub(secondArgument, firstArgument);
            return result;
        }

        if (firstArgument.isNegative === secondArgument.isNegative) {
            result.isNegative = firstArgument.isNegative;
            var i = 0;
            var balance = 0;

            if (firstArgument.digits.length < secondArgument.digits.length) {
                var exchange = firstArgument;
                firstArgument = secondArgument;
                secondArgument = exchange;
            }

            for (; i < firstArgument.digits.length; i++) {
                var secondArgumentDigit = secondArgument.digits[i] || 0;
                var resultDigit = firstArgument.digits[i] + secondArgumentDigit + balance;

                if (resultDigit >= 10) {
                    balance = parseInt(resultDigit / 10);
                    resultDigit %= 10;
                } else {
                    balance = 0;
                }

                result.digits.push(resultDigit);
            }

            if ((firstArgument.digits.length === secondArgument.digits.length) && balance !== 0) {
                result.digits.push(balance);
            }
        }
        else {
            if (firstArgument.isNegative && !secondArgument.isNegative) {
                firstArgument.isNegative = false;
                result = Integer.sub(secondArgument, firstArgument);
            }
            else {
                secondArgument.isNegative = false
                result = Integer.sub(firstArgument, secondArgument);
            }
        }
    }

    return result;
}

Integer.sub = function (firstArgument, secondArgument) {
    var result = new Integer();

    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation Sub!'
    }
    else {

        if (firstArgument.isNegative === false && secondArgument.isNegative === true) {
            secondArgument.isNegative = false;
            result = Integer.add(firstArgument, secondArgument);
            return result;
        }

        if (firstArgument.isNegative === true && secondArgument.isNegative === false) {
            secondArgument.isNegative = true;
            result = Integer.add(firstArgument, secondArgument);
            return result;
        }

        if (firstArgument.isNegative === false && secondArgument.isNegative === false) {
            result.isNegative = false;

            if (!compasion(firstArgument, secondArgument)) {
                var exchange = firstArgument;
                firstArgument = secondArgument;
                secondArgument = exchange
                result.isNegative = true;

            }

            for (var i = 0; i < firstArgument.digits.length; i++) {
                var secondArgumentDigit = secondArgument.digits[i] || 0;

                if (firstArgument.digits[i] >= secondArgumentDigit) {
                    var resultDigit = firstArgument.digits[i] - secondArgumentDigit;
                    result.digits.push(resultDigit);
                }
                else {
                    if (i < firstArgument.digits.length - 1) {
                        firstArgument.digits[i] += 10;
                        firstArgument.digits[i + 1] -= 1;
                    }
                    if (i + 1 === firstArgument.digits.length - 1 && firstArgument.digits[i + 1] === 0) {
                        firstArgument.digits.length -= 1;
                    }

                    resultDigit = firstArgument.digits[i] - secondArgumentDigit;
                    result.digits.push(resultDigit);

                }
            }
            while (result.digits[result.digits.length - 1] === 0 && result.digits.length != 1) {
                result.digits.length--;
            }
        }

        if (firstArgument.isNegative === true && secondArgument.isNegative === true) {
            secondArgument.isNegative = false;
            result = Integer.add(firstArgument, secondArgument);
            return result;
        }
    }
    return result;
}

Integer.pow = function (firstArgument, secondArgument) {
    var result = new Integer('1');

    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation power!'
    }
    else {

    }
    return result;

}

Integer.mul = function (firstArgument, secondArgument) {
    var result = new Integer();

    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation multiplication!'
    }
    else {
        for (var i = 0; i < secondArgument.digits.length; i++) {
            var balance = 0;
            var additionalNumber = new Integer();

            for (var j = 0; j < firstArgument.digits.length; j++) {
                additionalNumber.digits[j] = secondArgument.digits[i] * firstArgument.digits[j] + balance;

                if (additionalNumber.digits[j] >= 10) {
                    balance = parseInt(additionalNumber.digits[j] / 10);
                    additionalNumber.digits[j] %= 10;
                } else {
                    balance = 0;
                }

            }

            if (balance != 0) {
                additionalNumber.digits[additionalNumber.digits.length] = balance;
            }


            for (var k = 0; k < i; k++) {
                for (var j = additionalNumber.digits.length - 1; j >= 0; j--) {
                    additionalNumber.digits[j + 1] = additionalNumber.digits[j];
                }
                additionalNumber.digits[0] = 0;
            }

            result = Integer.add(result, additionalNumber);
        }

        if (firstArgument.isNegative === secondArgument.isNegative) {
            result.isNegative = false;
        }
        else {
            result.isNegative = true;
        }
        while (result.digits[result.digits.length - 1] === 0 && result.digits.length != 1) {
            result.digits.length--;
        }

        return result;
    }
}


Integer.div = function (firstArgument, secondArgument) {
    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation div!'
    }
    else {
        return divAndMod(firstArgument, secondArgument).quotient;
    }
}


Integer.mod = function (firstArgument, secondArgument) {
    if (!(firstArgument instanceof Integer) || !(secondArgument instanceof Integer)) {
        throw 'Error format in operation div!'
    }
    else {
        return divAndMod(firstArgument, secondArgument).remainer;
    }
}

module.exports = Integer;