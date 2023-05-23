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

    const handleUpdate = e => {
        const pokomon = e.target.parentElement.parentElement;
        const pokomonAbilities = pokomon.children[3].children;

        const form = document.querySelector('form');
        form.name.value = pokomon.children[1].innerText;
        form.ability1.value = pokomonAbilities[0].innerText;
        form.ability2.value = pokomonAbilities[1].innerText;
        form.ability3.value = pokomonAbilities[2].innerText;

        setName(pokomon.children[1].innerText);
        setAbility1(pokomonAbilities[0].innerText);
        setAbility2(pokomonAbilities[1].innerText);
        setAbility3(pokomonAbilities[2].innerText);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return;
        }

        const pokomon = { name, ability1, ability2, ability3, author: username };

        const eventType = e.nativeEvent.submitter.name

        switch (eventType) {
            case 'update':
                console.log('update');
                const updateRes = await fetch(`${process.env.REACT_APP_HOST}/api/pokomon/update`, {
                    method: 'PUT',
                    body: JSON.stringify(pokomon),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const resJson = await updateRes.json();
                if (!updateRes.ok) {
                    setError(resJson.error);
                    setEmptyFields(resJson.emptyFields);
                }

                if (updateRes.ok) {
                    setName('');
                    setAbility1('');
                    setAbility2('');
                    setAbility3('');
                    setError(null);
                    setEmptyFields(['']);
                    dispatch({ type: 'UPDATE_POKOMON', payload: resJson });
                }
                break;
            case 'create':
                console.log('create');
                const response = await fetch(process.env.REACT_APP_HOST + '/api/pokomon/create', {
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
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const fetchPokomons = async (username) => {
            const response = await fetch(process.env.REACT_APP_HOST + '/api/pokomon/' + username);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_POKOMON', payload: json.pokomons });
            }
        }

        fetchPokomons(username);
    }, [dispatch, username]);

    return (
        <div className="home" id="updateForm">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} className={emptyFields.includes('name') ? 'error' : ''} />
                <label>Ability 1</label>
                <input type="text" name="ability1" onChange={(e) => setAbility1(e.target.value)} value={ability1} className={emptyFields.includes('ability1') ? 'error' : ''} />
                <label>Ability 2</label>
                <input type="text" name="ability2" onChange={(e) => setAbility2(e.target.value)} value={ability2} className={emptyFields.includes('ability2') ? 'error' : ''} />
                <label>Ability 3</label>
                <input type="text" name="ability3" onChange={(e) => setAbility3(e.target.value)} value={ability3} className={emptyFields.includes('ability3') ? 'error' : ''} />
                <button name="create">Add Pokomon</button>
                <button className="margin-left" name="update">Update Pokomon</button>
                {error && <div className="error">{error}</div>}
            </form>
            {pokomons &&
                <div>
                    <div className="Pokomons">
                        {pokomons && pokomons.map((pokomon) => {
                            return (
                                <PokomonDetails key={pokomon._id} pokomon={pokomon} handleUpdate={handleUpdate}/>
                            )
                        })}
                    </div>
                </div>}
        </div>
    );
}

export default Homepage;