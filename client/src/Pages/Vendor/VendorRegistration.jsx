import { Link } from "react-router-dom";
import VendorForm from "../../Components/Forms/VendorForm";
import styles from "./vendorRegistration.module.css";

const VendorRegistration = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Become a Vendor</h1>
        <h4 className={styles.question}>
          Already have an account? <Link to="/vendor/login">Log in</Link>
        </h4>
        <VendorForm />
        <button className={styles.button}>Register</button>
      </div>
    </div>
  );
};

export default VendorRegistration;
