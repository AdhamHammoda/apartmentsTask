import { Apartment } from '@/types/apartment';
import styles from '../styles/ApartmentDetails.module.css';

export default function ApartmentDetailsInfo({ apartment }: { apartment: Apartment }) {
  let id = 0;
   if(apartment.id!=undefined)
    id=apartment.id;
  return (
    <div className={styles.apartmentContainer}>
      <img 
        src={`/images/image_${(id)%6 + 1}.jpg`} 
        alt={apartment.name} 
        className={styles.apartmentImage}
      />
      <div className={styles.details}>
        <h2 className={styles.title}>{apartment.name}</h2>
        <p className={styles.description}>{apartment.description}</p>
        <div className={styles.info}>
          <p><strong>Project ID:</strong> {apartment.projectId}</p>
          <p><strong>Apartment Number:</strong> {apartment.number}</p>
          <p><strong>Location:</strong> {apartment.location}</p>
          <p><strong>Price:</strong> ${apartment.price}</p>
          <p><strong>Bedrooms:</strong> {apartment.bedrooms}</p>
          <p><strong>Area:</strong> {apartment.area} </p>
        </div>
      </div>
    </div>
  );
};

