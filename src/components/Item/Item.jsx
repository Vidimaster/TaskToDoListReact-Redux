import { useDispatch } from "react-redux";
import s from "./Item.module.css";
import { toggleItem } from '../../redux/slices/EditSlice';

import { useSelector } from 'react-redux';
import { selectItems } from '../../redux/slices/EditSlice.jsx'
import { selectMode } from '../../redux/slices/EditSlice.jsx'

export const Item = ({ prop }) => {
    const dispatch = useDispatch();
    const itms = useSelector(selectItems);
    const mode = useSelector(selectMode);

    return (
        <>

            {
                {
                    "ALL": itms.items.map((value) => {
                        return (
                            <div key={value.id} className={(value.state === 'active' ? s.item : s.item + ' ' + s.item_inactive)} onClick={() => {

                                dispatch(toggleItem(value.id))
                            }}>
                                <input type="checkbox" id={value.id} name={value.text} checked={value.state === 'active' ? false : true} />
                                <label for={value.text}>{value.text}</label>

                            </div>)
                    })


                    ,
                    "ACTIVE": itms.items.filter(value => value.state === "active").map((value) => {
                        return (
                            <div key={value.id} className={(s.item)} onClick={() => {

                                dispatch(toggleItem(value.id))
                            }}>
                                <input type="checkbox" id={value.id} name={value.text} checked={value.state === 'active' ? false : true} />
                                <label for={value.text}>{value.text}</label>

                            </div>
                        )
                    })
                    ,

                    "INACTIVE": itms.items.filter(value => value.state === "inactive").map((value) => {
                        return (
                            <div key={value.id} className={(s.item + ' ' + s.item_inactive)} onClick={() => {

                                dispatch(toggleItem(value.id))
                            }}>
                                <input type="checkbox" id={value.id} name={value.text} checked={value.state === 'active' ? false : true} />
                                <label for={value.text}>{value.text}</label>

                            </div>
                        )
                    }),
                }[mode]
            }

        </>

    );
};