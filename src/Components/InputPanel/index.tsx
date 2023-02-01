import "./style.scss";

import dolar from "../../Assets/Images/icon-dollar.svg";
import person from "../../Assets/Images/icon-person.svg";
import { useCallback, useEffect, useState } from "react";

interface IInputPanelProps {
    setBillValue: React.Dispatch<React.SetStateAction<number>>;
    setTipValue: React.Dispatch<React.SetStateAction<number>>;
}

export function InputPanel(props: IInputPanelProps) {
    const [percentage, setPercentage] = useState(0);
    const [bill, setBill] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [err, setErr] = useState(false);

    const percentageValues = [
        { percentage: 5 },
        { percentage: 10 },
        { percentage: 15 },
        { percentage: 25 },
        { percentage: 50 },
    ];

    const handleError = useCallback(() => {
        if (bill && percentage && !numberOfPeople) {
            setErr(true);
        } else {
            setErr(false);
        }
    }, [bill, numberOfPeople, percentage]);

    const handlePercentage = useCallback(
        (percentageProp: number) => {
            if (percentageProp === percentage) {
                setPercentage(0);
            } else {
                setPercentage(percentageProp);
            }
        },
        [percentage]
    );

    const handleTipValue = useCallback(() => {
        if (bill && numberOfPeople) {
            props.setTipValue(
                (bill / numberOfPeople ?? 1) * (percentage / 100)
            );
        } else {
            props.setTipValue(0);
        }
    }, [bill, numberOfPeople, percentage, props]);

    const handleBillValue = useCallback(() => {
        if (bill && numberOfPeople) {
            props.setBillValue(
                bill / numberOfPeople +
                    (percentage / 100) * (bill / numberOfPeople)
            );
        } else {
            props.setBillValue(0);
        }
    }, [bill, numberOfPeople, percentage, props]);

    function handleButtonClassName(percentageProp: number) {
        if (percentageProp === percentage) {
            return "percentageButton active";
        } else {
            return "percentageButton";
        }
    }

    useEffect(() => {
        handleBillValue();
        handleTipValue();
        handleError();
    }, [handleBillValue, handleError, handleTipValue]);

    return (
        <div className="inputContainer">
            <div className="billContainer">
                <span className="billSpan">Bill</span>
                <div className="billInputContainer">
                    <img className="billIcon" alt="dolar" src={dolar} />
                    <input
                        className="billInput"
                        type={"number"}
                        placeholder="0"
                        onChange={(e) => {
                            setBill(Number(e.target.value));
                            handleBillValue();
                        }}
                    />
                </div>
            </div>

            <div className="buttonsContainer">
                <span>Select Tip %</span>
                <div className="buttons">
                    {percentageValues.map((percentages) => (
                        <button
                            onClick={() => {
                                handlePercentage(percentages.percentage);
                            }}
                            className={handleButtonClassName(
                                percentages.percentage
                            )}
                        >
                            {percentages.percentage}%
                        </button>
                    ))}

                    <input
                        type={"number"}
                        placeholder="Custom"
                        className="customInput"
                        onChange={(e) =>
                            handlePercentage(Number(e.target.value))
                        }
                    />
                </div>
            </div>

            <div className="billContainer">
                <div className="billContainerLabels">
                    <span className="billSpan">Number of People</span>
                    {err && (
                        <span className="billSpanError">Can't be zero</span>
                    )}
                </div>
                <div className="billInputContainer">
                    <img className="billIcon" alt="dolar" src={person} />
                    <input
                        className={`billInput ${err && "err"}`}
                        type={"number"}
                        placeholder="0"
                        onChange={(e) =>
                            setNumberOfPeople(Number(e.target.value))
                        }
                    />
                </div>
            </div>
        </div>
    );
}
