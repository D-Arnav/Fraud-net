import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [day, setDay] = useState(1);
  const [serial, setSerial] = useState(0);
  const [liveSerial, setLiveSerial] = useState(0);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [matrix, setMatrix] = useState([0, 0, 0, 0]);
  const [metrics, setMetrics] = useState([]);

  return (
    <AppContext.Provider
      value={{
        day,
        setDay,
        serial,
        setSerial,
        liveSerial,
        setLiveSerial,
        results,
        setResults,
        status,
        setStatus,
        transaction,
        setTransaction,
        matrix,
        setMatrix,
        metrics,
        setMetrics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
