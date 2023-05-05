import React from 'react';
import useAsyncWithUrl from '../../hooks/useAsyncWithUrl';
import sendRequest from '../../api/sendRequest';
import Preloader from '../Preloader/Preloader';
import OrderButton from '../OrderButton/OrderButton';

/**
 * Компонент отправляет fetch-запрос и рендерит "Хиты продаж"
 */
export default function TopSales() {

    const { status, value, error } = useAsyncWithUrl(
        sendRequest,
        'http://localhost:7070/api/top-sales',
        true);

    error && console.log(error);

    return (
        <>
            {status === "success"
                ? <section className="top-sales">
                    <h2 className="text-center">Хиты продаж!</h2>
                    <div className="row">
                        {value.map(value =>
                            <div className="col-4" key={value.id}>
                                <div className="card">
                                    <img src={value.images[0]}
                                        className="card-img-top img-fluid" alt={value.title} />
                                    <div className="card-body">
                                        <p className="card-text">{value.title}</p>
                                        <p className="card-text">{value.price}</p>
                                        <OrderButton id={value.id} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                :
                status === "pending"
                    ?
                    <Preloader title="Хиты продаж!" />
                    : null}

        </>
    )
}
