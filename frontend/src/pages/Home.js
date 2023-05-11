import { useEffect } from "react";
import { usePokomonContext } from "../hooks/usePokomonContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PokomonDetails from '../components/PokomonDetails';

const Home = ({ username }) => {
    const { user } = useAuthContext();
    const { pokomons, dispatch } = usePokomonContext();

    useEffect(() => {
        const fetchPokomon = async (username) => {
            if (username) {
                const response = await fetch('/api/pokomon/' + username);
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_POKOMON', payload: json.pokomons });
                }
            } else {
                const response = await fetch('/api/pokomon');
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_POKOMON', payload: json.pokomons });
                }
            }


        }

        if (username) {
            fetchPokomon(username);
        } else {
            fetchPokomon();
        }
    }, [dispatch, user, username]);

    return (
        <div className="home">
            {username && <h1>Chinpokos by {username}</h1>}
            <div className="Pokomons">
                {pokomons && pokomons.map((pokomon, index) => {
                    if (index < 5) {
                        return (
                            <PokomonDetails key={pokomon._id} pokomon={pokomon} />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

export default Home;