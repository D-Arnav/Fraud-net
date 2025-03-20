import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [index, setIndex] = useState(1);

    const [transaction, setTransaction] = useState(
        {
          "serial": "",
          "payment_id": "",
          "date": "",
          "name": "",
          "card_hash": "",
          "card_bin": "",
          "amount": "",
          "currency": ""
        }
    );
      
    const [resultsTable, setResultsTable] = useState([]);

    const [dailyViewTable, setDailyViewTable] = useState([]);

    const [selectedDate, setSelectedDate] = useState(1);

    const [theme, setTheme] = useState('light');

    return (
        <AppContext.Provider 
            value={{
                index, setIndex,
                transaction, setTransaction,
                resultsTable, setResultsTable,
                dailyViewTable, setDailyViewTable,
                selectedDate, setSelectedDate,
                theme, setTheme
            }}
        >
            {children}
        </AppContext.Provider>
    );
};