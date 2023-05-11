import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokomonContext } from "../hooks/usePokomonContext";
import { useAuthContext } from "../hooks/useAuthContext";

import PokomonDetails from "../components/PokomonDetails";

const Homepage = () => {
    const { user } = useAuthContext();
    const params = useParams();
    const username = params.user;
    const { pokomons, dispatch } = usePokomonContext();

    const [name, setName] = useState('');
    const [ability1, setAbility1] = useState('');
    const [ability2, setAbility2] = useState('');
    const [ability3, setAbility3] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return;
        }

        const pokomon = { name, ability1, ability2, ability3, author: username };

        const response = await fetch('/api/pokomon/create', {
            method: 'POST',
            body: JSON.stringify(pokomon),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setName('');
            setAbility1('');
            setAbility2('');
            setAbility3('');
            setError(null);
            setEmptyFields(['']);
            dispatch({ type: 'CREATE_POKOMON', payload: json });
        }
    }

    useEffect(() => {
        const fetchPokomons = async (username) => {
            const response = await fetch('/api/pokomon/' + username);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_POKOMON', payload: json.pokomons });
            }
        }

        fetchPokomons(username);
    }, [dispatch, pokomons]);

    return (
        <div className="home">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className={emptyFields.includes('name') ? 'error' : ''} />
                <label>Ability 1</label>
                <input type="text" onChange={(e) => setAbility1(e.target.value)} value={ability1} className={emptyFields.includes('ability1') ? 'error' : ''} />
                <label>Ability 2</label>
                <input type="text" onChange={(e) => setAbility2(e.target.value)} value={ability2} className={emptyFields.includes('ability2') ? 'error' : ''} />
                <label>Ability 3</label>
                <input type="text" onChange={(e) => setAbility3(e.target.value)} value={ability3} className={emptyFields.includes('ability3') ? 'error' : ''} />
                <button>Add Pokomon</button>
                {error && <div className="error">{error}</div>}
            </form>
            {pokomons &&
                <div>
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

export default Homepage;