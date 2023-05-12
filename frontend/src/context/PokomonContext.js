import { createContext, useReducer } from "react";

export const PokomonContext = createContext();

export const pokomonReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POKOMON':
            return {
                pokomons: action.payload
            }
        case 'CREATE_POKOMON':
            return {
                pokomons: [action.payload, ...state.pokomons]
            }
        case 'DELETE_POKOMON':
            return {
                pokomons: state.pokomons.filter(p => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PokomonContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pokomonReducer, { pokomons: null });

    return (
        <PokomonContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PokomonContext.Provider>
    )
}