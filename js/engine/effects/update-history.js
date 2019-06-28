const updateHistory = (...functions) => {
    return (state) => {
        if (state.currentIndex - 1 < 0)
            $("[data-value=\"undo\"]").attr("disabled", true);
        else
            $("[data-value=\"undo\"]").attr("disabled", false);
        if (state.currentIndex + 1 >= state.history.length)
            $("[data-value=\"redo\"]").attr("disabled", true);
        else
            $("[data-value=\"redo\"]").attr("disabled", false);

        var currentState = state.history[state.currentIndex];
        functions.forEach(f => f(currentState));
    };
};

export { updateHistory };