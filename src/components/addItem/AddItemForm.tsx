import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../../App.module.css";

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
    const errorClas = s.error_message;
    return <div>
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? errorClas : ""}

        />
        <button onClick={addItem}>+</button>
        {error && <div className={errorClas}>{error}</div>}
    </div>
}
