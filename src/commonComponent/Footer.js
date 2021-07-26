import React from 'react';
import './Footer.css';
import { Button, Grid, Container } from '@material-ui/core';

function Footer() {
    return (
        <div className="footer">
            <div className="footer_content">
                <Container>
                    <Grid container justify='space-around' alignItems='center' >
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <div className="footer_option">
                                <h4>
                                    About Comppany
                                </h4>
                                <div className="footer_text">
                                    <div>
                                        NeoSOFT Technologies is here at your quick and easy servoice for shoping.
                                    </div>
                                    <div>
                                        Contact Information
                                    </div>
                                    <div>
                                        Email: contact@neosoftmail.com
                                    </div>
                                    <div>
                                        Phone: +91 9900223344
                                    </div>
                                    <div>
                                        Mumbai, INDIA
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <div className="footer_option">
                                <h4>
                                    Information
                                </h4>
                                <div className="footer_text">
                                    <div>
                                        Terms and Conditions
                                    </div>
                                    <div>
                                        Guaraties and Return Policy
                                    </div>
                                    <div>
                                        Contact Us
                                    </div>
                                    <div>
                                        Privacy Policy
                                    </div>
                                    <div>
                                        Locate Us
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <div className="footer_option">
                                <h4>
                                    Newslettre
                                </h4>
                                <div className="footer_text">
                                    <div>
                                        Sign up to get active offer from our favourite brands and to mail up in the news
                                    </div>
                                    <div className="footer_input">
                                        <input type="text" placeholder="your email.." />
                                    </div>
                                    <div className="footer_button">
                                        <Button >Subscribe</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <span className="footer_bottom">Copyright 2021 NeoSOFT Technologies All right | Designed By </span>
            
        </div>
    )
}

export default Footer;