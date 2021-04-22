import React, { Component } from 'react';
import ItemList from './Item.js';

class TodoList extends Component{



 constructor (props) {
 
		super(props);

	 	this.state = {
			items : []
		};
	 	this.last_id = 0;
		
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);

	}
	
	addItem (e) {
		e.preventDefault();

	 	let text_v = document.getElementById("text-task").value;
		
		this.state.items.push({id:this.last_id, item:text_v});

		this.last_id++;

		this.setState({
			items: this.state.items
		});
	}

	removeItem (id_item) {
		console.log("Remove del parent "+id_item);
		for(let i=0; i<this.state.items.length; i++){
						if(this.state.items[i].id === id_item){
						this.state.items.splice(i, 1);
						break;
						}
			}

			this.setState({
				items: this.state.items
			});
	}
	render(){

		let lista = this.state.items.map((todo_item) => {
			return (<ItemList item={todo_item.item} 
							parentRemove={this.removeItem} 
							id_item={todo_item.id}/>);
		});

		return (
		<div className = "todoList">
			<h1>TODO LIST WITH CSS</h1>
			<ul>
				{lista}
			</ul>
			<form onSubmit={this.addItem}>
				<p><input type="text" id="text-task"/></p>
				<p><button type="submit">Añadir</button></p>
			</form>
		</div>
		);
	}
}

export default TodoList;
