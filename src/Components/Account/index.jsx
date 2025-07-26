import styles from "./index.module.css";
import { useState } from "react";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";

    form.action = "http://kwachu.wifi/login";


    const usernameField = document.createElement("input");
    usernameField.type = "hidden";
    usernameField.name = "username";
    usernameField.value = username;
    form.appendChild(usernameField);

    const passwordField = document.createElement("input");
    passwordField.type = "hidden";
    passwordField.name = "password";
    passwordField.value = password;
    form.appendChild(passwordField);

    document.body.appendChild(form);
    form.submit();
  };
  return (
    <div className={styles.App}>
      <form className={styles.form} >
        <h1 className={styles.title}>Username</h1>
        <input type="text" className={styles.input} placeholder="Enter Your Username/Voucher" onChange={(e) => setUsername(e.target.value)} />
        <h1 className={styles.title}>Password</h1>
        <input type="password" className={styles.input} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)}  />
        <button type="submit" className={styles.button} onClick={handleSignIn}>Connect Now</button>
      </form>
    </div>
  );
}