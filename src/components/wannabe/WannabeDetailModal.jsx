import { Modal, Typography } from "@mui/material"
import { ForegroundBox } from "../styled_comp/StyledDiv"
import male from "../../assets/MaleBodyShape.JPG";
import female from "../../assets/FemaleBodyShape.JPG";

const WannabeDetailModal = ({open, handleClose, roleModels, activeStep}) => {
    function bodyshapeSwitch (id)
    {let bodyshape = ""
    let gender = ""
        switch (id) {
        case 1:
            bodyshape = "표준 체형"
            gender="남성"
            break;
        case 2:
            bodyshape = "작은 역삼각 체형"
            gender="남성"
            break;
        case 3:
            bodyshape = "사각 체형"
            gender="남성"
            break;
        case 4:
            bodyshape = "큰 사각 체형"
            gender="남성"
            break;
        case 5:
            bodyshape = "표준 체형"
            gender="여성"
            break;
        case 6:
            bodyshape = "작은 역삼각 체형"
            gender="여성"
            break;
        case 7:
            bodyshape = "역삼각 체형"
            gender="여성"
            break;
        case 8:
            bodyshape = "큰 삼각 체형"
            gender="여성"
            break;
        case 9:
            bodyshape = "사각 체형"
            gender="여성"
            break;
        }
        return {bodyshape, gender};
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="wannabe-modal"
        aria-describedby="wannabe-modal-description"
        >
            <ForegroundBox
            style = {{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                boxShadow: 24,
                p: 4,
                }}
            >
                {roleModels[activeStep]?.id <= 4 ?
                <img src={male} alt="bodyshape"/>
                :
                <img src={female} alt="bodyshape"/>
                }
                <Typography>
                    {roleModels[activeStep]?.user_name} 님의 추천 루틴은 {bodyshapeSwitch(roleModels[activeStep]?.id).bodyshape}의 {bodyshapeSwitch(roleModels[activeStep]?.id).gender}유저에게 추천드리는 루틴입니다.
                </Typography>
            </ForegroundBox>
        </Modal>
    );
}

export default WannabeDetailModal;