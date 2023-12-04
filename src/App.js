import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios"
import MaterialTable from 'material-table'






function App() {
  const [selectedRow,setSelectedRows]=useState([])
  const [tableData, setTableData] = useState([])
  const getProductData=async()=>{
    try{
      const tableData=await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setTableData(tableData.data)
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getProductData();
  },[])
  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" }, 
    
    { title: "Role", field: "role", }
  ] 
 const handleBulkDelete=()=>{
  const updateData=tableData.filter(row=>!selectedRow.includes(row))
  setTableData(updateData)

 }

  return (
    <div className="App">
      <h1 align="center">Assignment 2</h1>
      
      <MaterialTable
        title="Employee Data"
        data={tableData}
        columns={columns}
        editable={{
          onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
           setTableData([...tableData,newRow])
           setTimeout(()=>resolve(),500)

          }),
          onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
            const updateData=[...tableData]
            updateData[oldRow.tableData.id]=newRow
            setTableData(updateData)
            setTimeout(()=>resolve(),500)

          }),
          onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
            const updateData=[...tableData]
            updateData.splice(selectedRow.tableData.id,1)
            setTableData(updateData)
            setTimeout(()=>resolve(),1000)

          })


        }}
        onSelectionChange={(selectedRows)=>setSelectedRows(selectedRows)}
        options={{addRowPosition:"first",actionsColumnIndex:-1,selection:true,showSelectAllCheckbox:false,showTextRowsSelected:false,selectionProps:rowData=>({
          color:"grey",
          
        })}}
        actions={[
          {
            icon:'delete',
            tolltip:"Delete all selected rows",
            onClick:()=>handleBulkDelete()
          }
        ]}
      />
    </div>
  );
}

export default App;
