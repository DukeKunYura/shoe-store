import React from 'react';
import Banner from '../../Banner/Banner';
import TopSales from '../../TopSales/TopSales';
import Catalog from '../../Catalog/Catalog';


/**
 * Компонент рендерит главную страницу магазина
 */
export default function MainPage() {

    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    <TopSales />
                    <Catalog />
                </div>
            </div>
        </main>
    )
}
