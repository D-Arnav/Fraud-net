export default function determineColor(metric, value) {

    let threshold = null;
    let flip = false;

    if (metric == 'Accuracy') {
        threshold = 94;
    } else if (metric == 'Precision') {
        threshold = 5;
    } else if (metric == 'Recall') {
        threshold = 45;
    } else if (metric == 'F1 Score') {
        threshold = 10;
    } else if (metric == 'FPR') {
        threshold = 5;
        flip = true;
    } else if (metric == 'FNR') {
        threshold = 55;
        flip = true;
    }

    if (flip) {
        return value < threshold ? 'green bold' : 'red bold'
    } else {
        return value > threshold ? 'green bold' : 'red bold'
    }
}