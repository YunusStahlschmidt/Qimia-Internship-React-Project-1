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

export default function TaskList() {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("");
    const [indexOfEdit, setIndexOfEdit] = useState();
    const [showSummary, setShowSummary] = useState(false)

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
        setTodos(newTodos);
    };

    const removeAll = () => {
        setTodos([]);
    };

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const markTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isDone = !newTodos[index].isDone;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const saveEditTodo = () => {
        const newTodos = [...todos];
        newTodos[indexOfEdit].text = value;
        setTodos(newTodos);
    };

    const showSummaryItems = () => {
        todos.forEach((element) => {
            console.log(element.isDone);
            
            if (!element.isDone){
                return (
                    <Card>
                    <Card.Body>
                        <Todo
                        key={element.index}
                        index={element.index}
                        todo={element}
                        // markTodo={markTodo}
                        // removeTodo={removeTodo}
                        // setIsEditing={setIsEditing}
                        // setValue={setValue}
                        // setIndexOfEdit={setIndexOfEdit}
                        />
                    </Card.Body>
                    </Card>
                )
            }
        });
    }

    return (
        <div className="container">
            { !showSummary ? 
                <div>
                    <h1 className="text-center mb-4">Todo List</h1>
                    <FormTodo 
                        addTodo={addTodo} 
                        isEditing={isEditing} 
                        setIsEditing={setIsEditing}
                        value={value}
                        setValue={setValue}
                        saveEditTodo={saveEditTodo}
                    />
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
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            // className={classes.button}
                            startIcon={<DeleteSweepIcon />}
                            onClick={() => {clearAll()}}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            // className={classes.button}
                            startIcon={<RemoveCircleIcon />}
                            onClick={() => {removeAll()}}
                        >
                            Remove All
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            // className={classes.button}
                            startIcon={<AssessmentIcon />}
                            onClick={() => {setShowSummary(true)}}
                        >
                            Summary
                        </Button>
                    </div>
                </div>
            :
                <div>
                    <h1 className="text-center mb-4">Summary</h1>
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
                            // className={classes.button}
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
