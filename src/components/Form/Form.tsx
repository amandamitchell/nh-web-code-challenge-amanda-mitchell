import styles from "./Form.module.css";

type FormProps = {
  formAction: (payload: FormData) => void;
  defaultAddressValue?: string;
  defaultLabValue?: boolean;
  hasError?: boolean;
};

const Form = ({ formAction, defaultAddressValue, defaultLabValue, hasError }: FormProps) => {
  return (
    <form action={formAction}>
      <div className={styles["form-row"]}>
        <label htmlFor="address" className={styles["text-label"]}>
          Patient’s Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          defaultValue={defaultAddressValue}
          required
          aria-invalid={hasError}
          aria-describedby="address-error"
        />
        {hasError && (
          <div className={styles.error} id="address-error" aria-live="polite">
            Please enter an address
          </div>
        )}
      </div>
      <div className={styles["form-row"]}>
        <label className={styles["checkbox-label"]}>
          <input type="checkbox" id="lab" name="lab" defaultChecked={defaultLabValue} />{" "}
          <span>Lab Drop-off Required</span>
        </label>
      </div>
      <button type="submit" className={styles.submit}>
        Find Optimal Clinician
      </button>
    </form>
  );
};

export default Form;
