import React, { useEffect, useState } from 'react';
import { getMenu } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCreamCard from './IceCreamCard';

const Menu = () => {
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
        <ul className="container">
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => {
              return (
                <li key={id.toString()}>
                  <IceCreamCard
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
                </li>
              );
            }
          )}
        </ul>
      ) : (
        !isLoading && <p>Your menu is empty. The sadness!!</p>
      )}
    </Main>
  );
};

export default Menu;
