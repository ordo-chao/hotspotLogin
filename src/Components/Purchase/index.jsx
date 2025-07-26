// src/Components/Wifi.jsx
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Wifi({ setActivePurchase, activePurchase, price, duration, packageId }) {
  const [phoneNumber, setPhoneNumber] = useState("07");
  const [referralNumber, setReferralNumber] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(packageId);

  const purchase = async () => { // Made the function async to await fetch and json()
    try {
      setLoading(true);

      let formattedPhoneNumber = phoneNumber;
      if (phoneNumber.startsWith("07") && phoneNumber.length === 10) {
        formattedPhoneNumber = `254${phoneNumber.substring(1)}`;
      } else if (phoneNumber.startsWith("2547") && phoneNumber.length === 12) {
        // If it's already in 2547 format, use as is.
        // This handles cases where the user might paste a 2547 number directly.
      } else {
        alert("Please enter a valid Kenyan phone number starting with 07...");
        setLoading(false);
        return; 
      }

      console.log("Formatted Phone Number:", formattedPhoneNumber);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/stkpush`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          amount: price,
          phone: formattedPhoneNumber,
          package_id: packageId,
        })
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to read error message from response
        console.error("API Error Response:", errorData);
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const data = await response.json(); // Await the JSON parsing
      console.log("Purchase API Response:", data);
      alert("STK Push initiated successfully! Please check your phone to complete the payment.");
      setActivePurchase(false); 

    } catch (error) {
      console.error("Error during purchase:", error);
      alert(`Purchase failed: ${error.message || "An unknown error occurred. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.App}>
        <div className={styles.header}>
          <h1 className={styles.title}>Buy WIFI</h1>
        </div>

        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); purchase(); }}> {/* Add onSubmit to form */}
          <label className={styles.label}>Enter PHONE number to buy with</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter Your Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </form>

        <form className={styles.form}> {/* This form is for referral, doesn't need onSubmit */}
          <div className={styles.referral} >
            <label
              className={styles.label}
              style={{ display: active ? "flex" : "none" }}
            >
              Add who referred you (phone)?
            </label>
            <button type="button" onClick={() => setActive(!active)} className={styles.referralButton}>
              Add referral
            </button>
          </div>
          <input
            type="number"
            className={styles.input}
            placeholder="Enter Referral Phone"
            value={referralNumber}
            onChange={(e) => setReferralNumber(e.target.value)}
            style={{ display: active ? "block" : "none" }}
          />
        </form>

        <table className={styles.priceTable}>
          <tr>
            <td>Ksh.</td>
            <td>{price}</td>
            <td>{duration}</td>
          </tr>
        </table>

        <p className={styles.call} >Call <a href="tel:+254207903950" >+254207903950</a> for assistance</p>

        <hr className={styles.line} />
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.close}
            onClick={() => setActivePurchase(!activePurchase)}
          >
            Close
          </button>
          <button type="submit" className={styles.submit} onClick={purchase} disabled={loading}> 
            {loading ? "Processing..." : "Purchase"} 
          </button>
        </div>
      </div>
    </div>
  );
}

Wifi.propTypes = {
  setActivePurchase: PropTypes.func.isRequired,
  activePurchase: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  packageId: PropTypes.number.isRequired
};