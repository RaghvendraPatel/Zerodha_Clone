import React from "react";

const Funds = () => {
  const handleAddFunds = () => {
    alert("Add Funds feature coming soon!");
  };

  const handleWithdraw = () => {
    alert("Withdraw feature coming soon!");
  };

  const handleOpenAccount = () => {
    alert("Open Commodity Account feature coming soon!");
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button 
          className="btn btn-green"
          onClick={handleAddFunds}
          style={{ 
            backgroundColor: "#4CAF50", 
            border: "none", 
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: "4px",
            marginRight: "8px"
          }}
        >
          Add funds
        </button>
        <button 
          className="btn btn-blue"
          onClick={handleWithdraw}
          style={{ 
            backgroundColor: "#2196F3", 
            border: "none", 
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: "4px"
          }}
        >
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "10px" }}>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">4,043.10</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">3,757.30</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">4,043.10</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Closing Balance</p>
              <p>3736.40</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4064.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity" style={{ 
            padding: "20px", 
            border: "1px solid #e0e0e0", 
            borderRadius: "4px",
            textAlign: "center"
          }}>
            <p style={{ marginBottom: "15px", color: "#666" }}>You don't have a commodity account</p>
            <button 
              className="btn btn-blue"
              onClick={handleOpenAccount}
              style={{ 
                backgroundColor: "#2196F3", 
                border: "none", 
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: "4px",
                color: "white"
              }}
            >
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;