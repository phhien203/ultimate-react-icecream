import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getMenu } from '../data/iceCreamData';
import IceCreamImage from './IceScreamImage';
import LoaderMessage from '../structure/LoaderMessage';

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
    <main>
      <Helmet>
        <title>
          Rock you taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock you taste buds with one of these!</h2>
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
                  <section className="card">
                    <div className="image-container">
                      <IceCreamImage iceCreamId={iceCream.id} />
                    </div>
                    <div className="text-container">
                      <h3>{iceCream.name}</h3>
                      <div className="content card-content">
                        <p className="price">{`$${price.toFixed(2)}`}</p>
                        <p className={`stock${inStock ? '' : ' out'}`}>
                          {inStock
                            ? `${quantity} in stock`
                            : 'Current out of stock'}
                        </p>
                        <p className="description">{description}</p>
                      </div>
                    </div>
                  </section>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        !isLoading && <p>Your menu is empty. The sadness!!</p>
      )}
    </main>
  );
};

export default Menu;
