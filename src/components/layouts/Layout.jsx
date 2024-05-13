import { BrowserRouter } from 'react-router-dom';
import Main from "./Main"
import BottomNavi from './BottomNavi';

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <Main>
                {children}
            </Main>
        </BrowserRouter>
    );
}

export default Layout;