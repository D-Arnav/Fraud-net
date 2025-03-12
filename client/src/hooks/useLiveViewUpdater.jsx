import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

import fetchTransaction from '../services/fetchTransaction'
import predictTransaction from '../services/predictTransaction'

export const useLiveViewUpdater = () => {
  const { index, setIndex, setTransaction, setResultsTable } = useContext(AppContext);
  const currentIndex = useRef(index);

  useEffect(() => {
    currentIndex.current = index;
  }, [index]);

  useEffect(() => {
    const update = async () => {
      const transaction = await fetchTransaction(currentIndex.current);
      const prediction = await predictTransaction(currentIndex.current);
      
      setTransaction(transaction);
      setResultsTable(prev => [{
        serial: transaction.serial,
        date: transaction.date,
        payment_id: transaction.payment_id,
        ...prediction
      }, ...prev]);
      
      setIndex(prev => prev + 1);
    };

    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [setTransaction, setResultsTable, setIndex]);
};