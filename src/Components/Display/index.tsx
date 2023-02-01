import "./style.scss";

interface IDisplayProps {
    billValue: number;
    tipValue: number;
}

export function Display(props: IDisplayProps) {
    function formatMoney(valor: number) {
        if (isNaN(valor)) valor = 0;
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(valor);
    }

    return (
        <div className="display">
            <div className="resultsContainer">
                <div className="displayInput">
                    <div>
                        <span>Tip Amount</span>
                        <p>/ person</p>
                    </div>
                    <input
                        type={"text"}
                        placeholder="$0.00"
                        readOnly
                        value={formatMoney(props.tipValue)}
                    />
                </div>
                <div className="displayInput">
                    <div>
                        <span>Total</span>
                        <p>/ person</p>
                    </div>
                    <input
                        type={"text"}
                        placeholder="$0.00"
                        readOnly
                        value={
                            props.billValue === 0
                                ? "$0.00"
                                : formatMoney(props.billValue)
                        }
                    />
                </div>
            </div>

            <button
                disabled={props.billValue ? false : true}
                className="resetButton"
                onClick={() => window.location.reload()}
            >
                RESET
            </button>
        </div>
    );
}
