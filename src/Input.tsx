import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import {FilterValuesType} from "./App";
import { PropsType } from "./Todolist";
export type FilterValuesType = "all" | "active" | "completed";
type InputType = {
    addTask: (title:string) => void
}
export const Input = (props: InputType) => {
    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode===13) {addTask();}
    };

    return <div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
    </div>
}