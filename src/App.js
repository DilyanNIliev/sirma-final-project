import logo from './logo.svg';
import './App.css';
import { sanitazeArray, formatArrayToMatrix, splitStringToArray } from './apis/utils/dataUtils.js';
import Datatable from './apis/components/Table/DataTable.jsx';
import { useState } from 'react';
import './apis/components/assets/css/index.css'
import TransformDate from './apis/components/TransformDate/TransformDate.jsx';

function App() {
  const [data, setData] = useState([]);

  function handleFileUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      const dataArr = splitStringToArray(reader.result);
      const dataMatrix = formatArrayToMatrix(dataArr);
      const sanitazedArray = sanitazeArray(dataMatrix);

      setData(sanitazedArray);
    };
  }

  function handleRemoveData() {
    setData([]);
    // Clear the file input value to allow selecting the same file again
    document.getElementById('fileInput').value = '';
  }

  return (
    <div className='App'>
      <label htmlFor="fileInput" id='file'>
  Upload file
  <input
    id="fileInput"
    type="file"
    onChange={handleFileUpload}
    style={{ display: 'none' }}
  />
</label>
      {!!data.length && (
        <>
          <button onClick={handleRemoveData} >Remove Data</button>
          <Datatable data={data} />
        </>
      )}
    </div>
  );
}

export default App;
