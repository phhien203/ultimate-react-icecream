import { useEffect, useState } from 'react';
import { getIceCreams } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';

const IceScreams = () => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIceCreams().then((iceCreams) => {
      setIceCreams(iceCreams);
      setIsLoading(false);
    });
  }, []);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading ice creams"
        doneMessage="Load ice creams done."
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard heading={name} iceCreamId={id} key={id} to="/" />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className="fully-stocked">Your menu is fully stocked!</p>
        )
      )}
    </Main>
  );
};

export default IceScreams;
