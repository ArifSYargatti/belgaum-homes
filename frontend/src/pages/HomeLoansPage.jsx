import React, { useState } from 'react';

function HomeLoansPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(null);
  const [activeTab, setActiveTab] = useState('apply-now');
  const [activeSubTab, setActiveSubTab] = useState('home-loans');

  // EMI Calculation
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Math.round(emiValue));
  };

  // Eligibility Check
  const [income, setIncome] = useState(50000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const checkEligibility = () => {
    const maxEmi = income * 0.4;
    const eligibleEmi = maxEmi - existingEmi;
    const loanEligible = eligibleEmi * 166;
    setEligibilityResult({
      maxEmi: Math.round(maxEmi),
      eligibleEmi: Math.round(eligibleEmi),
      loanEligible: Math.round(loanEligible)
    });
  };

  // Prepayment Calculator
  const [prepayAmount, setPrepayAmount] = useState(100000);
  const [prepayResult, setPrepayResult] = useState(null);

  const calculatePrepayment = () => {
    const interestSaved = prepayAmount * 0.085 * 20;
    const tenureReduced = Math.round((prepayAmount / loanAmount) * tenure);
    setPrepayResult({
      interestSaved: Math.round(interestSaved),
      tenureReduced: tenureReduced
    });
  };

  // Credit Score Simulator
  const [creditScore, setCreditScore] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const checkCreditScore = () => {
    const score = Math.floor(Math.random() * (850 - 300 + 1)) + 300;
    setCreditScore(score);
  };

  // Apply Now Handler
  const handleApplyNow = (bankName, loanType) => {
    alert(`📋 You are applying for ${loanType} at ${bankName}!\n\nOur team will contact you shortly.\n\n📞 +91 98765 43210\n📧 loans@belgaumhomes.com`);
  };

  // Bank Partners Data
  const banks = [
    { name: 'SBI', rate: 7.25, logo: '🏦', processingFee: '0.35%', maxLoan: '80%', color: '#3B5998' },
    { name: 'HDFC', rate: 7.30, logo: '🏦', processingFee: '0.50%', maxLoan: '85%', color: '#004B8D' },
    { name: 'Axis', rate: 7.35, logo: '🏦', processingFee: '0.40%', maxLoan: '85%', color: '#8B0000' },
    { name: 'Kotak', rate: 7.40, logo: '🏦', processingFee: '0.45%', maxLoan: '80%', color: '#E03C31' },
    { name: 'LIC HF', rate: 7.45, logo: '🏛️', processingFee: '0.30%', maxLoan: '80%', color: '#1E3A8A' },
    { name: 'ICICI', rate: 7.10, logo: '🏦', processingFee: '0.50%', maxLoan: '80%', color: '#4A90E2' },
    { name: 'Canara Bank', rate: 7.15, logo: '🏛️', processingFee: '0.25%', maxLoan: '80%', color: '#2E8B57' },
    { name: 'Bank of Baroda', rate: 7.20, logo: '🏢', processingFee: '0.25%', maxLoan: '80%', color: '#FF6B35' },
    { name: 'PNB', rate: 7.28, logo: '🏦', processingFee: '0.30%', maxLoan: '80%', color: '#D32F2F' },
  ];

  // EMI Calculators for specific banks (for display)
  const emiCalculators = [
    'SBI', 'HDFC', 'Axis', 'Bajaj', 'Kotak', 'L&T'
  ];

  // Interest Rates for specific banks
  const interestRates = [
    'SBI', 'HDFC', 'Axis', 'Bajaj', 'Kotak', 'L&T'
  ];

  const activeBank = banks.find(b => b.name === activeSubTab);

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'apply-now':
        return (
          <div>
            {/* APPLY NOW SECTION */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem' }}>🏠</span>
                <h3>Home Loans</h3>
                <p style={{ color: '#666' }}>Apply for a new home loan</p>
                <button onClick={() => handleApplyNow('Top Banks', 'Home Loan')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Apply Now →</button>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem' }}>🔄</span>
                <h3>Balance Transfer</h3>
                <p style={{ color: '#666' }}>Transfer your existing loan</p>
                <button onClick={() => handleApplyNow('Top Banks', 'Balance Transfer')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Apply Now →</button>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem' }}>🏢</span>
                <h3>Loan Against Property</h3>
                <p style={{ color: '#666' }}>Get loan against your property</p>
                <button onClick={() => handleApplyNow('Top Banks', 'Loan Against Property')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Apply Now →</button>
              </div>
            </div>

            {/* Banks Comparison */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginBottom: '20px' }}>Compare & Apply</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                {banks.map((bank, idx) => (
                  <div key={idx} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', textAlign: 'center', border: `2px solid ${bank.color}` }}>
                    <div style={{ fontSize: '2.5rem' }}>{bank.logo}</div>
                    <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{bank.name}</div>
                    <div style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.2rem' }}>{bank.rate}%</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Processing: {bank.processingFee}</div>
                    <button onClick={() => handleApplyNow(bank.name, 'Home Loan')} style={{ marginTop: '10px', padding: '6px 15px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Apply Now</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'partners':
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
              {banks.map((bank, idx) => (
                <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: `2px solid ${bank.color}` }}>
                  <div style={{ fontSize: '2.5rem' }}>{bank.logo}</div>
                  <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{bank.name} Home Loan</div>
                  <div style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.2rem' }}>{bank.rate}%</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>Processing: {bank.processingFee}</div>
                  <button onClick={() => handleApplyNow(bank.name, 'Home Loan')} style={{ marginTop: '10px', padding: '6px 15px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'explore':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {/* Explore Items */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>💰 Home Loan EMI Calculator</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Calculate your monthly EMI</p>
              <button onClick={() => { setActiveTab('emi-calc'); }} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>✅ Home Loan Eligibility</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Check if you qualify</p>
              <button onClick={() => { setActiveTab('eligibility'); }} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>📊 Get Home Loan Offers <span style={{ background: '#E31B23', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.6rem' }}>NEW</span></h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Get personalized offers</p>
              <button onClick={() => handleApplyNow('All Banks', 'Best Offer')} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Get Offers →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>📈 Check Credit Score</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Get your free credit score</p>
              <button onClick={() => { setActiveTab('credit-score'); }} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>📉 Home Loan Prepayment</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Calculate prepayment savings</p>
              <button onClick={() => { setActiveTab('prepayment'); }} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>📊 Home Loan Interest Rate</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Compare interest rates</p>
              <button onClick={() => { setActiveTab('interest-rates'); }} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>🔄 Home Loan Balance Transfer</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Transfer your existing loan</p>
              <button onClick={() => handleApplyNow('All Banks', 'Balance Transfer')} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Apply →</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#E31B23' }}>📋 Home Loan Documentation</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Required documents list</p>
              <button onClick={() => { setActiveTab('documentation'); }} style={{ padding: '8px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View →</button>
            </div>
          </div>
        );

      case 'emi-calc':
        return (
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>💰 EMI Calculator</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Calculate your monthly EMI</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Loan Amount (₹)</label>
                <input type="number" value={loanAmount} onChange={e => setLoanAmount(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Interest Rate (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tenure (Years)</label>
                <input type="number" value={tenure} onChange={e => setTenure(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
            </div>
            <button onClick={calculateEMI} style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate EMI</button>
            {emi !== null && (
              <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ color: '#E31B23' }}>Monthly EMI: ₹{emi.toLocaleString()}</h3>
                <p style={{ color: '#666' }}>Total Payment: ₹{(emi * tenure * 12).toLocaleString()} | Total Interest: ₹{(emi * tenure * 12 - loanAmount).toLocaleString()}</p>
              </div>
            )}
            <button onClick={() => setActiveTab('explore')} style={{ marginTop: '15px', padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back to Explore</button>
          </div>
        );

      case 'eligibility':
        return (
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>✅ Home Loan Eligibility</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Monthly Income (₹)</label>
                <input type="number" value={income} onChange={e => setIncome(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Existing EMI (₹)</label>
                <input type="number" value={existingEmi} onChange={e => setExistingEmi(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
            </div>
            <button onClick={checkEligibility} style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Check Eligibility</button>
            {eligibilityResult && (
              <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                <p><strong>Your Maximum EMI Capacity:</strong> ₹{eligibilityResult.maxEmi.toLocaleString()}</p>
                <p><strong>Eligible EMI:</strong> ₹{eligibilityResult.eligibleEmi.toLocaleString()}</p>
                <p style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.1rem' }}><strong>You are eligible for loan up to:</strong> ₹{eligibilityResult.loanEligible.toLocaleString()}</p>
              </div>
            )}
            <button onClick={() => setActiveTab('explore')} style={{ marginTop: '15px', padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back to Explore</button>
          </div>
        );

      case 'credit-score':
        return (
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>📈 Check Credit Score</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Get your free credit score in 2 minutes</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your name" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Enter email" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                <input type="tel" value={userPhone} onChange={e => setUserPhone(e.target.value)} placeholder="Enter phone" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
            </div>
            <button onClick={checkCreditScore} style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Get Free Credit Score</button>
            {creditScore !== null && (
              <div style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', textAlign: 'center', background: creditScore >= 750 ? '#e8f5e9' : creditScore >= 650 ? '#fff3e0' : '#fce4ec' }}>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: creditScore >= 750 ? '#4caf50' : creditScore >= 650 ? '#ff9800' : '#f44336' }}>{creditScore}</p>
                <p>{creditScore >= 750 ? '✅ Excellent! Great credit score.' : creditScore >= 650 ? '⚠️ Good! You may qualify.' : '❌ Needs improvement.'}</p>
              </div>
            )}
            <button onClick={() => setActiveTab('explore')} style={{ marginTop: '15px', padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back to Explore</button>
          </div>
        );

      case 'prepayment':
        return (
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>📉 Home Loan Prepayment</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Loan Amount (₹)</label>
                <input type="number" value={loanAmount} onChange={e => setLoanAmount(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Prepayment Amount (₹)</label>
                <input type="number" value={prepayAmount} onChange={e => setPrepayAmount(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
              </div>
            </div>
            <button onClick={calculatePrepayment} style={{ padding: '12px 30px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Savings</button>
            {prepayResult && (
              <div style={{ marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                <p><strong>Interest Saved:</strong> <span style={{ color: '#E31B23', fontWeight: 'bold' }}>₹{prepayResult.interestSaved.toLocaleString()}</span></p>
                <p><strong>Tenure Reduced:</strong> ~{prepayResult.tenureReduced} months</p>
              </div>
            )}
            <button onClick={() => setActiveTab('explore')} style={{ marginTop: '15px', padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back to Explore</button>
          </div>
        );

      case 'interest-rates':
        return (
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>📊 Home Loan Interest Rates</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#E31B23', color: 'white' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Bank</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Interest Rate</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Processing Fee</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>Apply</th>
                  </tr>
                </thead>
                <tbody>
                  {banks.map((bank, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px' }}><strong>{bank.name}</strong></td>
                      <td style={{ padding: '12px', color: '#E31B23', fontWeight: 'bold' }}>{bank.rate}%</td>
                      <td style={{ padding: '12px' }}>{bank.processingFee}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button onClick={() => handleApplyNow(bank.name, 'Home Loan')} style={{ padding: '6px 15px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Apply</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setActiveTab('explore')} style={{ marginTop: '15px', padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back to Explore</button>
          </div>
        );

      case 'documentation':
        return (
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>📋 Home Loan Documentation</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ color: '#E31B23' }}>📄 Identity Proof</h4>
                <ul style={{ padding: '10px 0', listStyle: 'none' }}>
                  <li>• PAN Card</li>
                  <li>• Aadhaar Card</li>
                  <li>• Passport</li>
                  <li>• Voter ID</li>
                </ul>
              </div>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ color: '#E31B23' }}>🏠 Address Proof</h4>
                <ul style={{ padding: '10px 0', listStyle: 'none' }}>
                  <li>• Utility Bills</li>
                  <li>• Rent Agreement</li>
                  <li>• Bank Statement</li>
                  <li>• Aadhaar Card</li>
                </ul>
              </div>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ color: '#E31B23' }}>💰 Income Proof</h4>
                <ul style={{ padding: '10px 0', listStyle: 'none' }}>
                  <li>• Salary Slips (3 months)</li>
                  <li>• Bank Statements (6 months)</li>
                  <li>• ITR Returns</li>
                  <li>• Form 16</li>
                </ul>
              </div>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4 style={{ color: '#E31B23' }}>🏢 Property Proof</h4>
                <ul style={{ padding: '10px 0', listStyle: 'none' }}>
                  <li>• Sale Agreement</li>
                  <li>• Property Tax Receipts</li>
                  <li>• Khata Certificate</li>
                  <li>• Encumbrance Certificate</li>
                </ul>
              </div>
            </div>
            <button onClick={() => setActiveTab('explore')} style={{ marginTop: '15px', padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Back to Explore</button>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div style={{ padding: '40px 0', background: '#f5f7fb' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>🏦 Home Loans</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Compare offers from 40+ banks | Get best interest rates starting from 7.1%</p>

        {/* ===== MAIN TABS ===== */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '30px', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <button 
            onClick={() => setActiveTab('apply-now')} 
            style={{ padding: '10px 20px', background: activeTab === 'apply-now' ? '#E31B23' : 'transparent', color: activeTab === 'apply-now' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'apply-now' ? 'bold' : 'normal' }}
          >
            📋 Apply Now
          </button>
          <button 
            onClick={() => setActiveTab('home-loans')} 
            style={{ padding: '10px 20px', background: activeTab === 'home-loans' ? '#E31B23' : 'transparent', color: activeTab === 'home-loans' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'home-loans' ? 'bold' : 'normal' }}
          >
            🏠 Home Loans
          </button>
          <button 
            onClick={() => setActiveTab('balance-transfer')} 
            style={{ padding: '10px 20px', background: activeTab === 'balance-transfer' ? '#E31B23' : 'transparent', color: activeTab === 'balance-transfer' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'balance-transfer' ? 'bold' : 'normal' }}
          >
            🔄 Balance Transfer
          </button>
          <button 
            onClick={() => setActiveTab('loan-against-property')} 
            style={{ padding: '10px 20px', background: activeTab === 'loan-against-property' ? '#E31B23' : 'transparent', color: activeTab === 'loan-against-property' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'loan-against-property' ? 'bold' : 'normal' }}
          >
            🏢 Loan Against Property
          </button>
          <button 
            onClick={() => setActiveTab('partners')} 
            style={{ padding: '10px 20px', background: activeTab === 'partners' ? '#E31B23' : 'transparent', color: activeTab === 'partners' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'partners' ? 'bold' : 'normal' }}
          >
            🤝 Partners
          </button>
          <button 
            onClick={() => setActiveTab('explore')} 
            style={{ padding: '10px 20px', background: activeTab === 'explore' ? '#E31B23' : 'transparent', color: activeTab === 'explore' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'explore' ? 'bold' : 'normal' }}
          >
            🔧 Explore
          </button>
          <button 
            onClick={() => setActiveTab('emi-calc')} 
            style={{ padding: '10px 20px', background: activeTab === 'emi-calc' ? '#E31B23' : 'transparent', color: activeTab === 'emi-calc' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'emi-calc' ? 'bold' : 'normal' }}
          >
            💰 EMI Calculators
          </button>
          <button 
            onClick={() => setActiveTab('interest-rates')} 
            style={{ padding: '10px 20px', background: activeTab === 'interest-rates' ? '#E31B23' : 'transparent', color: activeTab === 'interest-rates' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'interest-rates' ? 'bold' : 'normal' }}
          >
            📊 Interest Rates
          </button>
        </div>

        {/* ===== RENDER CONTENT ===== */}
        {renderContent()}
      </div>
    </div>
  );
}

export default HomeLoansPage;

