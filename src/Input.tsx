import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./App.module.css";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
type InputType = {
    id: string
    addTask: (title:string, todolistId: string) => void
}
export const Input = (props: InputType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null> (null);

    const addTask = () => {
        if(title.trim() !== ""){
            props.addTask(title.trim(), props.id);
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
    return <div>
        <TextField
            value={title}
            variant={'outlined'}
            label={'Type value'}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask}>
            <ControlPoint />
        </IconButton>
    </div>
}
