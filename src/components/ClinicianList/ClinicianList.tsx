import type { NearbyClinician } from "../../types/types";
import ClinicianCard from "./ClinicianCard";
import styles from "./ClinicianList.module.css";

type ClinicianListProps = {
  clinicians?: NearbyClinician[];
};

const ClinicianList = ({ clinicians }: ClinicianListProps) => {
  if (!clinicians || clinicians.length === 0) return null;
  return (
    <div className={styles.clinicians}>
      <h2>Nearest Clinician</h2>
      <ClinicianCard
        name={clinicians[0].name}
        address={clinicians[0].address}
        distance={clinicians[0].distance}
        labName={clinicians[0].lab?.name}
        primary
      />
      {clinicians.length > 1 && (
        <>
          <h2>Nearby Alternatives</h2>
          <div className={styles.alternatives}>
            {clinicians.slice(1).map((c) => (
              <ClinicianCard
                key={c.name}
                name={c.name}
                address={c.address}
                distance={c.distance}
                labName={c.lab?.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClinicianList;
