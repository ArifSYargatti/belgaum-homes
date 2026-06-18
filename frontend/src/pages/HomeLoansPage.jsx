import React, { useState } from 'react';

function HomeLoansPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Math.round(emiValue));
  };

  const banks = [
    { name: 'SBI', rate: 7.25, logo: '🏦' },
    { name: 'HDFC', rate: 7.30, logo: '🏦' },
    { name: 'ICICI', rate: 7.10, logo: '🏦' },
    { name: 'Axis', rate: 7.35, logo: '🏦' },
    { name: 'Kotak', rate: 7.40, logo: '🏦' },
    { name: 'PNB', rate: 7.28, logo: '🏦' },
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏦 Home Loans</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Compare & choose the best home loan for you</p>

        {/* EMI Calculator */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>💰 EMI Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Loan Amount (₹)</label><input type="number" value={loanAmount} onChange={e => setLoanAmount(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
            <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Interest Rate (%)</label><input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
            <div><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tenure (Years)</label><input type="number" value={tenure} onChange={e => setTenure(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} /></div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}><button onClick={calculateEMI} style={{ padding: '10px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate EMI</button></div>
          </div>
          {emi !== null && <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}><h3 style={{ color: '#E31B23' }}>Monthly EMI: ₹{emi.toLocaleString()}</h3></div>}
        </div>

        {/* Bank Comparison */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Compare Banks</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          {banks.map((bank, idx) => (
            <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2.5rem' }}>{bank.logo}</div>
              <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{bank.name}</div>
              <div style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.2rem' }}>{bank.rate}%</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>p.a.</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <button style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>🏦 Home Loan by Banks</button>
            <button style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>📊 Home Loan by Interest</button>
            <button style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>💰 EMI Calculator</button>
            <button style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>✅ Eligibility Check</button>
            <button style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>📉 Prepayment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLoansPage;