import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../../App.module.css";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null> (null);

    const addItem = () => {
        if(title.trim() !== ""){
            props.addItem(title);
            setTitle("");
        }else{
            setError("Title is required");
        }

    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode===13) {addItem();}
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
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
}
