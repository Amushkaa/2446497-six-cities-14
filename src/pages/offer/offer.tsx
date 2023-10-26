import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/question';
import { useParams } from 'react-router-dom';
import Error from '../404/404';
import Card from '../../components/card/card';
import FormReview from '../../components/formReview/form-review';

type OfferProps = {
  offers: Offers;
};

export default function Offer({ offers }: OfferProps): JSX.Element {
  const params = useParams().id;
  let paramsNum: number = 0;

  if (params !== undefined) {
    paramsNum = parseInt(params, 10);
  }
  const offerItem = offers.find((i) => i.id === paramsNum);
  if (offerItem === undefined) {
    return <Error />;
  }

  const host = offerItem.host[0];

  return (
    <div className='page'>
      <Helmet>
        <title>Ваш вариант</title>
      </Helmet>

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container container'>
            <div className='offer__gallery'>
              {offerItem.images.map((img) => (
                <div key={img} className='offer__image-wrapper'>
                  <img className='offer__image' src={`${img}`} alt='Photo studio' />
                </div>
              ))}
            </div>
          </div>
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              {offerItem.premium && (
                <div className='offer__mark'>
                  <span>Premium</span>
                </div>
              )}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>{offerItem.name}</h1>
                <button className={`offer-card__bookmark-button ${offerItem.favorites ? 'offer-card__bookmark-button--active' : ''} button`} type='button'>
                  <svg className='offer__bookmark-icon' style={{ width: '31px', height: '33px' }}>
                    <use xlinkHref='#icon-bookmark'></use>
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='offer__rating rating'>
                <div className='offer__stars rating__stars'>
                  <span style={{ width: '80%' }}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value rating__value'>{offerItem.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature offer__feature--entire'>{offerItem.type}</li>
                <li className='offer__feature offer__feature--bedrooms'>{offerItem.bedrooms} Bedrooms</li>
                <li className='offer__feature offer__feature--adults'>Max {offerItem.adults} adults</li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{offerItem.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <div className='offer__inside'>
                <h2 className='offer__inside-title'>What&apos;s inside</h2>
                <ul className='offer__inside-list'>
                  {offerItem.inside.map((feature) => (
                    <li key={feature} className='offer__inside-item'>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <div className='offer__host-user user'>
                  <div className='offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'>
                    <img className='offer__avatar user__avatar' src={`${host.avatar}`} width='74' height='74' alt='Host avatar' />
                  </div>
                  <span className='offer__user-name'>{host.name}</span>
                  <span className='offer__user-status'>{host.status}</span>
                </div>
                <div className='offer__description'>
                  {host.description.map((item) => (
                    <p key={item} className='offer__text'>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <section className='offer__reviews reviews'>
                <h2 className='reviews__title'>
                  Reviews &middot; <span className='reviews__amount'>1</span>
                </h2>
                <ul className='reviews__list'>
                  <li className='reviews__item'>
                    <div className='reviews__user user'>
                      <div className='reviews__avatar-wrapper user__avatar-wrapper'>
                        <img className='reviews__avatar user__avatar' src='img/avatar-max.jpg' width='54' height='54' alt='Reviews avatar' />
                      </div>
                      <span className='reviews__user-name'>Max</span>
                    </div>
                    <div className='reviews__info'>
                      <div className='reviews__rating rating'>
                        <div className='reviews__stars rating__stars'>
                          <span style={{ width: '80%' }}></span>
                          <span className='visually-hidden'>Rating</span>
                        </div>
                      </div>
                      <p className='reviews__text'>A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.</p>
                      <time className='reviews__time' dateTime='2019-04-24'>
                        April 2019
                      </time>
                    </div>
                  </li>
                </ul>
                <FormReview />
              </section>
            </div>
          </div>
          <section className='offer__map map'></section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              {offers.slice(0, 3).map((offer) => (
                <Card offerCardType='offerScreen' offer={offer} key={offer.id} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
