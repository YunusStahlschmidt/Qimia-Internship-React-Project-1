import React from 'react';
import Button from '@material-ui/core/Button';


export default function ButtonMU(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={props.className}
            startIcon={props.icon}
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
        </Button>
    )
}
