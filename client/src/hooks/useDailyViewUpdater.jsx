import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import evaluateDay from '../services/evaluateDay';

export const useDailyViewUpdater = () => {
    const { selectedDate, setDailyViewTable } = useContext(AppContext);

    const updateDailyView = async () => {
        const dayResult = await evaluateDay(selectedDate);

        setDailyViewTable(prev => [...prev, {
            'date': `Jan ${14 + selectedDate}`,
            'num_legitimate': dayResult.num_legitimate.toString(),
            'num_fraudulent': dayResult.num_fraudulent.toString(),
            'precision': dayResult.precision.toFixed(2),
            'recall': dayResult.recall.toFixed(2),
            'false_positive_rate': (dayResult.false_positive_rate * 100).toFixed(2) + '%',
            'false_negative_rate': (dayResult.false_negative_rate * 100).toFixed(2) + '%'
        }]);

    };


    return updateDailyView;
};