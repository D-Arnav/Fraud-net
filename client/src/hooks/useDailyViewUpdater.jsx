import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import evaluateDay from '../services/evaluateDay';

export const useDailyViewUpdater = () => {
    const { selectedDate, setDailyViewTable } = useContext(AppContext);

    const updateDailyView = async () => {
        const dayResult = await evaluateDay(selectedDate);

        setDailyViewTable(prev => [...prev, dayResult]);

    };


    return updateDailyView;
};