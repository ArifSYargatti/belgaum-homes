import React, { useState } from 'react';

function HomeLoansPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(null);
  const [activeTool, setActiveTool] = useState('emi'); // 'emi', 'eligibility', 'prepayment'

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
    const loanEligible = eligibleEmi * 166; // Approximate calculation
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
    const interestSaved = prepayAmount * 0.085 * 20; // Approximate
    const tenureReduced = Math.round((prepayAmount / loanAmount) * tenure);
    setPrepayResult({
      interestSaved: Math.round(interestSaved),
      tenureReduced: tenureReduced
    });
  };

  // Banks Data
  const banks = [
    { name: 'SBI', rate: 7.25, logo: '🏦', processingFee: '0.35%', maxLoan: '80%' },
    { name: 'HDFC', rate: 7.30, logo: '🏦', processingFee: '0.50%', maxLoan: '85%' },
    { name: 'ICICI', rate: 7.10, logo: '🏦', processingFee: '0.50%', maxLoan: '80%' },
    { name: 'Axis', rate: 7.35, logo: '🏦', processingFee: '0.40%', maxLoan: '85%' },
    { name: 'Kotak', rate: 7.40, logo: '🏦', processingFee: '0.45%', maxLoan: '80%' },
    { name: 'PNB', rate: 7.28, logo: '🏦', processingFee: '0.30%', maxLoan: '80%' },
    { name: 'Canara Bank', rate: 7.15, logo: '🏛️', processingFee: '0.25%', maxLoan: '80%' },
    { name: 'Bank of Baroda', rate: 7.20, logo: '🏢', processingFee: '0.25%', maxLoan: '80%' },
  ];

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏦 Home Loans</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Compare & choose the best home loan for you</p>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTool('banks')}
            style={{ padding: '12px 24px', background: activeTool === 'banks' ? '#E31B23' : '#666', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🏦 Home Loan by Banks
          </button>
          <button 
            onClick={() => setActiveTool('interest')}
            style={{ padding: '12px 24px', background: activeTool === 'interest' ? '#E31B23' : '#666', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📊 Home Loan by Interest
          </button>
          <button 
            onClick={() => setActiveTool('emi')}
            style={{ padding: '12px 24px', background: activeTool === 'emi' ? '#E31B23' : '#666', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            💰 EMI Calculator
          </button>
          <button 
            onClick={() => setActiveTool('eligibility')}
            style={{ padding: '12px 24px', background: activeTool === 'eligibility' ? '#E31B23' : '#666', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✅ Eligibility Check
          </button>
          <button 
            onClick={() => setActiveTool('prepayment')}
            style={{ padding: '12px 24px', background: activeTool === 'prepayment' ? '#E31B23' : '#666', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📉 Prepayment Calculator
          </button>
        </div>

        {/* Active Tool Content */}
        <div style={{ marginBottom: '30px' }}>
          {/* Banks View */}
          {activeTool === 'banks' && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>🏦 Compare Home Loan Offers</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {banks.map((bank, idx) => (
                  <div key={idx} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e0e0e0' }}>
                    <div style={{ fontSize: '2.5rem' }}>{bank.logo}</div>
                    <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{bank.name}</div>
                    <div style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.2rem' }}>{bank.rate}%</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Processing Fee: {bank.processingFee}</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Max Loan: {bank.maxLoan}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interest View */}
          {activeTool === 'interest' && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>📊 Home Loan Interest Rates</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#E31B23', color: 'white' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Bank</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Interest Rate</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Processing Fee</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Max Loan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banks.map((bank, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '12px' }}><strong>{bank.name}</strong></td>
                        <td style={{ padding: '12px', color: '#E31B23', fontWeight: 'bold' }}>{bank.rate}%</td>
                        <td style={{ padding: '12px' }}>{bank.processingFee}</td>
                        <td style={{ padding: '12px' }}>{bank.maxLoan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EMI Calculator */}
          {activeTool === 'emi' && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>💰 EMI Calculator</h2>
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
            </div>
          )}

          {/* Eligibility Check */}
          {activeTool === 'eligibility' && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>✅ Loan Eligibility Check</h2>
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
                  <p><strong>Eligible EMI (after existing EMI):</strong> ₹{eligibilityResult.eligibleEmi.toLocaleString()}</p>
                  <p style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.1rem' }}><strong>You are eligible for loan up to:</strong> ₹{eligibilityResult.loanEligible.toLocaleString()}</p>
                </div>
              )}
            </div>
          )}

          {/* Prepayment Calculator */}
          {activeTool === 'prepayment' && (
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>📉 Prepayment Calculator</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>See how much you can save by making extra payments</p>
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
                  <p><strong>Interest Saved:</strong> <span style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{prepayResult.interestSaved.toLocaleString()}</span></p>
                  <p><strong>Tenure Reduced:</strong> ~{prepayResult.tenureReduced} months</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bank Comparison Grid */}
        {!['banks', 'interest'].includes(activeTool) && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Quick Bank Comparison</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
              {banks.slice(0, 6).map((bank, idx) => (
                <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2.5rem' }}>{bank.logo}</div>
                  <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{bank.name}</div>
                  <div style={{ color: '#E31B23', fontWeight: 'bold', fontSize: '1.2rem' }}>{bank.rate}%</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>p.a.</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <button onClick={() => setActiveTool('banks')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>🏦 Home Loan by Banks</button>
            <button onClick={() => setActiveTool('interest')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>📊 Home Loan by Interest</button>
            <button onClick={() => setActiveTool('emi')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>💰 EMI Calculator</button>
            <button onClick={() => setActiveTool('eligibility')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>✅ Eligibility Check</button>
            <button onClick={() => setActiveTool('prepayment')} style={{ padding: '10px 20px', background: '#E31B23', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>📉 Prepayment Calculator</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLoansPage;