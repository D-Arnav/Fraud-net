import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [index, setIndex] = useState(1);

    const [transaction, setTransaction] = useState({
        "serial": "",
        "payment_id": "",
        "date": "",
        "name": "",
        "card_hash": "",
        "card_bin": "",
        "amount": "",
        "currency": ""
    });

    const [resultsTable, setResultsTable] = useState([]);
    const [dailyViewTable, setDailyViewTable] = useState([]);
    const [selectedDate, setSelectedDate] = useState(1);
    const [merchant, setMerchant] = useState([]); // Original merchant data
    const [filteredMerchant, setFilteredMerchant] = useState([]); // Filtered merchant data
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [theme, setTheme] = useState('light');

    // Fetch merchant data (example API call)
    useEffect(() => {
        const fetchMerchantData = async () => {
            const response = await fetch('http://127.0.0.1:8000/merchant_data'); // Replace with your API endpoint
            const data = await response.json();
            setMerchant(data);
            setFilteredMerchant(data); // Initialize filtered data with all merchants
        };

        fetchMerchantData();
    }, []);

    // Update filteredMerchant whenever searchQuery or merchant changes
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = merchant.filter((row) =>
            row.merchant.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredMerchant(filtered);
    }, [searchQuery, merchant]);

    return (
        <AppContext.Provider
            value={{
                index, setIndex,
                transaction, setTransaction,
                resultsTable, setResultsTable,
                dailyViewTable, setDailyViewTable,
                selectedDate, setSelectedDate,
                merchant, setMerchant,
                filteredMerchant, // Expose filtered data
                searchQuery, setSearchQuery, // Expose search query and its setter
                theme, setTheme
            }}
        >
            {children}
        </AppContext.Provider>
    );
};