import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import fetchEvaluateTransaction from '../services/fetchEvaluateTransaction';

export const useLiveViewUpdater = () => {
  const { index, setIndex, setTransaction, setResultsTable } = useContext(AppContext);

  useEffect(() => {
    const update = async () => {
      try {
        const response = await fetchEvaluateTransaction(index);
        if (response && response.details && response.result) {
          setTransaction(response.details);
          setResultsTable(prev => [response.result, ...prev]);
          setIndex(prev => prev + 1);

          console.info('LiveViewUpdater response:', response);
        }
      } catch (error) {
        console.error('LiveViewUpdater error:', error);
      }
    };

    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [index, setTransaction, setResultsTable, setIndex]);
};