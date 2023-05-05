import React from 'react';
import { useSelector } from 'react-redux';
import useAsyncWithUrl from '../../hooks/useAsyncWithUrl';
import sendRequest from '../../api/sendRequest';
import CatalogCategories from '../CatalogCategories/CatalogCategories';
import DownloadMore from '../DownloadMore/DownloadMore';
import Preloader from '../Preloader/Preloader';
import OrderButton from '../OrderButton/OrderButton';

/**
 * Компонент отправляет fetch-запрос и рендерит каталог
 */
export default function Catalog(props) {

    const state = useSelector((state) => state.master);

    const { status, value, error } = useAsyncWithUrl(
        sendRequest,
        state.url,
        true);

    error && console.log(error);

    return (
        <>
            {status === "success" &&
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    {props.children}
                    <CatalogCategories />
                    <div className="row">
                        {value.map(value =>
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
                    <DownloadMore checked={state.checkedCategories} categoriesUrl={state.url} />
                </section>}
            {status === "pending" && <Preloader title="Каталог" />}

        </>

    )
}
