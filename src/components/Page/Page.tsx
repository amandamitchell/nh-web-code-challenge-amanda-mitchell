import { useActionState } from "react";
import { searchAddress } from "../../lib/actions";
import ClinicianList from "../ClinicianList/ClinicianList";
import Form from "../Form/Form";
import styles from "./Page.module.css";

const Page = () => {
  const [state, formAction] = useActionState(searchAddress, {});
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.container}>
          <h1>Clinician Dispatch Dashboard</h1>
          <Form
            formAction={formAction}
            defaultAddressValue={state.address}
            defaultLabValue={state.lab}
            hasError={state.error}
          />
        </div>
      </div>
      <div className={styles.result}>
        <div className={styles.container}>
          <ClinicianList clinicians={state.clinicians} />
        </div>
      </div>
    </div>
  );
};

export default Page;
