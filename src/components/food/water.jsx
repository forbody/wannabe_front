import { PieChart } from "@mui/x-charts";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { waterApi } from "../../api/services/water";
import watercompleteimg from '../../assets/watercomplete.png'
import { IoIosWater } from "react-icons/io";

const Water = ({loginUser}) => {
    
    const [waterComplete, setWaterComplete] = useState(false);
    const [water, setWater] = useState(0);

    // 물 마시기 버튼
    const handleWater = () => {
        setWater(water => (water) + 10);
        updateWater(water);
    }

    // 최초 실행 시 물을 마실 컬럼 생성 or 가져오기
    const createWater = async () => {
        try{
            const res = await waterApi.createWater(loginUser)
            if (res.code === 200) {
                setWater(parseInt(res.payload.water));
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

    // 물 마시기
    const updateWater = async (water) => {
        try{
            const drink = water + 10
            const res = await waterApi.updateWater(drink, loginUser)
            if (res.code === 200) {
                console.log('수분섭취 성공');
                if (drink == 100) {
                    Swal.fire({
                        title: "훌륭해요!",
                        text: "오늘 물을 2L 마셨어요!",
                        imageUrl: watercompleteimg,
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: "watercompleteimg"
                    });
                }
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

    useEffect(() => {
        if (water >= 100) {
            setWaterComplete(true)
        }
    }, [water]);
    useEffect(() => {
        createWater()
    }, [])

    return (
        <>
        <ForegroundBox
            display='flex'
            style={{
                width:'100%',
                alignContents:'center'
            }}
            >
            {waterComplete ?
            <>
            <Typography
            display='flex'
            variant='h6'
            fontWeight='600'
            style={{
                marginBottom:'8px',
                justifyContent:'center'
            }}
            >
                하루 물 권장 섭취량을 달성 했어요!🎉
            </Typography>
            <img src={watercompleteimg} alt="watercompleteimg" />
            </>
            :
            <>
            <Typography
            display='flex'
            variant='h6'
            fontWeight='600'
            style={{
                marginBottom:'8px',
                justifyContent:'center'
            }}
            >
                오늘 마신 물의 양
            </Typography>
            <PieChart
            series={[
                {
                data: [
                    { id: 0, value: water, color:'#b3e3ff'},
                    { id: 1, value: 100-water, color:'#00000010'},
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                cx: 130,
                },
            ]}
            width={300}
            height={200}
            />
            </>
            }
        </ForegroundBox>
        <ForegroundBox
        style={{
            width:'100%',
            height:'60px'
        }}
        >
        <Button
            variant="text"
            size="large"
            color="secondary"
            fullWidth
            startIcon={<IoIosWater/>}
            onClick={handleWater}
            disabled={waterComplete}
        >물 마시기</Button>
        </ForegroundBox>
        </>
    );
}

export default Water;