import React from 'react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo2.png';


function Navbar () {
    return(
        <div className={styles.Navbar}>
            <div>
                <img src={Logo} alt="logo"></img>
            </div>
            <div>
                <ul>
                    <li>About</li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar;