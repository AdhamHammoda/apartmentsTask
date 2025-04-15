import { Apartment } from "@/types/apartment";
import styles from '../styles/ApartmentCard.module.css';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <div className={styles.card}>
      <img
        src={`images/image_${(apartment.name.length % 6) + 1}.jpg`} 
        alt={apartment.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{apartment.name}</h2>
        <p className={styles.description}>{apartment.description}</p>
        <p className={styles.location}>📍 {apartment.location}</p>
        <div className={styles.details}>
          <span>🛏 {apartment.bedrooms} beds</span>
          <span>📐 {apartment.area} sqft</span>
          <span>💰 ${apartment.price}</span>
        </div>
      </div>
    </div>
  );
}
