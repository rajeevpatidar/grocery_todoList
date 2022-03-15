import React from "react";
import {FaEdit,FaTrash} from "react-icons/fa"
import "./List.css"
// import FaRegEdit from  "@react-icons/all-files/fa/FaRegEdit";
const List = ({items,removeItem,editItem})=>{
    return (
        <div className="grocery-list">
            {
                items.map((item)=>{
                    const {id,title} = item;
                    return <article key={id} className='grocery-item'>
                        <p className="title">{title}</p>
                        <div className="btn-box">
                            <button onClick={()=>editItem(id)} ><FaEdit/></button>
                            <button onClick={()=>removeItem(id)}><FaTrash/></button>
                        </div>
                    </article>
                })
            }
        </div>
    )
}
export default List