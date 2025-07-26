import styles from "./index.module.css";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Voucher from "../Components/Voucher";
import Account from "../Components/Account";
import Wifi from "../Components/Wifi";
import Purchase from "../Components/Purchase";
import DataBalanceChecker from "../Components/Balance";
import TopUp from "../Components/TopUp";

export default function Homepage() {
  const [active, setActive] = useState("Voucher");
  const [activepackage, setActivePackage] = useState(""); // Initialize with an empty string, or null
  const [activeWifi, setActiveWifi] = useState(false);
  const [price, setPrice] = useState(0);
  const [activePurchase, setActivePurchase] = useState(false);
  const [duration, setDuration] = useState("");
  const [showDataBalanceChecker, setShowDataBalanceChecker] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [packageId , setPackageId] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []); // Run once on component mount

  const fetchPackages = async () => {
    try {
      setLoading(true);
      // Using 'daystar' as a placeholder based on your previous output.
      // You might want to make this dynamic if packages vary by location.
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/packages/daystar`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched packages:", data); // Log the fetched data for verification
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      // Optionally set an error message state to display to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <ClipLoader color="#36d7b7" size={50} />
          <p>Loading packages...</p> {/* Add a loading message */}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.buttons}>
            <button className={active === "Voucher" ? styles.active : styles.inactive} onClick={() => setActive("Voucher")}>
              Voucher
            </button>
            <button className={active === "Account Login" ? styles.active : styles.inactive} onClick={() => setActive("Account Login")}>
              Account Login
            </button>
          </div>
          <h2 className={styles.title}>{active}</h2>
          <h3 className={styles.subtitle}>Next Thing Networks Ltd</h3>
          <hr className={styles.line} />
          {active === "Voucher" ? <Voucher /> : <Account />}
          <div className={styles.options}>
            <button className={styles.option} onClick={() => { setActiveWifi(!activeWifi); console.log(activeWifi) }} >Try Wifi </button>
            <a className={styles.call} href="tel:+254207903950" >Call +254207903950 for assistance </a>
            <button className={styles.option} onClick={() => setShowDataBalanceChecker(true)} >Data Bal </button>
            <button className={styles.option} onClick={() => setShowTopUp(true)} >Top up Bal </button>
          </div>
          <hr className={styles.line} />
          <h4 className={styles.subtitle}>PURCHASE DATA PACKAGES</h4>

          {/* Dynamically render packages */}
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg.id} className={styles.package}> {/* Add a unique key for each mapped element */}
                {/* <div > */}
                  <label>{pkg.name}</label>
                  <label>KSH.{parseFloat(pkg.price).toFixed(2)}/=</label> {/* Format price to 2 decimal places */}
                  <button onClick={() => setActivePackage(activepackage === pkg.name ? "" : pkg.name)}>
                    More Details
                  </button>
                {/* </div> */}
                <div className={`${styles.packagedetails} ${activepackage === pkg.name ? styles.packagedetailsActive : ''}`}>
                  <label>Description: {pkg.description}</label> {/* Using pkg.description as a placeholder for devices/details */}
                  <div className={styles.blue}></div>
                  <p>How to Buy {pkg.name}</p>
                  <div className={styles.steps}>
                    <label>1.Click Buy this package. </label>
                    <label>2.Enter Phone Number. </label>
                    <label>3.Confirm Purchase. </label>
                    <label>4.Sim toolkit POP UP from <span>MERCHANT PAYMENT via KopoKopo</span> </label>
                    <label>5.Enter M-PESA pin </label>
                    <label>6.Click sms link or enter credentials on sign in page </label>
                    <button
                      onClick={() => {
                        setPrice(parseFloat(pkg.price)); // Ensure price is a number
                        let pkgDuration = "";
                        if (pkg.name.includes("Daily")) pkgDuration = "24 hours";
                        else if (pkg.name.includes("WEEKLY")) pkgDuration = "1 Week";
                        else if (pkg.name.includes("MONTHLY")) pkgDuration = "1 Month";
                        setDuration(pkgDuration);
                        setActivePurchase(!activePurchase);
                        setPackageId(pkg.id);
                      }}
                    >
                      Buy this Package
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className={styles.subtitle}>No packages available at the moment.</p>
          )}

          <hr className={styles.strechedline} />
          <p className={styles.copyright} >© Copyright: Next Thing Networks Ltd</p>
          <p className={styles.copyright} >Call Us: <a href="tel:+254207903950" >+254207903950</a></p>

          {activeWifi && <Wifi setActiveWifi={setActiveWifi} activeWifi={activeWifi} />}
          {activePurchase && <Purchase setActivePurchase={setActivePurchase} activePurchase={activePurchase} price={price} duration={duration} packageId={packageId}  />}
          {showDataBalanceChecker && <DataBalanceChecker onClose={setShowDataBalanceChecker} />}
          {showTopUp && <TopUp onClose={setShowTopUp} />}
        </div>
      )}
    </>
  );
}

