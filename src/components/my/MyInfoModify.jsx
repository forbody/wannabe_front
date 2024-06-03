import { useState } from "react";
import { userApi } from "../../api/services/user";
import male from "../../assets/MaleBodyShape.JPG";
import female from "../../assets/FemaleBodyShape.JPG";
import Swal from "sweetalert2";
import Step from "../signup/Step";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { PageBox } from "../styled_comp/StyledDiv";
import { useAuth } from "../../hooks/useAuth";

const MyInfoModify = () => {
    const { goToErrPage } = useAuth();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
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
    
    const goUpdate = async (joinData) =>{
        try{
            const res = await userApi.modifyUser(joinData, token)
            if (res.code === 200) {
                Swal.fire({
                    title: "성공적으로 수정되었습니다!",
                    text: res.message,
                    icon: "success"
                });
                navigate('/my')
            } else {
                throw new Error(res.message);
            }
        }catch(err) {
            goToErrPage(err, () => navigate('/err'));
        }
    }
    
    let stepComp;
    if (step === 1) {
        stepComp = (
            <Step title="나의 정보 수정"
                inputData={[
                    {"inputName":"email", "type":"email", "message":"이메일", "label":"이메일" },
                    {"inputName":"gender", "type":"radio", "message":"성별", "label":"성별" },
                    {"inputName":"birthday", "type":"date", "message":"생일", "label":"생일" },
                    {"inputName":"height", "type":"tel", "message":"키", "label":"키" },
                    {"inputName":"weight", "type":"tel", "message":"몸무게", "label":"몸무게" },
                    {"img": joinData.gender === "M" ? male : female, "inputName":"bodyshape", "type":"checkbox", "message":"나에게 가장 적절한 체형을 선택해 주세요.", "label":"체형" },
                    {"inputName":"img", "type":"file", "accept":"image/*", "message":"프로필 사진", "label":"프로필 사진" },
                    {"inputName":"user_name", "type":"text", "message":"이름", "label":"이름" },
                ]} 
                lastStep={true} step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} goJoin={() => goUpdate(joinData)}
            />
        );    
    } 
    return (
    <PageBox>
        {stepComp}
    </PageBox>
    )
}

export default MyInfoModify;