import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент рендерит кнопку для перехода к странице товара
 */
export default function OrderButton(props) {

    const { id } = props

    const navigate = useNavigate();

    const handlerClickOrder = (id) => { navigate(`/catalog/${id}`) };

    return (
        <a href="/products/1.html" className="btn btn-outline-primary"
            onClick={(e) => { e.preventDefault(); handlerClickOrder(id) }}
        >Заказать</a>
    )
}
