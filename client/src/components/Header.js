
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import {ReactComponent as LogoutIcon} from "../assets/log-out.svg"


const Header = () => {
    const navigate = useNavigate();
    const {cookie, removeCookie, generateToast} = useContext(AuthContext);
    
    function handleLogout(e){
        const token = cookie.token;
        generateToast("Logout successfully","success");
        removeCookie("token");
        
        
    }
    return (
        <div className="app-header">
            <h1>&#9782; NotesFlow</h1>
            <div className='log-out' onClick={handleLogout} >
                <LogoutIcon/>
            </div>

        </div>
    )
}

export default Header;