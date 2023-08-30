import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TableItem from "./components/TableItem";
import TableForm from './components/TableForm';
import SearchBar from './components/SearchBar';

function App() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    fetch("https://bank-react-app-data.onrender.com/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  const handleDeleteData = (id) => {
    fetch(`https://bank-react-app-data.onrender.com/transactions/${id}`, {
      method: "DELETE"
    });

    const newData = transactions.filter(item => item.id !== id);
    setTransactions(newData);
  };

  let tableData;
  if (transactions === null) {
    return <div>Loading...</div>;
  } else {
    tableData = transactions.map(data => (
      <TableItem data={data} deleteData={handleDeleteData} />
    ));
  }

  const postData = (data) => {
    fetch("https://bank-react-app-data.onrender.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setTransactions([...transactions, data]));
  };

  const handleFilterSearch = (data) => {
    if (data != null) {
      const newData = transactions.filter(item => item.description.includes(data));
      setTransactions(newData);
    }
  };

  const handleSort = (data) => {
    const myNewData = [...transactions];
    const newData = myNewData.sort((a, b) => {
      if (a[data] > b[data]) {
        return 1;
      } else if (a[data] < b[data]) {
        return -1;
      } else {
        return 0;
      }
    });
    setTransactions(newData);
  };

  return (
    <div>
      <div>
        <SearchBar filterSearch={handleFilterSearch} sortData={handleSort} />
        <TableForm handleSubmit={postData} />
      </div>
      
      <Table striped bordered hover style={{ margin: "5px 10px" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>data</th>
            <th>description</th>
            <th>category</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
