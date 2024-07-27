
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCharacterDetailsQuery } from '../../services/apiSlice';

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterDetailsQuery(parseInt(id!, 10));

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">Failed to load character details</div>;
  }

  return (
    <div className="character-details">
      <button onClick={handleClose}>Close</button>
      {character && (
        <>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Type:</strong> {character.type}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
          <p>
            <strong>Episodes:</strong>
          </p>
          <ul>
            {character.episode.map((ep, index) => (
              <li key={index}>{ep.split('/').pop()}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CharacterDetails;
