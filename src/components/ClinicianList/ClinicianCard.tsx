import styles from "./ClinicianList.module.css";

type ClinicianCardProps = {
  name: string;
  address: string;
  distance: number;
  labName?: string;
  primary?: boolean;
};

const ClinicianCard = ({ name, address, distance, labName, primary = false }: ClinicianCardProps) => {
  return (
    <div className={`${styles.card}${primary ? ` ${styles.primary}` : ``}`}>
      <h3>{name}</h3>
      <p className={styles.distance}>{`${distance} mi`}</p>
      <p className={styles.address}>{address}</p>
      {!!labName && <p className={styles.lab}>{`Nearest lab: ${labName}`}</p>}
    </div>
  );
};

export default ClinicianCard;
