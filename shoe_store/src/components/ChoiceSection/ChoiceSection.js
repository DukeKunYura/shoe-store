import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/masterSlice';

/**
 * Компонент отвечает за выбор размера и количества товара
 */
export default function ChoiceSection(props) {

    const { item } = props;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(false);
    const [selectedClass, setSelectedClass] = useState("catalog-item-size");
    const [size, setSize] = useState(null)
    const [quantity, setQuantity] = useState(1);

    const handlerSelector = (size) => {
        if (selectedClass === "catalog-item-size") {
            setSelectedClass("catalog-item-size selected");
            setSize(size);
            setIsActive(true);
        } else {
            setSelectedClass("catalog-item-size")
            setIsActive(false)
        }
    };

    const handlerDecrease = () => { if (quantity >= 2) { setQuantity(quantity - 1) } };
    const handlerIncrease = () => { if (quantity < 10) { setQuantity(quantity + 1) } };

    const handlerAdder = () => {
        if (isActive) {
            dispatch(addToCart({
                id: item.id,
                title: item.title,
                size: size,
                quantity: quantity,
                price: item.price,
                sum: item.price * quantity
            }));
            navigate("/cart.html");

        }
    };


    return (
        <>
            <div className="text-center">
                <p>Размеры в наличии:
                    {item.sizes.filter(size => size.avalible === true).map(item =>
                        <span className={selectedClass}
                            key={item.size}
                            onClick={() => { handlerSelector(item.size) }}>
                            {item.size}</span>)}
                </p>
                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary"
                        onClick={handlerDecrease}>-</button>
                    <span className="btn btn-outline-primary">{quantity}</span>
                    <button className="btn btn-secondary"
                        onClick={handlerIncrease}>+</button>
                </span>
                </p>
            </div>
            <button className="btn btn-danger btn-block btn-lg"
                onClick={handlerAdder}>В корзину</button>
        </>
    )
}
