export default function SimpleArrays() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  const htmlArray1 = [
    <li key="1">Buy milk</li>,
    <li key="2">Feed the pets</li>
  ];

  const variableArray1 = [numberArray1, stringArray1, htmlArray1];

  return (
    <div>
      <h2>Simple Arrays</h2>
      <ol>{htmlArray1}</ol>
    </div>
  );
}