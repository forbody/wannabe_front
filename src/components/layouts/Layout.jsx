import { BrowserRouter } from 'react-router-dom';
import Main from "./Main"
import ScrollTop from './ScrollTop'

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
        <ScrollTop />
            <Main>
                {children}
            </Main>
        </BrowserRouter>
    );
}

export default Layout;