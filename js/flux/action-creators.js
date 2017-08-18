function AddDigitActionCreator(digit) {
    return {
        type: 'addDigit',
        digit: digit
    }
}

function AddOperatorActionCreator(operator) {
    return {
        type: 'addOperator',
        operator: operator
    }
}

function CalculateActionCreator() {
    return {
        type: 'calculate'
    }
}

function SetModuleActionCreator(module) {
    return {
        type: 'setModule',
        module: module
    }
}

function ClearActionCreator() {
    return {
        type: 'clear'
    }
}

function AddToMemoryActionCreator() {
    return {
        type: 'addToMemory'
    }
}

function GetFromMemoryActionCreator() {
    return {
        type: 'getFromMemory'
    }
}

function ClearMemoryActionCreator() {
    return {
        type: 'clearMemory'
    }
}

function DeleteDigitActionCreator() {
    return {
        type: 'deleteDigit'
    }
}