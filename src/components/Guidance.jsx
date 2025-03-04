export default function Guidance() {
    return (
        <div style={{ fontFamily: "Inter" }}>
            <section>
                <h3>Performance Metrics</h3>
                <ul>
                    <li>
                        <strong>Accuracy:</strong> The overall correctness of the model. This metric is not very suitable for class imbalanced tasks such as fraud detection.
                    </li>
                    <li>
                        <strong>Precision:</strong> The fraction of flagged transactions that are actually fradulent.
                    </li>
                    <li>
                        <strong>Recall:</strong> The fraction of fraudulent transactions identified.
                    </li>
                    <li>
                        <strong>F1 Score:</strong> Provides a balanced metric by combining precision and recall. (2 * Precision * Recall) / (Precision + Recall)
                    </li>
                </ul>
            </section>
            <section>
                <h3>Error Rates</h3>
                <ul>
                    <li>
                        <strong>False Positive Rate (FPR):</strong> The proportion of legitimate transactions mistakenly flagged as fraudulent.
                    </li>
                    <li>
                        <strong>False Negative Rate (FNR):</strong> The fraction of fraudulent transactions that the model fails to identify.
                    </li>
                </ul>
            </section>
            <section>
                <h3>Other Terms</h3>
                <ul>
                    <li>
                        <strong>Confidence:</strong> The probability assigned to a prediction, helping to adjust alert thresholds for potential fraud. This is determined by the final layer of the neural network which assigns a probability score to each class.
                    </li>
                </ul>
            </section>
        </div>
    );
}