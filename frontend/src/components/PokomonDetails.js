import { usePokomonContext } from "../hooks/usePokomonContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PokomonDetails = ({ pokomon }) => {
    const { dispatch } = usePokomonContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/pokomon/delete/' + pokomon._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_POKOMON', payload: json })
        }
    }

    return (
        <div className="shoe-details" id={pokomon._id}>
            <img src="/pokomon.jpg" alt=""  height="200px "width="100%"/>
            <h4>{pokomon.name}</h4>
            <p>Abilities:</p>
            <ul className='white'>
                <li>{pokomon.ability1}</li>
                <li>{pokomon.ability2}</li>
                <li>{pokomon.ability3}</li>
            </ul>
            <p><strong>Author: </strong>{pokomon.author}</p>
            {user && user.username === pokomon.author && <span className="material-symbols-outlined" onClick={handleClick}>delete</span>}
        </div>
    );
}

export default PokomonDetails;