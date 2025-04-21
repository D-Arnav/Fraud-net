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
    const [dateRange, setDateRange] = useState([null, null]); // Date range for filtering merchants
    const [minDate, setMinDate] = useState(null); // Minimum date
    const [maxDate, setMaxDate] = useState(null); // Maximum date

    // Fetch merchant data (example API call)
    // useEffect(() => {
    //     const fetchMerchantData = async () => {
    //         const response = await fetch('http://127.0.0.1:8000/merchant_data'); // Replace with your API endpoint
    //         const data = await response.json();
    //         setMerchant(data);
    //         setFilteredMerchant(data); // Initialize filtered data with all merchants

    //         // Calculate min and max dates
    //         if (data.length > 0) {
    //             const dates = data.map((row) => new Date(row.date).getTime());
    //             setMinDate(Math.min(...dates));
    //             setMaxDate(Math.max(...dates));
    //         }
    //     };

    //     fetchMerchantData();
    // }, []);

    // Update filteredMerchant whenever searchQuery, merchant, or dateRange changes
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = merchant.filter((row) => {
            const matchesQuery = row.merchant.toLowerCase().includes(lowerCaseQuery);
            const matchesDateRange = dateRange[0] && dateRange[1]
                ? new Date(row.date).getTime() >= dateRange[0] && new Date(row.date).getTime() <= dateRange[1]
                : true;
            return matchesQuery && matchesDateRange;
        });
        setFilteredMerchant(filtered);
    }, [searchQuery, merchant, dateRange]);

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
                theme, setTheme,
                dateRange, setDateRange, // Expose date range and its setter
                minDate, maxDate // Expose min and max dates
            }}
        >
            {children}
        </AppContext.Provider>
    );
};