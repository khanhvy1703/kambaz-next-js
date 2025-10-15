export default function SimpleArrays() {
  let numberArray1 = [1, 2, 3, 4, 5];
  let stringArray1 = ["string1", "string2"];
  let htmlArray1 = [
    <li key="1">Buy milk</li>,
    <li key="2">Feed the pets</li>
  ];

  let variableArray1 = [numberArray1, stringArray1, htmlArray1];

  return (
    <div>
      <h2>Simple Arrays</h2>
      <ol>{htmlArray1}</ol>
    </div>
  );
}