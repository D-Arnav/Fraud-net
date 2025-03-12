export default function computeScore(resultsTable) {
  const totalRows = resultsTable.length;
  const fraudulentRows = resultsTable.filter(row => row.predicted === "Fraudulent").length;
  return (fraudulentRows / totalRows) * 100;
}
