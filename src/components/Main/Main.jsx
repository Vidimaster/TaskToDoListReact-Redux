import s from "../Main/Main.module.css";
import { Item } from "../Item/Item";
import { addItem } from '../../redux/slices/EditSlice';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { setDisplayList } from '../../redux/slices/EditSlice';
import { ListState } from '../../data/typescrypt.ts';
import { selectAcitveListLenght } from '../../redux/slices/EditSlice.jsx'
import { useSelector } from 'react-redux';
import { selectMode } from '../../redux/slices/EditSlice.jsx'
import { deleteItemAll } from '../../redux/slices/EditSlice';

export const Main = ({ prop }) => {
    const dispatch = useDispatch();
    const list_lenght = useSelector(selectAcitveListLenght);
    const mode = useSelector(selectMode);
    const [formInput, setFormInput] = useState("");

    function AddNewItem() {
        dispatch(addItem(formInput))
        setFormInput("")
    }

    const handleClick = () => {
        if (formInput !== "") {
            AddNewItem()
            if (mode === 'INACTIVE') {
                dispatch(setDisplayList(ListState.show_active))
            }
        } else {
            //error empty input string
        }
    };


    const handleInputChange = (event) => {

        if (formInput.length <= 300) {
            const value = event.target.value;
            setFormInput(value);
        } else {
            //error string too long
        }
    };

    return (


        <div className={s.container}>
            <h1 className={s.title}>
                TODO List
            </h1>

            <legend></legend>

            <div className={s.item_input}>
                <button className={s.arrow_button} type="button" value="Add" onClick={() => {
                    handleClick()
                }} >
                    <svg width="24" height="16" viewBox="0 -2 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <input className={s.item_input_textfield} type="text" value={formInput} placeholder="What needs to be done?" onChange={handleInputChange} />
            </div>

            <Item prop={prop} />

            <div className={s.tab_container}>
                <p className={s.item_left}>Items left: {list_lenght}</p>

                <div className={s.tab_container_center}>
                    <button className={mode === 'ALL' ? s.just_button_pressed : s.just_button} type="button" onClick={() => {

                        dispatch(setDisplayList(ListState.show_all))
                    }}>All</button>
                    <button className={mode === 'ACTIVE' ? s.just_button_pressed : s.just_button} type="button" onClick={() => {

                        dispatch(setDisplayList(ListState.show_active))
                    }}>Active</button>
                    <button className={mode === 'INACTIVE' ? s.just_button_pressed : s.just_button} type="button" onClick={() => {

                        dispatch(setDisplayList(ListState.show_inactive))
                    }}>Completed</button>

                </div>
                <p className={s.item_right} onClick={() => {

                    dispatch(deleteItemAll())
                }}>Clear completed</p>
            </div>

        </div>

    );
};