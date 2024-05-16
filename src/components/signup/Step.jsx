import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BackgroundBox, ForegroundBox } from "../styled_comp/StyledDiv";
import male from "../../assets/MaleBodyShape.JPG";
import { useState } from "react";

const Step = ({title, inputData, step, setStep, joinData, setJoinData}) => {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [pass, setPass] = useState(false);

    const goNext = (e) => {
        setStep(step+1);
        setPass(false);
    }

    const goPrev = () => {
        setStep(step-1);
    }

    const goJoin = (async () => {
        console.log(joinData);
        const { email,
            password,
            pwdchk,
            gender,
            birthday,
            height,
            weight,
            bodyshape,
            img,
            user_name } = joinData
        try {
            if (
                email && 
                password && 
                pwdchk && 
                (password === pwdchk) && 
                gender && 
                birthday && 
                height &&
                weight && 
                bodyshape &&
                img && 
                user_name) {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/join`, {
                    email,
                    user_name,
                    password,
                    gender,
                    birthday,
                    height,
                    weight,
                    bodyshape,
                    img,
                    
                })
                if (res.data.code === 200) {
                    Swal.fire({
                        title: "회원가입을 축하합니다!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/login');
                } else {
                    throw new Error(res.data.message);
                }
            } else {
                throw new Error("입력값을 확인해주세요");
            }
        } catch (err) {
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    });

    const bodyShape = {
        male : ['표준 체형','작은 역삼각 체형','사각 체형','큰 사각 체형'],
        female: ['표준 체형','작은 역삼각 체형','역삼각 체형', '삼각 체형', '사각 체형']
    }

    const addJoinData = (e) => {
        const { name, value, type } = e.target;
        if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (!emailRegex.test(value) || !value ) {
                setError('올바른 이메일 형식이 아닙니다.');
                setPass(false)
            } else {
                setError();
                setPass(true);
            }
        }
        if (name === 'password') {
            const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/;
            if (!passwordRegex.test(value)) {
                setError('올바른 비밀번호 형식이 아닙니다.')
                setPass(false)
            } else {
                setError();
                setPass(true);
            }
        }
        if (name === 'pwdchk') {
            if (joinData.password != value) {
                setError('비밀번호가 같지 않습니다.')
                setPass(false)
            } else {
                setError();
                setPass(true);
            }
        }

        if (name === 'gender' || name === 'birthday' || name === 'height' || name === 'weight') {
            if(joinData.birthday && joinData.gender && joinData.height && joinData.weight){
                if(new Date(joinData.birthday) > new Date()){
                    setError('시간여행자다~~👽')
                    setPass(false)
                } else {
                    setError();
                    setPass(true);
                }
            } else {
                setError('값을 전부 입력해 주세요');
                setPass(false)
            }
        }
        if (name === 'bodyshape') {
            if(joinData.bodyshape){
                setError();
                setPass(true);
            } else {
                setError('체형을 선택해 주세요');
                setPass(false)
            }
        }
        if (name === 'img' || name === 'user_name') {
            console.log(joinData.img);
            if(joinData.img && joinData.user_name){
                setError();
                setPass(true);
            } else {
                setError('값을 전부 입력해 주세요');
                setPass(false)
            }
        }

        setJoinData({...joinData, [name]: value});
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
                <ForegroundBox
                    style={{
                        width:'100%',
                        margin:'24px 0',
                        padding: '16px'
                    }}
                >
                    {
                        inputData.map(i => (
                            <div
                                key={i.inputName}
                            >
                                {i.type === 'radio' ? ( // 라디오 타입 분기처리
                                    <div
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
                                ) : 
                                i.type === 'checkbox' ? // 체크박스 타입 분기 처리
                                (<>
                                    {i.img && <img src={i.img} alt="bodyshape"/>} 
                                    <Typography>{i.message}</Typography>
                                    {i.img === male ? // 체크박스 타입 분기 처리 - 남성일 때
                                    <>
                                        {
                                            bodyShape.male.map((shape, idx) => (
                                                <>
                                                    <br/>
                                                    <label>
                                                        <input
                                                            type={i.type}
                                                            name={i.inputName}
                                                            value={idx+1}
                                                            checked={joinData[i.inputName] == idx+1}
                                                            onChange={(e) => addJoinData(e)}
                                                        />
                                                        {shape}
                                                    </label>
                                                </>
                                            ))
                                        }
                                    </>
                                    :  // 체크박스 타입 분기 처리 - 여성일 때
                                    <>
                                        {
                                            bodyShape.female.map((shape, idx) => (
                                                <>
                                                    <br/>
                                                    <label>
                                                        <input
                                                            type={i.type}
                                                            name={i.inputName}
                                                            value={idx+5}
                                                            checked={joinData[i.inputName] == idx+5}
                                                            onChange={(e) => addJoinData(e)}
                                                        />
                                                        {shape}
                                                    </label>
                                                </>
                                            ))
                                        }
                                    </>
                                    }
                                </>) : // 나머지 input 타입 처리
                                (<>
                                        { (i.type==='file' && i.img) && <img src={i.img} alt="profileimg"/>}
                                        <Typography>{i.message}</Typography>
                                        <input
                                            name={i.inputName}
                                            type={i.type}
                                            {...(i.type ==='file' && {accept: i.accept})}
                                            label={`${i.label}`}
                                            onChange={i.type==='file' ? (e) => uploadProfileImage(e) : (e) => addJoinData(e)}
                                            {...(i.type !=='file' && {value: joinData[i.inputName]})}
                                            style={{
                                                width: '100%',
                                                margin: '16px 0 24px',
                                                padding: '12px',
                                                border: '1px solid #b1e33d',
                                                borderRadius: '24px'
                                            }}
                                        />
                                    </>)
                                }
                            </div>
                        ))
                    }
                    {error && <Typography color="error">{error}</Typography>}
                </ForegroundBox>
                { step > 1 &&
                <Button onClick={goPrev} variant="contained" color="white" style={{ padding: '6px 36px'}}>이전으로</Button>
                }
                { step !== 5 ? 
                <Button disabled={!pass} onClick={goNext} variant="contained" color="secondary" style={{ padding: '6px 36px'}}>계속하기</Button>:
                <Button onClick={goJoin} variant="contained" color="secondary" style={{ padding: '6px 36px'}}>회원가입</Button>
                }
            </BackgroundBox>
            <Button variant="text" href="/login" color="white" style={{textDecoration:"underline"}}>이미 계정이 있으신가요?</Button>
        </Box>
    );
}

export default Step;