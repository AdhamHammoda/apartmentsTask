import { Apartment } from '@/types/apartment';
import styles from '../styles/ApartmentDetails.module.css';

export default function ApartmentDetailsInfo({ apartment }: { apartment: Apartment }) {
  let id = 0;
   if(apartment.id!=undefined)
    id=apartment.id;
  return (
      <div className={styles.apartmentContent}>
      <h2 className={styles.title}>{apartment.name}</h2>
      <h3 className={styles.subtitle}>Offers From $100,000</h3>

      <div className={styles.details}>
        <img 
          src={`/images/image_${(id)%6 + 1}.jpg`} 
          alt={apartment.name} 
          className={styles.apartmentImage}
        />
        <div className={styles.info}>
          <div className={styles.description}>
            <span>Description:</span>
            <p>{apartment.description}</p>
          </div>
          <div>
            <p>Apartment Number: <strong>{apartment.number}</strong></p>
            <p>Location: <strong>{apartment.location}</strong></p>
            <p>Price: <strong>${apartment.price}</strong></p>
          </div>
          <div>
            <p>Bedrooms: <strong>{apartment.bedrooms}</strong></p>
            <p>Area: <strong>{apartment.area}&#13217;</strong></p>
          </div>
         
        </div>
      </div>
      </div>
  );
};

