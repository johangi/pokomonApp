import { PokomonContext } from "../context/PokomonContext";
import { useContext } from "react";

export const usePokomonContext = () => {
    const context = useContext(PokomonContext);

    if (!context) {
        throw Error('usePokomonContext must be used inside a PokomonContextProvider')
    }

    return context;
}