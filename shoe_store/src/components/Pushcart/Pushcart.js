import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart } from '../../redux/masterSlice';

/**
 * Компонент отвечает за работу корзины
 */
export default function Pushcart() {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    return (
        <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Итого</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cart !== [] && state.cart.map(item =>
                        <tr key={item.id}>
                            <th scope="row"></th>
                            <td><a href="/products/1.html">{item.title}</a></td>
                            <td>{item.size}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.sum}</td>
                            <td><button className="btn btn-outline-danger btn-sm"
                                onClick={() => { dispatch(deleteFromCart({ id: item.id, sum: item.sum })) }}>
                                Удалить
                            </button></td>
                        </tr>

                    )}
                    <tr>
                        <td colSpan="5" className="text-right">Общая стоимость</td>
                        <td>{state.sumPrice}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
};
