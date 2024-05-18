import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { BackgroundBox } from "../styled_comp/StyledDiv";
import { useState } from "react";
import StepInput from "./StepInput";

const Step = ({title, inputData, step, setStep, joinData, setJoinData, goJoin}) => {
    const [error, setError] = useState();
    const [pass, setPass] = useState(false);

    const goNext = (e) => {
        setStep(step+1);
        setPass(false);
    }

    const goPrev = () => {
        setStep(step-1);
    }

    const bodyShape = {
        male : ['표준 체형','작은 역삼각 체형','사각 체형','큰 사각 체형'],
        female: ['표준 체형','작은 역삼각 체형','역삼각 체형', '삼각 체형', '사각 체형']
    }

    // ⚠️state 변화 한발짝 느림
    const addJoinData = (e) => {
        const { name, value } = e.target;
        const validators = {
            email: {
                regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                errorMsg: '올바른 이메일 형식이 아닙니다.'
            },
            password: {
                regex: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/,
                errorMsg: '올바른 비밀번호 형식이 아닙니다.'
            },
            pwdchk: {
                validate: (value) => value === joinData.password,
                errorMsg: '비밀번호가 같지 않습니다.'
            },
            gender: {
                validate: () => !!joinData.gender,
                errorMsg: '성별을 선택해 주세요.'
            },
            birthday: {
                validate: () => joinData.birthday && new Date(joinData.birthday) <= new Date(),
                errorMsg: '생일을 올바르게 선택해 주세요.'
            },
            height: {
                validate: () => !!joinData.height,
                errorMsg: '키를 입력해 주세요.'
            },
            weight: {
                validate: () => !!joinData.weight,
                errorMsg: '몸무게를 입력해 주세요.'
            },
            bodyshape: {
                validate: () => !!joinData.bodyshape,
                errorMsg: '체형을 선택해 주세요'
            },
            img: {
                validate: () => !!joinData.img,
                errorMsg: '프로필 사진을 선택해 주세요'
            },
            user_name: {
                validate: () => !!joinData.user_name,
                errorMsg: '이름을 입력해 주세요'
            }
        };
    
        const validator = validators[name];
        if (validator) {
            const isValid = validator.regex ? validator.regex.test(value) : validator.validate(value);
            if (!isValid) {
                setError(validator.errorMsg);
                setPass(false);
            } else {
                setError();
                setPass(true);
            }
        }
    
        setJoinData({ ...joinData, [name]: value });
    }

    const uploadProfileImage = async(e) => {
        // console.log(e.target.name);
        const file = e.target.files[0];
        const profileData = new FormData();
        profileData.append('img', file);
        // console.log(file);
        const result = await axios.post(process.env.REACT_APP_API_URL+'/users/image', profileData);
        // console.log(result);
        if (result.data.code === 200) {
            setJoinData({...joinData, [e.target.name]: result.data.img});
        }
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
                <StepInput inputData={inputData} joinData={joinData} addJoinData={addJoinData} bodyShape={bodyShape} uploadProfileImage={uploadProfileImage} error={error}/>
                { step > 1 &&
                <Button onClick={goPrev} variant="contained" color="white" style={{ padding: '6px 36px'}}>이전으로</Button>
                }
                { step !== 5 ? 
                <Button disabled={!pass} onClick={goNext} variant="contained" color="secondary" style={{ padding: '6px 36px'}}>계속하기</Button>:
                <Button onClick={goJoin} variant="contained" color="secondary" style={{ padding: '6px 36px'}}>완료하기</Button>
                }
            </BackgroundBox>
            {/* infoupdate의 경우: loginUser 가져와서 안보이게 막자 */}
            <Button variant="text" href="/login" color="white" style={{textDecoration:"underline"}}>이미 계정이 있으신가요?</Button>
        </Box>
    );
}

export default Step;