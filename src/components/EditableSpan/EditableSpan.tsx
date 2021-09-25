import React, {ChangeEvent, useState} from "react";
import s from "../../App.module.css";
import {TextField} from "@material-ui/core";

type EditableSpanType ={
    title: string
    editMode: boolean
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(true)
    let [title, setTitle] = useState("")

    const activateEditMode = () =>{
        setEditMode(false)
        setTitle(props.title)
    }
    const activateViewMode = () =>{
        setEditMode(true)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>{setTitle(e.currentTarget.value)}

    return editMode
        ? <span onDoubleClick={activateEditMode}>{props.title}</span>
        : <TextField variant={"outlined"} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
}
