import styles from "./index.module.css";
import { useState } from "react";
export default function Index() {
    const [voucher, setVoucher] = useState("");

  const handleConnect = async (e) => {
    e.preventDefault();
    let input = voucher.trim().toUpperCase();

    if (!input) {
      alert("Please enter your voucher code or M-PESA message.");
      return;
    }

    // Match likely M-PESA transaction code: 10 alphanumeric chars (e.g. TDR9E258HX)
    const mpesaMatch = input.match(/\b[A-Z0-9]{10}\b/);
    if (mpesaMatch) {
      const mpesaCode = mpesaMatch[0];
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/voucher/by-mpesa/${mpesaCode}`);
        if (response.ok) {
          const data = await response.json();
          input = data.voucher_code?.toUpperCase() ?? input;
        } else {
          alert("No voucher found for this M-PESA code.");
          return;
        }
      } catch (err) {
        alert("Network error. Please try again.");
        return;
      }
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "http://kwachu.wifi/login";

    const usernameField = document.createElement("input");
    usernameField.type = "hidden";
    usernameField.name = "username";
    usernameField.value = input;

    const passwordField = document.createElement("input");
    passwordField.type = "hidden";
    passwordField.name = "password";
    passwordField.value = input;

    form.appendChild(usernameField);
    form.appendChild(passwordField);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.title}>Voucher or Paste MPESA message</h1>
      <form>
        <input type="text" className={styles.input} placeholder="Enter Your Username/Voucher" onChange={(e) => setVoucher(e.target.value)} />
        <button type="submit" className={styles.button} onClick={handleConnect}>Connect Now</button>
      </form>
    </div>
  );
}