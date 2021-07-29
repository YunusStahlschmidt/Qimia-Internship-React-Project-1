import React from 'react'
import { Form } from 'react-bootstrap';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import ButtonMU from '../components/ButtonMU';
import CancelIcon from '@material-ui/icons/Cancel';


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

	const cancelEdit = () => {
		if (!value) return;
		setValue("");
		setIsEditing(false);
	}
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      { !isEditing ? 
		<div className="row p-1">
			<ButtonMU 
				className="col-xs-auto col-md-2 m-2" 
				icon={<AddBoxIcon />} 
				type="submit"
				text="Add"
			/>
		</div>
		:
		<div className="row p-1">
			<ButtonMU 
					className="col-xs-auto col-md-2 m-2" 
					icon={<SaveIcon />} 
					onClick={() => {handleSave()}}
					text="Save"
				/>
				<ButtonMU 
					className="col-xs-auto col-md-2 m-2" 
					icon={<CancelIcon />} 
					onClick={() => {cancelEdit()}}
					text="Cancel"
				/>
		</div>
      }
    </Form>
    );
}
