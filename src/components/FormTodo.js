import React, {useState} from 'react'
import { Card, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';


export default function FormTodo({ addTodo, isEditing, setIsEditing, value, setValue, saveEditTodo }) {
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

    const handleSave = () => {
      if (!value) return;
      saveEditTodo();
      setValue("");
      setIsEditing(false);
    }
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      { !isEditing ? 
      <Button
        variant="contained"
        color="primary"
        size="large"
        // className={classes.button}
        startIcon={<AddBoxIcon />}
        type="submit"
      >
        Add
      </Button>
      :
      <Button
        variant="contained"
        color="primary"
        size="large"
        // className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => {handleSave()}}
      >
        Save
      </Button>
      }
    </Form>
    );
}
