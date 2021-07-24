import React, {useState} from 'react'
import Todo from './Todo';
import FormTodo from './FormTodo';
import { Card } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SummaryItem from './SummaryItem';
import styles from '../App.css';

export default function TaskList() {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("");
    const [indexOfEdit, setIndexOfEdit] = useState();
    const [showSummary, setShowSummary] = useState(false);
    const [itemsDoneCount, setItemsDoneCount] = useState(0);

    const [todos, setTodos] = useState([
        {
            text: "This is a sampe todo",
            isDone: false
        }
    ]);

    const clearAll = () => {
        const newTodos = [...todos];
        newTodos.forEach((element) => {
            element.isDone = false;
        });
        setItemsDoneCount(0);
        setTodos(newTodos);
    };

    const removeAll = () => {
        setItemsDoneCount(0);
        setTodos([]);
    };

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const markTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isDone = !newTodos[index].isDone;
        newTodos[index].isDone ? setItemsDoneCount(itemsDoneCount+1) : setItemsDoneCount(itemsDoneCount-1);
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setItemsDoneCount(0);
        setTodos(newTodos);
    };

    const saveEditTodo = () => {
        const newTodos = [...todos];
        newTodos[indexOfEdit].text = value;
        setTodos(newTodos);
    };


    return (
        <div className="container">
            { !showSummary ? 
                <div>
                    <h1 className="text-center m-4">Todo List</h1>
                    <FormTodo 
                        addTodo={addTodo} 
                        isEditing={isEditing} 
                        setIsEditing={setIsEditing}
                        value={value}
                        setValue={setValue}
                        saveEditTodo={saveEditTodo}
                    />
                    <div>
                        <p className="mt-4">[{itemsDoneCount} of {todos.length} items completed]</p>
                    </div>
                    <div>
                    {todos.map((todo, index) => (
                        <Card>
                        <Card.Body>
                            <Todo
                            key={index}
                            index={index}
                            todo={todo}
                            markTodo={markTodo}
                            removeTodo={removeTodo}
                            setIsEditing={setIsEditing}
                            setValue={setValue}
                            setIndexOfEdit={setIndexOfEdit}
                            />
                        </Card.Body>
                        </Card>
                    ))}
                    </div>
                    <div className="row justify-content-md-center mt-2">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="col col-2 m-2"
                            startIcon={<DeleteSweepIcon />}
                            onClick={() => {clearAll()}}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="col col-2 m-2"
                            startIcon={<RemoveCircleIcon />}
                            onClick={() => {removeAll()}}
                        >
                            Remove All
                        </Button>
                    </div>
                    <div className="row justify-content-md-center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="col col-2 mt-2"
                            startIcon={<AssessmentIcon />}
                            onClick={() => {setShowSummary(true)}}
                        >
                            Summary
                        </Button>
                    </div>
                </div>
            :
                <div>
                    <h1 className="text-center m-4">Summary</h1>
                    <p className="mb-3">List of items completed:</p>
                    <div>
                    {todos.map((todo, index) => {
                        if (todo.isDone) 
                            return <Card>
                            <Card.Body>
                                <SummaryItem
                                key={index}
                                index={index}
                                todo={todo}
                                />
                            </Card.Body>
                            </Card>
                        else
                            return <div></div>     
                    })}
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="mt-4"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => {setShowSummary(false)}}
                        >
                            Back
                        </Button>
                    </div>
                </div>
        }
        </div>
    )
}
