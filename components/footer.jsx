import React from 'react'
import Logo from './logo'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__background">
                <div className="footer__container container grid">
                    <div className="footer__logobox">
                        <Logo />
                    </div>

                    <div className="footer__linkbox">
                        <ul className="footer__links">
                            <span className="footer__links__tab">Links</span>
                            <li><a href="/about" className='footer__link'>About</a></li>
                            <li><a href="/journey" className='footer__link'>Journey</a></li>
                            <li><a href="/projects" className='footer__link'>Projects</a></li>
                        </ul>

                        <ul className="footer__links">
                            <span className="footer__links__tab">Explore</span>
                            <li><a href="/blog" className='footer__link'>Blog</a></li>
                            <li><a href="/newsletter" className='footer__link'>Newsletter</a></li>
                        </ul>
                    </div>

                    <div className="footer__socials">
                        <a href="/contact" className="footer__social"><i className='bx bxs-envelope'></i></a>
                        <a href="https://github.com/fabianwaller" target="_blank" className="footer__social"><i className="bx bxl-github"></i></a>
                        <a href="https://twitter.com/fabianwallerr" target="_blank" className="footer__social"><i className="bx bxl-twitter"></i></a>
                        <a href="https://www.linkedin.com/in/fabian-waller-974840213/" target="_blank" className="footer__social"><i className="bx bxl-linkedin"></i></a>
                    </div>

                    <p className="footer__copyright">&#169; Fabian Waller. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer