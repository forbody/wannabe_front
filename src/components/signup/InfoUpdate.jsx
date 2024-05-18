import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackgroundBox, ForegroundBox } from '../styled_comp/StyledDiv';
import { useState } from "react";
import Swal from 'sweetalert2';
import male from "../../assets/MaleBodyShape.JPG";
import female from "../../assets/FemaleBodyShape.JPG";
import axios from 'axios';
import Step from "../../components/signup/Step";

import { userApi } from "../../api/services/user";

const InfoUpdate = () => {
    const [step, setStep] = useState(1);
    const [joinData, setJoinData] = useState({
        email: "",
        password: "",
        pwdchk: "",
        gender: "",
        birthday: "",
        height: "",
        weight: "",
        bodyshape: "",
        img: "",
        user_name: "",
    });
    
    // ⚠️마지막 스텝이 씹힘
    const goUpdate = async (joinData) =>{
        try{
            const res1 = await userApi.addUserDetail(joinData)
            console.log(res1);
            if (res1.code !== 200) {
                throw new Error(res1.message);
                };
            const res2 = await userApi.modifyUser(joinData)
            console.log(res2);
            if (res2.code === 200) {
                Swal.fire({
                    title: "이제 워너비를 이용하실 수 있습니다!",
                    text: res2.message,
                    icon: "success"
                });
                window.location.reload();
            } else {
                throw new Error(res2.message);
            }
        }catch(err) {
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    }

    let stepComp;
    
    if (step === 1) {
        stepComp = (
            <>
                <Step title="이메일 입력"
                    inputData={[
                        {"inputName":"email", "type":"email", "message":"워너비에 오신 것을 환영해요! 먼저, 이메일을 입력해 주세요 😊", "label":"이메일" }
                    ]} 
                    step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
        );    
    }  else if (step === 2) {
        stepComp = (
            <>
                <Step title="개인정보 입력" 
                    inputData={[
                        {"inputName":"gender", "type":"radio", "message":"성별을 입력해 주세요.", "label":"성별" },
                        {"inputName":"birthday", "type":"date", "message":"생일을 입력해 주세요.", "label":"생일" }
                    ]}
                    step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
            
        )
    }    else if (step === 3) {
            stepComp = (
                <>
                    <Step title="개인정보 입력" 
                        inputData={[
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
                        {"img": joinData.gender === "M" ? male : female, "inputName":"bodyshape", "type":"checkbox", "message":"나에게 가장 적절한 체형을 선택해 주세요.", "label":"체형" },
                    ]}
                    step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
        )
    } else {
        stepComp = (
            <>
                <Step title="프로필 설정"
                    inputData={[
                        {"inputName":"img", "type":"file", "accept":"image/*", "message":"프로필 사진을 등록해 주세요.", "label":"프로필 사진" },
                        {"inputName":"user_name", "type":"text", "message":"이름을 입력해 주세요.", "label":"이름" },
                    ]}
                    step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} goJoin={goUpdate(joinData)} />
            </>
        );
    }
    return stepComp;
}

export default InfoUpdate;