import { useEffect, useRef } from "react"
import { replaceNumber } from "../../../helpers/replaceNumber"

type Props = {
    children: string | JSX.Element
    value: number,
    setValue: (value: number) => void,
    maxValue: number,
    minValue: number,
    disabled?: boolean
}

export default function SlideField({ children, value, setValue, maxValue, minValue, disabled }: Props) {

    const progressBar = useRef<HTMLInputElement>(null)
    const selectorBtn = useRef<HTMLInputElement>(null)

    function handlerValue(e: React.ChangeEvent<HTMLInputElement>): void {
        const value: number = parseInt(e.target.value.replace(/ /gi, ""))
        if (isNaN(value) || value > maxValue || disabled) return
        setValue(value)
    }

    function updateProgressBar(): void {
        const ratio = ((value - minValue) * 100) / (maxValue - minValue)
        const alignment = ratio < 0 ? 0 : ratio > 100 ? 100 : ratio
        progressBar.current.style.width = `${alignment}%`
        selectorBtn.current.style.left = `${alignment}%`
    }

    useEffect(() => {
        updateProgressBar()
    }, [value])

    return <div className={`slide-wrapper ${disabled ? "disabled" : ""}`}>
        <div className="slide-container">
            <div className="slide-container-inputs">
                <div className="inputs__enter">
                    <input type="text" value={replaceNumber(value.toFixed())} onChange={handlerValue} disabled={disabled} />
                    <div className="inputs__icon">
                        {children}
                    </div>
                </div>
                <div className="inputs__slider">
                    <input className="inputs__slider" type="range" value={value.toFixed()} min={minValue} max={maxValue} onChange={handlerValue} disabled={disabled} />
                    <div className="slider__btn" ref={selectorBtn} />
                    <div className="slider__progress-bar" ref={progressBar} />
                </div>
            </div>
        </div>
    </div>
}