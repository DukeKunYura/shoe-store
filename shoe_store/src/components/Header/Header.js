import React from 'react';
import logo from '../../img/header-logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckedCategories, setClassHeaderSearch, setSearch } from '../../redux/masterSlice';

/**
 * Компонент отвечает за навигационное меню
 */
export default function Header() {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handlerClickSearch = (e) => {
        e.preventDefault();

        if (state.search !== "") { navigate("/catalog.html") };
        dispatch(setClassHeaderSearch());
        dispatch(setCheckedCategories(state.checkedCategories));

    };


    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink className="navbar-brand" end={true} to="/">
                            <img src={logo} alt="Bosa Noga" />
                        </NavLink>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" end={true} to="/">Главная</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/catalog.html">Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about.html">О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contacts.html">Контакты</NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search"
                                        onClick={(e) => { handlerClickSearch(e) }}></div>
                                    <div className="header-controls-pic header-controls-cart"
                                        onClick={() => { navigate("/cart.html") }}>
                                        <div className={state.cart.length > 0 ? "header-controls-cart-full" : "header-controls-cart"}>
                                            {state.cart.length > 0 && state.cart.length}</div>
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                </div>
                                <form data-id="search-form" className={state.classHeaderSearch}
                                >
                                    <input className="form-control" placeholder="Поиск"
                                        value={state.search}
                                        onChange={(e) => { dispatch(setSearch(e.target.value)) }} />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>


    )
}
