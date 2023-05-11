const PokomonDetails = ({ pokomon }) => {
    return (
        <div className="shoe-details" id={pokomon._id}>
            <img src="/pokomon.jpg" alt=""  height="200px "width="100%"/>
            <h4>{pokomon.name}</h4>
            <p>Abilities:</p>
            <ul className='white'>
                <li>1. {pokomon.ability1}</li>
                <li>2. {pokomon.ability2}</li>
                <li>3. {pokomon.ability3}</li>
            </ul>
            <p><strong>Author: </strong>{pokomon.author}</p>
        </div>
    );
}

export default PokomonDetails;