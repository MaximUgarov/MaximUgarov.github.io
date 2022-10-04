import { useState } from "react";
import { replaceNumber } from "../../helpers/replaceNumber";
import SubmitButton from "./components/button";
import SlideField from "./components/slideField";



export default function Calculator() {

    const [isSubmiting, setSubmiting] = useState<boolean>(false)
    const [data, setData] = useState({ price: 3300000, initial: 13, months: 60 })
    const { price, initial, months } = data

    function handlerPrice(price: number): void {
        setData({ ...data, price })
    }

    function handlerInitial(initial: number): void {
        setData({ ...data, initial: parseFloat(((initial / price) * 100).toFixed()) })
    }

    function handlerMonths(months: number): void {
        setData({ ...data, months })
    }

    function onSubmit() {
        setSubmiting(true)
        fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, monthPay, amountPay }),
        }).finally(() => setSubmiting(false))
    }

    const initialPay = (initial / 100) * price
    const monthPay = (price - initialPay) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months - 1)));
    const amountPay = initial + (months * monthPay)

    return <div className="calculator-wrapper">
        <div className="calculator-container">
            <h4 className="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h4>
            <div className="calculator-container-content-input">
                <div className="content-input__item">
                    <div className="entry">
                        <div className="entry__title">
                            <span>Стоимость автомобиля</span>
                        </div>
                        <SlideField
                            value={price}
                            setValue={(e) => handlerPrice(e)}
                            minValue={1000000}
                            maxValue={6000000}
                            disabled={isSubmiting}
                        >₽</SlideField>
                    </div>
                </div>
                <div className="content-input__item">
                    <div className="entry">
                        <div className="entry__title">
                            <span>Первоначальный взнос</span>
                        </div>
                        <SlideField
                            value={initialPay}
                            setValue={(e) => handlerInitial(e)}
                            minValue={(10 / 100) * price}
                            maxValue={(60 / 100) * price}
                            disabled={isSubmiting}
                        ><div className="entry__icon">{initial}%</div>
                        </SlideField>
                    </div>
                </div>
                <div className="content-input__item">
                    <div className="entry">
                        <div className="entry__title">
                            <span>Срок лизинга</span>
                        </div>
                        <SlideField
                            value={months}
                            setValue={(e) => handlerMonths(e)}
                            minValue={1}
                            maxValue={60}
                            disabled={isSubmiting}
                        >мес.</SlideField>
                    </div>
                </div>
            </div>
            <div className="calculator-container-content-result">
                <div className="content-result__container">
                    <div className="result">
                        <span className="entry__title">Сумма договора лизинга</span>
                        <span className="result__data">{replaceNumber(amountPay.toFixed())} ₽</span>
                    </div>
                    <div className="result">
                        <span className="entry__title">Ежемесячный платеж от</span>
                        <span className="result__data">{replaceNumber(monthPay.toFixed())} ₽</span>
                    </div>
                </div>
                <SubmitButton isLoading={isSubmiting} onClick={onSubmit}>
                    Оставить заявку
                </SubmitButton>
            </div>
        </div>
    </div>
}