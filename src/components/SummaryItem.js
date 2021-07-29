import React from 'react'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


export default function SummaryItem({ todo, index }) {

    return (
        <div className="row justify-content-between">
            <div className="col-sm-auto">
                <span>{index+1}. {todo.text} </span>
            </div>
            <div className="col-sm-auto">
                <AssignmentTurnedInIcon color="primary"/> 
            </div>
        </div>
    )
}