export function updateState(state, newStateProps) {
    state.props = {...state.props, ...newStateProps}
}
