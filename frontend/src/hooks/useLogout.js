import { useAuthContext } from './useAuthContext';
import { usePokomonContext } from './usePokomonContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: pokomonDispatch} = usePokomonContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        pokomonDispatch({type: 'SET_POKOMON', payload: null});
    }

    return { logout }
}