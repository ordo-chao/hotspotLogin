// src/Components/DataBalanceChecker/index.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Don't forget prop-types
import styles from './index.module.css';

const ProgressBar = ({ label, percentage, value }) => (
  <div className={styles.progressBarContainer}>
    <div className={styles.progressBarHeader}>
      <span className={styles.progressBarLabel}>{label}</span>
      <span className={styles.progressBarPercentage}>{percentage}%</span>
    </div>
    <div className={styles.progressBarTrack}>
      <div className={styles.progressBarFill} style={{ width: `${percentage}%` }}></div>
    </div>
    <span className={styles.progressBarValue}>{value}</span>
  </div>
);

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default function DataBalanceChecker({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [voucher, setVoucher] = useState('');
  const [balanceData, setBalanceData] = useState(null); // Stores the fetched balance
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckBalance = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setError(null); // Clear previous errors
    setBalanceData(null); // Clear previous data
    setLoading(true);

    if (!phoneNumber.trim() && !voucher.trim()) {
      setError('Please enter either a Phone Number or a Voucher.');
      setLoading(false);
      return;
    }

    try {
      // Simulate an API call delay
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 seconds delay

      // In a real application, you would make a fetch/axios call here:
      /*
      const response = await fetch('/api/check-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, voucher }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch balance.');
      }

      const data = await response.json();
      setBalanceData(data);
      */

      // --- Simulated Data for Demonstration ---
      // Replace this with actual data from your API response
      setBalanceData({
        timeRemaining: '10h 30m',
        timePercentage: 75,
        dataRemaining: '2.5 GB',
        dataPercentage: 50,
        loginTime: '2025-07-25 10:00 AM', // Example time based on current time
        expiryTime: '2025-07-26 10:00 AM', // Example expiry
        purchased: '5 GB Daily Bundle (Wi-Fi access)',
      });
      // --- End Simulated Data ---

    } catch (err) {
      console.error("Error fetching balance:", err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className={styles.overlay} >
     <div className={styles.container}>
      <h2 className={styles.title}>Check Data Balance</h2>

      <form className={styles.form} onSubmit={handleCheckBalance}>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>Phone Number:</label>
          <input
            type="tel" // Use type="tel" for phone numbers
            id="phoneNumber"
            className={styles.input}
            placeholder="e.g., 07XXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="voucher" className={styles.label}>Voucher:</label>
          <input
            type="text"
            id="voucher"
            className={styles.input}
            placeholder="Enter voucher code (optional)"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Checking...' : 'Check Balance'}
        </button>
        <button className={styles.closeButton} onClick={() => onClose(false)} >
          close
        </button>
        </div>
      </form>

      {balanceData && (
        <div className={styles.resultsSection}>
          <h3 className={styles.resultsTitle}>Your Balance Details</h3>

          <ProgressBar label="Time Remaining" percentage={balanceData.timePercentage} value={balanceData.timeRemaining} />
          <ProgressBar label="Data Remaining" percentage={balanceData.dataPercentage} value={balanceData.dataRemaining} />

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Login Time:</span>
            <span className={styles.detailValue}>{balanceData.loginTime}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Expiry Time:</span>
            <span className={styles.detailValue}>{balanceData.expiryTime}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Purchased:</span>
            <span className={styles.detailValue}>{balanceData.purchased}</span>
          </div>
        </div>
      )}
    </div>
   </div>
  );
}

DataBalanceChecker.propTypes = {
  onClose: PropTypes.func.isRequired,
};