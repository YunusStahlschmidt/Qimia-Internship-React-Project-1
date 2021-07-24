import React from 'react'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


export default function SummaryItem({ todo, index }) {

    return (
        <div className="summary-item">
            <span>{index+1}. {todo.text} <AssignmentTurnedInIcon color="primary"/> </span>
        </div>
    )
}