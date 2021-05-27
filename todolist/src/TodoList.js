import React, { Component } from 'react';
import ItemList from "./ItemList"
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import "./TodoList.css"


class TodoList extends Component{
    
    constructor(props){
        super(props);
        let todo_tasks = [];
        this.state = {
            itemsState : todo_tasks
        };
        this.lastID = 0;
        
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);

        fetch("//192.168.1.5:8080/get_items").then((response)=>{
            
            response.json().then((data) =>{

               data.forEach(item =>{
                   console.log(item);
                   this.state.itemsState.push({
                       id: item.id,
                       item_name: item.item_name
                   })
               })

            this.setState({
                itemsState: this.state.itemsState
            });

            this.lastID = data[data.length - 1].id;
        });
        })
    }
    
    removeItem(id_item){
        

        console.log("Borrado " + id_item);

         for(let i = 0; i< this.state.itemsState.length; i++){

             if(this.state.itemsState[i].id === id_item){

                let itemToDelete = this.state.itemsState[i];
                
                 fetch("//192.168.1.5:8080/remove",{
                method: "POST",
                headers:{
                    'Content-type' : "text/json"
                },
                body: JSON.stringify(itemToDelete)
                })

                 this.state.itemsState.splice(i,1);
                 break;
             }
         }

         this.setState({
             itemsState:this.state.itemsState
         });
    }
    
    addItem(e){
        e.preventDefault();
        
        this.lastID++;
        let textValue = document.getElementById("text").value;
        
        if(textValue !== ""){
            this.state.itemsState.push({id:this.lastID,item_name:textValue});
            this.setState({
                itemsState: this.state.itemsState
            });
            
            console.log(textValue);
            fetch("//192.168.1.5:8080/submit",{
                method: "POST",
                headers:{
                    'Content-type' : "text/json"
                },
                body: JSON.stringify({
                    id: this.lastID,
                    item_name:textValue
                })
            });
            document.getElementById("text").value ="";
            document.getElementById("text").focus();
        }
    }
    render(){
        
        let lista = this.state.itemsState.map((todoItem) => {
            return (<ItemList item={todoItem.item_name} 
                id_item={todoItem.id}
                parentRemove={this.removeItem}/>)
        });

        return(
            <div className="Lista">
                <h1>LA LISTICA</h1>
                <div className="Contenido">
                    <form onSubmit={this.addItem}>
                        <p><TextField label="Nueva tarea" color="secondary" size="medium" id="standard-full-width" autoComplete="off" margin="normal" variant="outlined" type="text" id="text"/></p>
												
                        <p><Button variant="contained" color="secondary" type="Submit" aria-label="add" > AÑADIR </Button></p>
                    </form>
                    <ul id="doList">
                        {lista}
                    </ul>
                </div>
            </div>
        )         
    }
}

export default TodoList;
