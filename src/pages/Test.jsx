import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Test = () => {
    const [step, setStep] = useState(1);
    const [joinData, setJoinData] = useState({
        email: "",
        password: "",
        name: "",
    });

    if (step === 1) {
        return (
            <Step title="stp1" inputName="email" step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
        );    
    } else if (step === 2) {
        return (
            <Step title="stp2" inputName="password" step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
        )
    } else
        return (
            <Step title="stp3" inputName="name" step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
        );
}

const Step = ({title, inputName, step, setStep, joinData, setJoinData}) => {
    const goNext = () => {
        setStep(step+1);
    }

    const goPrev = () => {
        setStep(step-1);
    }

    const goJoin = () => {
        console.log(joinData);
    }

    const addJoinData = (e) => {
        setJoinData({...joinData, [e.target.name]: e.target.value});
    }

    return (
        <>
            <h1>{title}</h1>
            <input name={inputName} onChange={(e)=>addJoinData(e)} value={joinData[inputName]} />
            {
                step > 1 && <button onClick={goPrev}>prev</button>
            }
            { step !== 3 ? <button onClick={goNext}>next</button>: <button onClick={goJoin}>submit</button>}
            
            
        </>
    );
}

export default Test;