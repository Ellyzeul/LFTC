const automataInterpreter = (automata, string, index=0, name='q0') => {
    const states = automata.filter(state => 
        state.name == name &&
        (state.receives == string[index] || state.receives == '')
    )

    for(i = 0; i < states.length; i++) {
        if((index >= string.length -1) && (states[i].final === true)) return true
        if((index > string.length -1) || (states[i].goesTo === null)) return false

        if(automataInterpreter(automata, string, index+1, states[i].goesTo)) return true
    }

    return false
}