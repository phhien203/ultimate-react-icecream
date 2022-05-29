import React, { useEffect, useState } from 'react';
import { getMenu } from '../../data/iceCreamData';
import LoaderMessage from '../../structure/LoaderMessage';
import Main from '../../structure/Main';
import IceCreamCard from '../../ui/IceCreamCard';
import IceCreamCardContainer from '../../ui/IceCreamCardContainer';

const IceCreamMenu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMenu().then((menu) => {
      if (isMounted) {
        setMenu(menu);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Rock you taste buds with one of these!">
      <LoaderMessage
        isLoading={isLoading}
        loadingMessage="Loading Menu"
        doneMessage="Loading menu complete."
      />
      {menu.length > 0 ? (
        <IceCreamCardContainer>
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => {
              return (
                <IceCreamCard
                  key={id.toString()}
                  heading={iceCream.name}
                  iceCreamId={iceCream.id}
                  to={`/menu-items/${id.toString()}`}
                >
                  <div className="content card-content">
                    <p className="price">{`$${price.toFixed(2)}`}</p>
                    <p className={`stock${inStock ? '' : ' out'}`}>
                      {inStock
                        ? `${quantity} in stock`
                        : 'Current out of stock'}
                    </p>
                    <p className="description">{description}</p>
                  </div>
                </IceCreamCard>
              );
            }
          )}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p>Your menu is empty. The sadness!!</p>
      )}
    </Main>
  );
};

export default IceCreamMenu;
