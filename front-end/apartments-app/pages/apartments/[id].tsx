import { Apartment } from "@/types/apartment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/ApartmentDetails.module.css";
import ApartmentDetailsInfo from "@/components/ApartmentDetailsInfo";

export default function ApartmentDetails() {
  const [apartment, setApartment] = useState<Apartment>();
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    if (router.isReady && id) {
      fetch(`http://localhost:5000/apartments/${id}`)
        .then(res => res.json())
        .then(data => setApartment(data))
        .catch(err => console.error('Failed to fetch apartment:', err));
    }
  }, [router.isReady, id]);

  if (!apartment) {
    return (
      <div className={styles.loading}>
        Loading apartment details...
      </div>
    );
  }
  return (
    <div className={styles.apartmentContainer}>
      <ApartmentDetailsInfo apartment={apartment} />
    </div>
  );
}
