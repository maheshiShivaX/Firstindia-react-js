import { Link } from 'react-router-dom';
import "../ComponentsCSS/navabr.css";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/youthfestivalplus');
        }
    };


    return (
        <div className='youthfestival'>
            <nav class="navbar navbar-expand-lg" style={{ background: '#fff' }}>
                <div class="container-fluid">
                    <Link to="/youthfestivalplus" className='navbar-brand'><img className='logo' src="./festivalimages/Logo.png" /></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="mx-auto navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/youthfestivalplus" className='navlink'>HOME</Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={() => scrollToSection('section1')} className='navlink'>GUESTS OF HONOUR</Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={() => scrollToSection('section2')} className='navlink'>HOW TO APPLY</Link>
                            </li>
                            <li class="nav-item">
                                <Link onClick={() => scrollToSection('section3')} className='navlink'>EVENT HIGHLIGHTS</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/youthfestivalplus/Login" className='navlink'>LOGIN</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/youthfestivalplus/applicationform" className='btn btn-primary'>
                        APPLY NOW
                    </Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;






