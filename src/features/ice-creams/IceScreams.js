import { useEffect, useState } from 'react';
import { getIceCreams } from '../../data/iceCreamData';
import LoaderMessage from '../../structure/LoaderMessage';
import Main from '../../structure/Main';
import IceCreamCardContainer from '../../ui/IceCreamCardContainer';
import IceCreamCard from '../../ui/IceCreamCard';

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
            <IceCreamCard
              heading={name}
              iceCreamId={id}
              key={id}
              to={{ pathname: '/menu-items/add', search: `?iceCreamId=${id}` }}
            />
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
