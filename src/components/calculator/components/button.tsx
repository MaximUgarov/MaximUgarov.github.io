type Props = {
    children: string,
    isLoading: boolean
    onClick?: () => void,
}

export default function SubmitButton({ children, isLoading, onClick }: Props) {
    return <button className="content-result__button" onClick={onClick} disabled={isLoading}>
        {isLoading ? <div className="spinner"><span className="spinner-inner-3" /></div> : children}
    </button>
}