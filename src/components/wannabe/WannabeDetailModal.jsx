import { Modal, Typography, Box, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import male from "../../assets/MaleBodyShape.JPG";
import female from "../../assets/FemaleBodyShape.JPG";

const WannabeDetailModal = ({ open, handleClose, roleModels, activeStep }) => {
    function bodyshapeSwitch(id) {
        let bodyshape = "";
        let gender = "";
        let description = "";
        switch (id) {
            case 1:
                bodyshape = "표준 체형";
                gender = "남성";
                description = "표준 체형은 대한민국 표준의 체형으로 송중기의 체형에 해당해요 \n다른 체형에 비해 특형한 특성이 없어요";
                break;
            case 2:
                bodyshape = "작은 역삼각 체형";
                gender = "남성";
                description = "작은 역삼각 체형은 이동욱의 체형에 해당해요 \n1. 가는 몸통\n2. 넓고 처진 어깨\n3. 긴 팔\n4. 큰 머리\n5. 짧은 엉덩이 길이\n6. 긴 지체";
                break;
            case 3:
                bodyshape = "사각 체형";
                gender = "남성";
                description = "사각 체형은 윤시윤의 체형에 해당해요 \n1. 굵은 몸통\n2. 보통의 어깨 폭\n3. 짧은 팔\n4. 작은 머리\n5. 긴 엉덩이 길이";
                break;
            case 4:
                bodyshape = "큰 사각 체형";
                gender = "남성";
                description = "큰 사각 체형은 마동석의 체형에 해당해요 \n1. 굵은 몸통\n2. 추켜진 보통의 어깨 폭\n3. 긴 팔\n4. 작은 머리\n5. 짧은 엉덩이 길이";
                break;
            case 5:
                bodyshape = "표준 체형";
                gender = "여성";
                description = "표준 체형은 박신혜의 체형에 해당해요";
                break;
            case 6:
                bodyshape = "작은 역삼각 체형";
                gender = "여성";
                description = "작은 역삼각 체형은 수지의 체형에 해당해요 \n1. 가는 몸통\n2. 보통 너비의 매우 처진 어깨\n3. 긴 팔\n4. 큰 머리\n5. 짧은 엉덩이 길이\n6. 긴 지체";
                break;
            case 7:
                bodyshape = "역삼각 체형";
                gender = "여성";
                description = "역삼각 체형은 공효진의 체형에 해당해요 \n1. 같은 굵기의 몸통\n2. 매우 넓은 어깨\n3. 짧은 팔\n4. 보통의 엉덩이 길이";
                break;
            case 8:
                bodyshape = "큰 삼각 체형";
                gender = "여성";
                description = "큰 삼각 체형은 김태희의 체형에 해당해요 \n1. 굵은 몸통\n2. 보통의 어깨 너비\n3. 긴 팔\n4. 긴 총길이\n5. 보통의 엉덩이 길이";
                break;
            case 9:
                bodyshape = "사각 체형";
                gender = "여성";
                description = "사각 체형은 이하늬의 체형에 해당해요 \n1. 가는 몸통\n2. 매우 좁고 추켜진 어깨\n3. 짧은 팔\n4. 약간 긴 엉덩이 길이\n5. 약간 짧은 지체";
                break;
        }
        return { bodyshape, gender, description };
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="wannabe-modal"
            aria-describedby="wannabe-modal-description"
        >
            <ForegroundBox
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    boxShadow: 24,
                    p: 4,
                    bgcolor: 'background.paper', // 가시성을 위해 배경 색상 설정
                }}
            >
                <IconButton
                    style={{ position: 'absolute', right: 8, top: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>

                <img src={roleModels && `http://localhost:8000/${roleModels[activeStep]?.UserDetail[0]?.img}`} alt="role model" />

                {roleModels[activeStep]?.id <= 4 ?
                    <img src={male} alt="bodyshape" />
                    :
                    <img src={female} alt="bodyshape" />
                }

                <Typography>
                    {roleModels[activeStep]?.user_name} 님의 추천 루틴은 {bodyshapeSwitch(roleModels[activeStep]?.id).bodyshape}의 {bodyshapeSwitch(roleModels[activeStep]?.id).gender}유저에게 추천드리는 루틴입니다.
                </Typography>
                <Typography variant="subtitle" color="secondary" style={{ marginTop: "16px" }}>
                    {bodyshapeSwitch(roleModels[activeStep]?.id).bodyshape}이 무엇인가요?
                </Typography>
                <Box>
                    {bodyshapeSwitch(roleModels[activeStep]?.id).description.split('\n').map((line, index) => (
                        <Typography key={index} variant="body1" style={{ fontSize: '1rem', color: '#888' }}>
                            {line}
                        </Typography>
                    ))}
                </Box>
            </ForegroundBox>
        </Modal>
    );
}

export default WannabeDetailModal;
