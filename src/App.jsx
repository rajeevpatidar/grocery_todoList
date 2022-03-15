import React, { useEffect, useState } from "react"
import List from "./List";
import Alert from "./Alert";
import "./App.css";
const getLocalStorage=()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
}
const App=()=>{
  const [name,setName] = useState("");
  const [list,setList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false); 
  const [editId,setEditId] = useState(null);
  const [alert,setAlert] = useState({show:true,msg:"",type:""})
  const changeHandle =(e)=>{
    e.preventDefault();
    if(!name){
      // display alert
      showAlert(true,"Please Enter Value","danger");
    }
    else if(name && isEditing){
      // dela with edit
      setList(list.map((item)=>{
        if(item.id===editId){
          return {...item,title:name}
        }
        return item
      }))
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true,"Value changed","success");
    }
    else{
      showAlert(true,"Successfully Changed","success")
      const newItem = {id:new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('');
    }
  }
  const showAlert =(show=false,msg="",type="")=>{
    setAlert({show,msg,type});
  }
  const changingInput=(e)=>{
    setName(e.target.value)
  }
  const removeItem=(id)=>{
    showAlert(true,"Value Removed","danger");
    setList(list.filter((item)=>item.id!==id))
  }
  const editItem=(id)=>{
    const specificItem = list.find((item)=>item.id===id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list));
  },[list]);
  return(
    <section className="section-center">
      <form className="grocery-from" onSubmit={changeHandle}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h1>Grocery Bud</h1>
        <div className="form-control">
          <input type="text" className="grocery-input" 
          value={name}
          onChange={changingInput}/>
            <button type="submit" className="sub-btn">Submit</button>
          </div>
        </form>
        {list.length>0 && (
      <div className="grocery-container">
        <List items = {list} removeItem={removeItem} editItem={editItem}  />
        <button className="clear-btn" onClick={()=>{
          showAlert(true,"Empty list","danger")
          setList([]);
        }}>
          Clear Items</button>
        </div>
        )}
    </section>
  )
}
export default App