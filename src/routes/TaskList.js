import React, {useState} from 'react'
import Todo from '../components/Todo';
import FormTodo from '../components/FormTodo';
import SummaryItem from '../components/SummaryItem';
import ButtonMU from '../components/ButtonMU';
import { Card } from 'react-bootstrap';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '../App.css';
import { useAlert } from "react-alert";


export default function TaskList() {
    const alert = useAlert();
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
        alert.show("Are you sure you want to clear all task?", {
            actions: [
                {
                    copy: "Confirm",
                    onClick: () => {
                        const newTodos = [...todos];
                        newTodos.forEach((element) => {
                            element.isDone = false;
                        });
                        setItemsDoneCount(0);
                        setTodos(newTodos);
                    },
                }
            ],
            closeCopy: "Cancel"
        });
    };

    const removeAll = () => {
        alert.show("Are you sure you want to remove all task?", {
          actions: [
            {
                copy: "Confirm",
                onClick: () => {
                    setItemsDoneCount(0);
                    setTodos([]);
                },
            }
          ],
          closeCopy: "Cancel"
        });
    }

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
        alert.show("Are you sure you want to delete this task?", {
          actions: [
            {
                copy: "Confirm",
                onClick: () => {
                    const newTodos = [...todos];
                    if (newTodos[index].isDone) {setItemsDoneCount(itemsDoneCount-1)}
                    newTodos.splice(index, 1);
                    setTodos(newTodos);
                },
            }
          ],
          closeCopy: "Cancel"
        });
    }

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
                        <p>[{itemsDoneCount} of {todos.length} items completed]</p>
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
                        <ButtonMU 
                            className="col-2 m-2" 
                            icon={<DeleteSweepIcon />} 
                            onClick={() => {clearAll()}}
                            text="Clear All"
                        />
                        <ButtonMU 
                            className="col-2 m-2" 
                            icon={<RemoveCircleIcon />} 
                            onClick={() => {removeAll()}}
                            text="Remove All"
                        />
                    </div>
                    <div className="row justify-content-md-center">
                        <ButtonMU 
                            className="col-2 mt-2" 
                            icon={<AssessmentIcon />} 
                            onClick={() => {setShowSummary(true)}}
                            text="Summary"
                        />
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
                        <ButtonMU 
                            className="mt-4" 
                            icon={<ArrowBackIcon />} 
                            onClick={() => {setShowSummary(false)}}
                            text="Back"
                        />
                    </div>
                </div>
        }
        </div>
    )
}
