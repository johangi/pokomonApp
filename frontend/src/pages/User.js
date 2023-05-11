import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePokomonContext } from "../hooks/usePokomonContext";

import PokomonDetails from "../components/PokomonDetails";

const User = () => {
    const params = useParams();
    const username = params.user
    const { pokomons, dispatch } = usePokomonContext();

    useEffect(() => {
        const fetchPokomons = async (username) => {
            const response = await fetch('/api/pokomon/' + username);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_POKOMON', payload: json.pokomons });
            }
        }

        fetchPokomons(username);
    }, [dispatch, username]);

    if (pokomons && pokomons.length === 0) {
        return (
            <div className="home">
                <h1>User not found!</h1>
            </div>
        );
    }

    return (
        <div className="home">
            {pokomons &&
                <div>
                    <h1>Chinpokos by {username}</h1>
                    <div className="Pokomons">
                        {pokomons && pokomons.map((pokomon) => {
                            return (
                                <PokomonDetails key={pokomon._id} pokomon={pokomon} />
                            )
                        })}
                    </div>
                </div>}
        </div>
    );
}

export default User;