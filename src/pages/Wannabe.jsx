
import React from 'react';

const Wannabe = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderBottom: '1px solid #ddd', 
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>
                <div className="App">
                    <main className="App-celebrity">
                        <img src={`${process.env.PUBLIC_URL}/images/Jang.png`} style={{ width: '100%', height: 'auto' }} alt="장원영" />
                        <p>장원영</p>
                    </main>
                </div>
                <title>셀럽</title>
            </div>

            <ul className="wannabe">
                <li className="c" 
                    href="#" 
                    title 
                    data-gtm-event-name="link_click" 
                    data-gtm-event-category="클릭" 
                    data-gtm-event-action="네비게이터 영역 - 링크 클릭" 
                    data-gtm-event-label="컨텐츠 : 셀럽">
                    <span>셀럽</span>
                    <div className="sub-menu-wrap">
                        <ul className="sub-menu-list">
                            <li></li>
                        </ul>
                    </div>
                </li>
                <li className="c" 
                    href="#" 
                    title 
                    data-gtm-event-name="link_click" 
                    data-gtm-event-category="클릭" 
                    data-gtm-event-action="네비게이터 영역 - 링크 클릭" 
                    data-gtm-event-label="컨텐츠 : 셀럽">
                    <span>내 신체정보</span>
                </li>
                <li className="swiper_slide"><span>셀럽 찜하기</span></li>
                <li className="swiper_slide"><span>내 달성도 체크</span></li>
                <li className="swiper_slide"><span>운동시간</span></li>
                <li className="swiper_slide"><span>활동칼로리</span></li>
                <li className="swiper_slide"><span>내 달성도 자랑하기</span></li>
            </ul>
        </div>
    );
}

export default Wannabe;
