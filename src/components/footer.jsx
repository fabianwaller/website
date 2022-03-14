import React from 'react'
import ReactDOM from 'react-dom'

import Logo from './logo'

function Footer(props) {
    return (
        <footer className="footer">
            <div className="footer__background">
                <div className="footer__container container grid">
                    <div>
                        <Logo type='white'/>
                    </div>

                    <div className="footer__linkbox">
                        <ul className="footer__links">
                            <span className="footer__links__tab">Links</span>
                            <li><a href="#about" className='footer__link'>About me</a></li>
                            <li><a href="#contact" className='footer__link'>Contact</a></li>
                        </ul>

                        <ul className="footer__links">
                            <span className="footer__links__tab">Explore</span>
                            <li><a href="#blog" className='footer__link'>Blog</a></li>
                        </ul>
                    </div>

                    <div className="footer__socials">
                        <a href="https://github.com/fabianwaller" target="_blank" className="footer__social"><i className="bx bxl-github"></i></a>
                        <a href="https://twitter.com/fabianwallerr" target="_blank" className="footer__social"><i className="bx bxl-twitter"></i></a>
                    </div>

                    <p className="footer__copyright">&#169; Fabian Waller. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
  
export default Footer