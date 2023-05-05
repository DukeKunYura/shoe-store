import React from 'react';
import useAsyncWithUrl from '../../../hooks/useAsyncWithUrl';
import sendRequest from '../../../api/sendRequest'
import { useParams } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';
import ChoiceSection from '../../ChoiceSection/ChoiceSection';

/**
 * Компонент отвечает за страницу товара
 */
export default function ProductPage() {

    const params = useParams();

    const { status, value, error } = useAsyncWithUrl(
        sendRequest,
        `http://localhost:7070/api/items/${params.id}`,
        true);

    error && console.log(error);


    return (
        <>
            {status === "pending" && <Preloader />}
            {status === "success" &&
                <main className="container">
                    <div className="row">
                        <section className="catalog-item">
                            <h2 className="text-center">{value.title && value.title}</h2>
                            <div className="row">
                                <div className="col-5">
                                    <img src={value.images[0] && value.images[0]}
                                        className="img-fluid" alt={value.title && value.title} />
                                </div>
                                <div className="col-7">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>Артикул</td>
                                                <td>{value.sku && value.sku}</td>
                                            </tr>
                                            <tr>
                                                <td>Производитель</td>
                                                <td>{value.manufacturer && value.manufacturer}</td>
                                            </tr>
                                            <tr>
                                                <td>Цвет</td>
                                                <td>{value.color && value.color}</td>
                                            </tr>
                                            <tr>
                                                <td>Материалы</td>
                                                <td>{value.material && value.material}</td>
                                            </tr>
                                            <tr>
                                                <td>Сезон</td>
                                                <td>{value.season && value.season}</td>
                                            </tr>
                                            <tr>
                                                <td>Повод</td>
                                                <td>{value.reason && value.reason}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <ChoiceSection item={value} />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>}

        </>
    )
}
