import { useState } from "react";
import { userApi } from "../../api/services/user";
import male from "../../assets/MaleBodyShape.JPG";
import female from "../../assets/FemaleBodyShape.JPG";
import Swal from "sweetalert2";
import Step from "../signup/Step";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const MyInfoUpdate = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [joinData, setJoinData] = useState({
        height: "",
        weight: "",
        bodyshape: "",
        img: "",
    });
    
    const goUpdate = async (joinData) =>{
        try{
            const res = await userApi.addUserDetail(joinData, token)
            if (res.code === 200) {
                Swal.fire({
                    title: "성공적으로 추가되었습니다!",
                    text: res.message,
                    icon: "success"
                });
                navigate('/my')
            } else {
                throw new Error(res.message);
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
                <Step title="신체 지수 변화 추가"
                    inputData={[
                        {"inputName":"height", "type":"tel", "message":"키", "label":"키" },
                        {"inputName":"weight", "type":"tel", "message":"몸무게", "label":"몸무게" },
                        {"img": joinData.gender === "M" ? male : female, "inputName":"bodyshape", "type":"checkbox", "message":"나에게 가장 적절한 체형을 선택해 주세요.", "label":"체형" },
                        {"inputName":"img", "type":"file", "accept":"image/*", "message":"프로필 사진", "label":"프로필 사진" }
                    ]} 
                    lastStep={true} step={step} setStep={setStep} joinData={joinData} setJoinData={setJoinData} goJoin={() => goUpdate(joinData)}/>
            </>
        );    
    } 
    return (
    <Box
            height='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            style={{
                padding:'24px 0',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
            }}
        >
        {stepComp}
    </Box>
    )
}

export default MyInfoUpdate;