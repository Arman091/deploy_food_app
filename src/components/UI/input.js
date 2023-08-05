import classes from './input.module.css'
import { forwardRef } from 'react';
const Input = (props,ref )=> {

    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} ref={ref} />
    </div>
}

export default forwardRef(Input);