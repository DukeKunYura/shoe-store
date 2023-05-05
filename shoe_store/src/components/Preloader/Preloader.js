import React from 'react'

/**
 * Компонент рендерит лоадер с заголовоком (если необходим)
 */
export default function Preloader(props) {

    const { title } = props;

    return (
        <section className="top-sales">
            <h2 className="text-center">{title}</h2>
            <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
    )
}
