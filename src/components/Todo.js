import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


export default function Todo({ todo, index, markTodo, removeTodo, setIsEditing, setValue, setIndexOfEdit }) {

    const editTodo = () => {
        setIndexOfEdit(index);
        setValue(todo.text);
        setIsEditing(true);
    }

    return (
        <div className="row justify-content-between">
            <div className="col-sm-auto">
                <Checkbox checked={ todo.isDone ? true : false } color="primary" onChange={() => markTodo(index)} />
                <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{index+1}. {todo.text}</span>
            </div>
            <div className="col-sm-auto">
                <IconButton aria-label="edit" color="primary" onClick={() => editTodo()}>
                    <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => removeTodo(index)}>
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        </div>
    )
}