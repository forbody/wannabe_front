import { Typography } from "@mui/material";
import { ForegroundBox } from "../styled_comp/StyledDiv";
import male from "../../assets/MaleBodyShape.JPG";

const StepInput = ({ inputData, joinData, addJoinData, bodyShape, uploadProfileImage, error }) => {
    return ( 
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
                                    {i.img && <img src={i.img} alt="bodyshape" width={300}/>} 
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
    );
}

export default StepInput;