import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch, setCheckedCategories } from '../../../redux/masterSlice';
import Banner from '../../Banner/Banner';
import Catalog from '../../Catalog/Catalog';
import Search from '../../Search/Search';
/**
 * Компонент рендерит страницу "Каталог"
 */
export default function CatalogPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearch(""));
            dispatch(setCheckedCategories(""))
        }
    }, [dispatch]);

    return (
        <main className="container" >
            <div className="row">
                <div className="col">
                    <Banner />
                    <Catalog>
                        <Search />
                    </Catalog>
                </div>
            </div>
        </main>
    )
}
