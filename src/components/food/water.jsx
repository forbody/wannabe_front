import { PieChart } from "@mui/x-charts";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import watercompleteimg from '../../assets/watercomplete.png'
import { IoIosWater } from "react-icons/io";

const Water = () => {
    const [water, setWater] = useState(localStorage.getItem('water') || 0);
    const [waterComplete, setWaterComplete] = useState(false);
    localStorage.setItem('water', water)

    const handelWater = () => {
        setWater(parseInt(water) + 10)
    }

    useEffect(()=>{
        if (localStorage.water == 100) {
            Swal.fire({
                title: "훌륭해요!",
                text: "오늘 물을 2L 마셨어요!",
                imageUrl: watercompleteimg,
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: "watercompleteimg"
            });
            handelWater()
        } else if (parseInt(localStorage.getItem('water')) > 100) {
            setWaterComplete(true)
        }
    }, [water])

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
                    { id: 0, value: localStorage.water, color:'#b3e3ff'},
                    { id: 1, value: 100-localStorage.water, color:'#00000010'},
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
            onClick={handelWater}
            disabled={waterComplete}
        >물 마시기</Button>
        </ForegroundBox>
        </>
    );
}

export default Water;