export default function determineColor (metric, value) {
    
    let threshold = null;
    let flip = false;

    if (metric == 'accuracy') {
        threshold = 94;
    } else if (metric == 'precision') {
        threshold = 5;
    } else if (metric == 'recall') {
        threshold = 50;
    } else if (metric == 'f1score') {
        threshold = 10;
    } else if (metric == 'fpr') {
        threshold = 6;
        flip = true;
    } else if (metric == 'fnr') {
        threshold = 50;
        flip = true;
    }

    if (flip) {
        return value < threshold ? 'green' : 'red'
    } else {
        return value > threshold ? 'green' : 'red'
    }
}