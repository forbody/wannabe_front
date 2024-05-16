import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackgroundBox, ForegroundBox } from './../components/styled_comp/StyledDiv';
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [joinData, setJoinData] = useState({
        email: "",
        password: "",
        pwdchk: "",
        name: "",
    });
    
    let stepComp;

    if (step === 1) {
        stepComp = (
            <Step title="이메일 입력" inputData={[{"inputName":"email", "type":"email", "message":"먼저, 이메일을 입력해 주세요 😊", "label":"이메일" }]} step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
        );    
    } else if (step === 2) {
        stepComp = (
            <>
                <Step title="비밀번호 입력" 
                    inputData={[
                        {"inputName":"password", "type":"password", "message":"비밀번호는 9자 이상 입력해 주세요.", "label":"비밀번호" },
                        {"inputName":"pwdchk", "type":"password", "message":"비밀번호를 다시 한번 입력해 주세요.", "label":"비밀번호 확인" },
                    ]}
                    step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
        )
    } else if (step === 3) {
        stepComp = (
            <>
                <Step title="개인정보 입력" 
                inputData={[
                    {"inputName":"gender", "type":"radio", "message":"성별을 입력해 주세요.", "label":"성별" },
                    {"inputName":"birthday", "type":"date", "message":"생일을 입력해 주세요.", "label":"생일" },
                    {"inputName":"height", "type":"number", "message":"키를 입력해 주세요.", "label":"키" },
                    {"inputName":"weight", "type":"number", "message":"몸무게를 입력해 주세요.", "label":"몸무게" },
                ]}
                step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
            
        )
    } else if (step === 4) {
        stepComp = (
            <>
                <Step title="맞춤 추천정보 입력" 
                inputName="bodyshape" label="체형" 
                inputData={[
                    {"img": "../assets/MaleBodyShape.JPG", "inputName":"bodyshape", "type":"checkbox", "message":"나에게 가장 적절한 체형을 선택해 주세요.", "label":"체형" },
                ]}
                step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
        )
    } else {
        stepComp = (
            <>
                <Step title="프로필 설정"
                inputData={[
                    {"inputName":"img", "type":"", "message":"프로필 사진을 등록해 주세요.", "label":"프로필 사진" },
                    {"inputName":"name", "type":"", "message":"이름을 입력해 주세요.", "label":"이름" },
                ]}
                step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
        );
    }

    return stepComp;
}

const Step = ({title, inputData, step, setStep, joinData, setJoinData}) => {
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
        <Box
            width='80%'
            height='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Typography variant="h5" fontWeight={800}>{title}</Typography>
            <BackgroundBox
                display='flex'
                
                style={{
                    width:'100%',
                    marginTop:'36px',
                    padding: '16px',
                    justifyContent: 'space-around'
                }}
            >
                <ForegroundBox
                    style={{
                        width:'100%',
                        margin:'24px 0',
                        padding: '16px'
                    }}
                >
                    {
                        inputData.map(i => (
                            <>
                                {i.type === 'radio' ? (
                                    <div
                                        key={i.inputName}
                                        style={{
                                            width: '100%',
                                            margin: '12px 0 24px',
                                        }}
                                        >
                                        <Typography>{i.message}</Typography>
                                        <label>
                                            <input
                                                type={i.type}
                                                name={i.inputName}
                                                value="M"
                                                checked={joinData[i.inputName] === "M"}
                                                onChange={(e) => addJoinData(e)}
                                            />
                                            남성
                                        </label>
                                        <label>
                                            <input
                                                type={i.type}
                                                name={i.inputName}
                                                value="F"
                                                checked={joinData[i.inputName] === "F"}
                                                onChange={(e) => addJoinData(e)}
                                            />
                                            여성
                                        </label>
                                    </div>
                                ) : (
                                    <>
                                        <img src={i.img} />
                                        <Typography>{i.message}</Typography>
                                        <input
                                            name={i.inputName}
                                            type={i.type}
                                            label={`${i.label}`}
                                            onChange={(e) => addJoinData(e)}
                                            value={joinData[i.inputName]}
                                            style={{
                                                width: '100%',
                                                margin: '16px 0 24px',
                                                padding: '12px',
                                                border: '1px solid #b1e33d',
                                                borderRadius: '24px'
                                            }}
                                        />
                                    </>
                                )}
                            </>
                        ))
                    }
                </ForegroundBox>
                { step > 1 && <Button onClick={goPrev} variant="contained" color="white" style={{ padding: '6px 36px'}}>이전으로</Button> }
                { step !== 5 ? <Button onClick={goNext} variant="contained" color="secondary" style={{ padding: '6px 36px'}}>계속하기</Button>: <Button onClick={goJoin} variant="contained" color="secondary" style={{ padding: '6px 36px'}}>회원가입</Button> }
            </BackgroundBox>
        </Box>
    );
}

export default SignUp;