import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncWithUrl from '../../hooks/useAsyncWithUrl';
import sendRequest from '../../api/sendRequest';
import Preloader from '../Preloader/Preloader';
import OrderButton from '../OrderButton/OrderButton';

/**
 * Компонент отправляет fetch-запрос при нажатии кнопки 
 * "загрузить еще", и рисует продолжение каталога
 */
export default function DownloadMore(props) {

    const { checked, categoriesUrl } = props;

    const state = useSelector((state) => state.master);

    const [addedCards, setAddedCards] = useState([]);
    const [offsetCount, setOffsetCount] = useState(6);
    const [isActiveAdder, setIsActiveAdder] = useState(true);

    const url = `${checked === "" && state.search === ""
        ? categoriesUrl + "?" : categoriesUrl + "&"}offset=${offsetCount}`;

    const { execute, status, value, error } = useAsyncWithUrl(
        sendRequest,
        url,
        false);

    error && console.log(error);

    const handlerDownload = () => {
        execute();
        setIsActiveAdder(false)
    };

    const buttonMore =
        <div className="text-center">
            <button className="btn btn-outline-primary"
                onClick={handlerDownload}>Загрузить ещё</button>
        </div>;

    useEffect(() => {
        if (value) {
            let newArr = addedCards.concat(value);
            setAddedCards(newArr);
            setOffsetCount(offsetCount + 6)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <>
            {status === "pending" && <Preloader />}
            {status !== "pending" &&

                addedCards.length > 0
                ?
                <>
                    <div className="row">
                        {addedCards.map(value =>
                            <div className="col-4" key={value.id}>
                                <div className="card catalog-item-card">
                                    <img src={value.images[0]}
                                        className="card-img-top img-fluid" alt={value.title} />
                                    <div className="card-body">
                                        <p className="card-text">{value.title}</p>
                                        <p className="card-text">{value.price}</p>
                                        <OrderButton id={value.id} />
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    {!(value === null || value.length < 6) && buttonMore}
                </>
                :
                isActiveAdder && buttonMore
            }

        </>
    )
};
