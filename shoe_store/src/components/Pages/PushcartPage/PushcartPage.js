import React from 'react';
import { Formik, Field, Form } from 'formik';
import Banner from '../../Banner/Banner';
import Pushcart from '../../Pushcart/Pushcart';

/**
 * Компонен  рендерит страницу корзины
 */
export default function PushcartPage() {

    const validatePhone = (value) => {
        if (!value) { return " не введен номер" }
        else if (value.length !== 10) { return " неправильный формат номера" }
    };

    const validateAddress = (value) => {
        if (!value) { return " не введен адрес" }
    };

    const validateAgree = (value) => {
        if (!value) { return "Необходимо согласие с правилами доставки" }

    };



    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    <Pushcart />
                    <section className="order">
                        <h2 className="text-center">Оформить заказ</h2>
                        <div className="card" stylename="max-width: 30rem; margin: 0 auto;">
                            <Formik
                                initialValues={{ phone: '', address: '' }}
                                onSubmit={values => { console.log(values); }}>
                                {({ values,
                                    errors,
                                    touched }) => (
                                    <Form className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="phone">Телефон:
                                                {errors.phone && touched.phone && errors.phone}
                                            </label>
                                            <Field
                                                name="phone"
                                                value={values.phone}
                                                className="form-control"
                                                id="phone"
                                                placeholder="Ваш телефон"
                                                validate={validatePhone} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Адрес доставки:
                                                {errors.address && touched.address && errors.address}
                                            </label>
                                            <Field
                                                name="address"
                                                value={values.address}
                                                className="form-control"
                                                id="address"
                                                placeholder="Адрес доставки"
                                                validate={validateAddress} />
                                        </div>
                                        <div className="form-group form-check">
                                            <Field
                                                name="agree"
                                                type="checkbox"
                                                className="form-check-input"
                                                id="agreement"
                                                validate={validateAgree} />
                                            <label className="form-check-label" htmlFor="agreement">
                                                Согласен с правилами доставки
                                            </label>
                                        </div>
                                        <div className="form-group form-check">
                                            {errors.agree && touched.agree && errors.agree}
                                        </div>
                                        <button type="submit" className="btn btn-outline-secondary">
                                            Оформить
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </section>
                </div>
            </div >
        </main >
    )
};
