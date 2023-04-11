
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useEffect, useState } from 'react';
export default function Footer({
    backgroundColorClass,
    spaceTopClass,
    spaceBottomClass,
    containerClass,
    extraFooterClass,
    spaceLeftClass,
    sideMenu }) {
    const [scroll, setScroll] = useState(0);
    const [top, setTop] = useState(0);

    useEffect(() => {
        setTop(100);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <footer
            className={`footer-area ${backgroundColorClass ? backgroundColorClass : ""
                } ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
                } ${extraFooterClass ? extraFooterClass : ""}`}
        >
            <div className={`${containerClass ? containerClass : "container"}`}>
                <div style={{ padding: 20 }} className="row">
                    <div
                        className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-4"
                            }`}
                    >
                        <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ""}`}>
                            <div className="footer-logo">
                                <a style={{ fontSize: 'xx-large' }} >SikiFood
                                    <img alt="" />
                                </a>
                            </div>
                            <p>
                                © 2021{" "}
                                <a href="//facebook.com" rel="noopener noreferrer" target="_blank">
                                SikiFood.
                                </a>
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-4"
                            }`}
                    >

                        <div className="footer-widget mb-30 ml-30">

                            <div className="footer-title">
                                <h3>SikiFood</h3>
                            </div>

                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <a >Trang chủ</a>
                                    </li>
                                    <li>
                                        <a >
                                            Sản phẩm
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            Về chúng tôi
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            Liên hệ
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>



                    <div
                        className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6"
                            }`}
                    >
                        <div className={`${sideMenu
                            ? "footer-widget mb-30 ml-145"
                            : "footer-widget mb-30 ml-75"
                            }`}>
                            <div className="footer-title">
                                <h3>FOLLOW US</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <a
                                            href="//www.facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.youtube.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Youtube
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div
                        className={`${sideMenu ? "col-xl-3 col-sm-12" : "col-lg-3 col-sm-6"
                            }`}
                    >
                        {/* footer newsletter */}
                        <div
                            className={`footer-widget ${spaceBottomClass ? spaceBottomClass : ""} ${sideMenu ? "ml-ntv5" : spaceLeftClass ? spaceLeftClass : ""
                                }`}
                        >
                            <div className="footer-title">
                                <h3>Đăng ký</h3>
                            </div>
                            <div className="subscribe-style">
                                <p>Đăng ký để nhận những thông tin mới nhất và sớm nhất.</p>
                                {/* subscribe email */}
                                <input type="text" placeholder='Enter your email address' className='sendEmail' />
                                {/* <SubscribeEmail mailchimpUrl="" /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <button
                className={`scroll-top ${scroll > top ? "show" : ""}`}
                onClick={() => scrollToTop()}
            >
                <KeyboardDoubleArrowUpIcon />
            </button>
        </footer >
    )

}