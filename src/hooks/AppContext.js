import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [day, setDay] = useState(null);
  const [serial, setSerial] = useState(0);
  const [results, setResults] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [matrix, setMatrix] = useState(null);

  return (
    <AppContext.Provider
      value={{
        day,
        setDay,
        serial,
        setSerial,
        results,
        setResults,
        transaction,
        setTransaction,
        matrix,
        setMatrix,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
