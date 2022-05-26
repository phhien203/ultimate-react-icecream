import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getMenu } from '../data/iceCreamData';
import IceCreamImage from './IceScreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const onItemClickHandler = (to) => {
    navigate(to);
  };

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
                  <section
                    className="card"
                    onClick={() => {
                      onItemClickHandler(`/menu-items/${id.toString()}`);
                    }}
                  >
                    <div className="image-container">
                      <IceCreamImage iceCreamId={iceCream.id} />
                    </div>
                    <div className="text-container">
                      <h3>
                        <Link
                          to={`/menu-items/${id.toString()}`}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {iceCream.name}
                        </Link>
                      </h3>
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
