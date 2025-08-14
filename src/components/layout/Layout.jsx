import Header from './Header';
import Footer from './Footer';
import ChatBot from '../chat/ChatBot';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container">
                {children}
            </main>
            <Footer />
            <ChatBot />
        </>
    );
};

export default Layout;