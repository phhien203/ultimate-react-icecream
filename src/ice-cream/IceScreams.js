import { useEffect, useState } from 'react';
import { getIceCreams } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import Main from "../structure/Main";

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
      {iceCreams.length}
    </Main>
  );
};

export default IceScreams;
