import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./App.module.css";

export type FilterValuesType = "all" | "active" | "completed";
type InputType = {
    addTask: (title:string) => void
}
export const Input = (props: InputType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null> (null);

    const addTask = () => {
        if(title.trim() !== ""){
            props.addTask(title);
            setTitle("");
        }else{
            setError("Title not input");
        }

    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("");
        if (event.charCode===13) {addTask();}
    };
    const errorClas = s.error_message;
    return <div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        <div className={errorClas}>{error}</div>
    </div>
}