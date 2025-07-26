// src/Components/Wifi.jsx
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Wifi({ setActiveWifi, activeWifi }) {
  const [number , setNumber] = useState('07');
  return (
    <div className={styles.overlay}>
      <div className={styles.App}>
        <div className={styles.header} >
          <h1 className={styles.title}>Trial Period</h1>
        </div>
        <form className={styles.form} >
          <label className={styles.label}>Phone Number</label>
          <input type="number" className={styles.input} placeholder="Enter Your Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} />
          <p>We do not share your information with anyone.Information is used to send access credential </p>
        </form>
        <hr className={styles.line} />
        <div className={styles.buttons} >
          <button type="submit" className={styles.close} onClick={() => setActiveWifi(!activeWifi)} >Close</button>
          <button type="submit" className={styles.submit} >Try Wifi</button>
        </div>
      </div>
    </div>
  );
}

Wifi.propTypes = {
  setActiveWifi: PropTypes.func.isRequired,
  activeWifi: PropTypes.bool.isRequired,
};
