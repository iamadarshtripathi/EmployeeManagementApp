import "./App.css"
import React, {useState} from "react";
import Axios from "axios";

function App() {
   const [name, setName] = useState("");
   const [age, setAge] = useState(0);
   const [country, setCountry] = useState("");
   const [position, setPosition] = useState("");
   const [wage, setWage] = useState(0);
   const [employeeList,setEmployeeList]=useState([]);
   const [newWage,setNewWage]=useState(0);
   const [newPosition,setNewPosition]=useState("");

   const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("done")




      // setEmployeeList([
      //   ...employeeList,
      //   {
      //     name: name,
      //     age: age,
      //     country: country,
      //     position: position,
      //     wage: wage,
      //   },
      // ]);




    });
  };

   const getEmployees=()=>{
    Axios.get("http://localhost:3001/employees").then((response)=>{
      setEmployeeList(response.data);
      });
   }

   const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/updatewage", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const updateEmployeePosition = (id) => {
    Axios.put("http://localhost:3001/updateposition", { position: newPosition, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: newPosition,
                  wage: val.wage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="container">
      <div className="title"> Employee Management</div>
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Name </span>
            <input type="text" placeholder="Enter your name" required 
            onChange={(event)=>{
            setName(event.target.value);
          }}/>
          </div>
          <div className="input-box">
            <span className="details">Age</span>
            <input type="number" placeholder="Enter Age" required  
            onChange={(event)=>{
              setAge(event.target.value);
            }}/>
          </div>
          <div className="input-box">
            <span className="details">Country</span>
            <input type="text" placeholder="Enter your country" required
            onChange={(event)=>{
              setCountry(event.target.value);
            }}/>
          </div>
          <div className="input-box">
            <span className="details">Position </span>
            <input type="text" placeholder="Enter your posotion" required
            onChange={(event)=>{
              setPosition(event.target.value);
            }}/>
          </div>
          <div className="input-box">
            <span className="details">Wage</span>
            <input type="number" placeholder="Enter your wage" required
            onChange={(event)=>{
              setWage(event.target.value);
            }}/>
          </div>
         </div>
        <div className="divaddButton">
          <button className="addButton" onClick={addEmployee} type="submit">Add</button>
          
        </div>
        
        <div className="divaddButton">
      <button className="addButton" onClick={getEmployees}>
            Show All
          </button>
          </div>
     </form>
     
     
     
     {employeeList.map((val)=>{
       return( 
      
                <div className="employee">
          <div className="info">
       <h3> <b>Name:</b>{val.name}</h3>
       <h3><b> Age:</b>{val.age}</h3>
       <h3> <b>Country:</b>{val.country}</h3>
       <h3> <b>Position:</b>{val.position}</h3>
       <h3> <b>Wage:{val.wage}</b></h3>
        </div>
         <div className="update">

         

          <h3 id="two"><input className="upInput" type="text" placeholder="Enter new Position" onChange={(event)=>{
              setNewPosition(event.target.value);
            }}/><button id="new" onClick={()=>{updateEmployeePosition(val.id)}}>update</button>
           </h3>
        
          <h3 id="three"><input className="upInput" type="text" placeholder="Enter new Wage" onChange={(event)=>{
              setNewWage(event.target.value);
            }}/><button id="new" onClick={()=>{updateEmployeeWage(val.id)}}>update</button>
            </h3>
             
            
         </div>
            
            <button id="del" onClick={() => {deleteEmployee(val.id)}}>delete</button>
            

      </div>  
   
       ) 
      })} 
      
   </div>
   
        
  );
      } 
export default App;
