import Link from "next/link";
import { useEffect, useState } from "react";
import ApartmentCard from "../../components/ApartmentCard";
import { Apartment } from "@/types/apartment";
import styles from "../../styles/ApartmentList.module.css";

export default function ApartmentList() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/apartments/count`)
      .then((res) => res.json())
      .then((data) => setTotalPages(Math.ceil(data.count / 4)))
      .catch((err) =>
        console.error("Failed to fetch apartments:", err)
      );
  },[]);

  useEffect(() => {
    fetch(`http://localhost:5000/apartments?pageSize=4&pageNumber=${page}`)
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) =>
        console.error("Failed to fetch apartments:", err)
      );
  }, [page]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Apartment Listings</h1>
      <Link href="/apartments/create" className={styles.link}>
        + Create New Apartment
      </Link>

      <div className={styles.scrollContainer}>
        {apartments.map((apt) => (
          <div key={apt.id} className={styles.cardItem}>
            <Link href={`/apartments/${apt.id}`} className={styles.link}>
              <ApartmentCard apartment={apt} />
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={styles.pageBtn}
        >
          ◀ Prev
        </button>
        <span className={styles.pageText}>
          Page {page + 1} of { totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.pageBtn}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}