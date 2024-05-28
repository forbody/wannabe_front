import { useState } from "react";
import Swal from 'sweetalert2';
import male from "../../assets/MaleBodyShape.JPG";
import female from "../../assets/FemaleBodyShape.JPG";
import Step from "../../components/signup/Step";
import { userApi } from "../../api/services/user";
import { useAuth } from "../../hooks/useAuth";

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
    
    const {loginUser} = useAuth();
    const goUpdate = async (joinData) =>{
        try{
            const res1 = await userApi.addUserDetail(joinData, loginUser)
            if (res1.code !== 200) {
                throw new Error(res1.message);
                };
            const res2 = await userApi.modifyUser(joinData, loginUser)
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
                        {"inputName":"email", "type":"email", "message":`워너비에 오신 것을 환영해요! 😊😊 워너비를 사용하시려면 이메일이 필요해요.`, "label":"이메일" }
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
                        {"inputName":"birthday", "type":"date", "message":"생일을 입력해 주세요.", "label":"생일" },
                        {"inputName":"height", "type":"tel", "message":"키를 입력해 주세요.", "label":"키" },
                        {"inputName":"weight", "type":"tel", "message":"몸무게를 입력해 주세요.", "label":"몸무게" },
                    ]}
                    step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} />
            </>
            
        )
    }   else if (step === 3) {
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
                    lastStep={true} step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} goJoin={() => goUpdate(joinData)} />
            </>
        );
    }
    return stepComp;
}

export default InfoUpdate;