import React from 'react';
import sendRequest from '../../api/sendRequest';
import useAsyncWithUrl from '../../hooks/useAsyncWithUrl';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedCategories } from '../../redux/masterSlice';

/**
 * Компонент отправляет fetch-запрос и рендерит меню категорий
 */
export default function CatalogCategories() {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const { status, value, error } = useAsyncWithUrl(
        sendRequest,
        'http://localhost:7070/api/categories',
        true);

    error && console.log(error);

    return (
        <>
            {status === "success" &&
                <ul className="catalog-categories nav justify-content-center" id='linkCategories'>
                    <li className="nav-item">
                        <a className={state.checkedCategories === "" ? "nav-link active" : "nav-link"} href="#linkCategories"
                            onClick={() => { dispatch(setCheckedCategories("")) }}>Все</a>
                    </li>
                    {value.map(value =>
                        <li className="nav-item" key={value.id}>
                            <a className={state.checkedCategories === value.id ? 'nav-link active' : "nav-link"} href="#linkCategories"
                                onClick={() => { dispatch(setCheckedCategories(value.id)) }}>{value.title}</a>
                        </li>
                    )}
                </ul>
            }
        </>

    )
}
