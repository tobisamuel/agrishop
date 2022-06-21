import { Link } from "react-router-dom";
import CustomerForm from "../Components/CustomerForm";
import styles from "./customerRegistration.module.css";

const CustomerRegistration = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Register for AgriShop</h1>
        <h4 className={styles.question}>
          Already have an account? <Link to="/login">Log in</Link>
        </h4>
        <div className={styles.formContainer}>
          <CustomerForm />
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistration;
