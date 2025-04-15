import { useEffect, useState } from 'react';
import styles from '../styles/CreateApartment.module.css';
import { Apartment } from '@/types/apartment';
import { Project } from '@/types/project';
import { useRouter } from 'next/router';
export default function ApartmentForm() {

  const [projects,setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Apartment>();
  const router = useRouter();
  useEffect(() => {
      fetch("http://localhost:5000/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) =>
          console.error("Failed to fetch projects:", err)
        );
    },[]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProject = Array.from(e.target.selectedOptions, (option) => parseInt(option.value))[0];
    setFormData((prevData:any) => ({
      ...prevData,
      projectId: selectedProject,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/apartments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
  
      const result = await res.json();
      console.log('Success:', result);
      router.push('/apartments');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Apartment</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Apartment Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="number" className={styles.label}>Apartment Number</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData?.number}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData?.location}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData?.price}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bedrooms" className={styles.label}>Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData?.bedrooms}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="area" className={styles.label}>Area (sqft)</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData?.area}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="projects" className={styles.label}>Select Projects</label>
          <select
            id="projects"
            name="projectId"
            value={formData?.projectId === 0 ? '' : formData?.projectId}
            onChange={handleProjectSelect}
            className={styles.select}
          >
            <option value="" disabled>Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}