import { useState } from "react";
import { Display } from "../../Components/Display";
import { InputPanel } from "../../Components/InputPanel";

import "./style.scss";

export function Calculadora() {
    const [billValue, setBillValue] = useState(0);
    const [tipValue, setTipValue] = useState(0);

    return (
        <div className="container">
            <div className="calculator">
                <InputPanel
                    setBillValue={setBillValue}
                    setTipValue={setTipValue}
                />
                <Display billValue={billValue} tipValue={tipValue} />
            </div>
        </div>
    );
}
