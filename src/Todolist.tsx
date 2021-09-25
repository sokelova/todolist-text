import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./Input";
import { Input } from './Input';
import s from "./App.module.css";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id:string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id:string, newTitle: string, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => { props.changeFilter("all", props.id);};
    const onActiveClickHandler = () => { props.changeFilter("active", props.id);};
    const onCompletedClickHandler = () => { props.changeFilter("completed", props.id);};
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <Grid container>
            <h3>{props.title}</h3>
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </Grid>
        <div>
            <Input id={props.id} addTask={props.addTask}/>
        </div>
        <div>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <div key={t.id} className={t.isDone ? s.isDone_executed : ""}>
                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone} color={"primary"}/>
                        <EditableSpan title={t.title} editMode={true} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={ onAllClickHandler } color={"default"}>All</Button>
            <Button variant={props.filter === "active" ? "contained" : "text"} onClick={ onActiveClickHandler } color={"primary"}>Active</Button>
            <Button variant={props.filter === "completed" ? "contained" : "text"} onClick={ onCompletedClickHandler } color={"secondary"}>Completed</Button>
        </div>
    </div>
}
