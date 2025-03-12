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
            'precision': dayResult.precision,
            'recall': dayResult.recall,
            'false_positive_rate': dayResult.false_positive_rate,
            'false_negative_rate': dayResult.false_negative_rate,
            'true_positives': dayResult.true_positives,
            'false_positives': dayResult.false_positives,
            'true_negatives': dayResult.true_negatives,
            'false_negatives': dayResult.false_negatives
        }]);

    };


    return updateDailyView;
};