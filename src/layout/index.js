import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

const Layout=({children})=>{

    return(
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;