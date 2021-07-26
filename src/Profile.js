import React, { useEffect } from 'react';
import "./Profile.css";
import { Typography, Grid, Divider, Container, Card, CardContent, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Myaccount from './commonComponent/Myaccount';
import { Link } from 'react-router-dom';


function Profile() {

      const userData = JSON.parse(localStorage.getItem("auth"));
 
    return (
        <div className="profile">
            <Container>
                <Grid container justify='center' alignItems='flex-start' className="profile_container" spacing={3}>
                    <Typography className='profile_paddingBt' variant="h5" align="left" component="h2"  >
                        My Account
                    </Typography> 
                    <Divider className="profile_dividerHeader" orientation="horizontal" />
                    <Grid item justify='center' alignItems='center' xs={12} sm={4} md={5} lg={5} className='profile_profile'>
                        <Myaccount />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <Card >
                            <CardContent className='profile_list'>
                                <div className='profile_listHeader'>
                                    <Typography  variant='h4'  component="h4">
                                       Profile
                                    </Typography>
                                </div>
                                <Divider className="profile_divider" orientation="horizontal" />
                                    <div className='profile_content'>
                                        <Typography>
                                            First Name                                             
                                        </Typography>
                                        <span>
                                            {userData.user.firstName}   
                                        </span>                            
                                    </div>
                                    <div className='profile_content'>
                                        <Typography>
                                            Last Name                                             
                                        </Typography>
                                        <span>
                                            {userData.user.lastName}
                                        </span>                            
                                    </div>
                                    <div className='profile_content'>
                                        <Typography>
                                            Gender                                             
                                        </Typography>
                                        <span>
                                            {userData.user.gender}
                                        </span>                            
                                    </div>
                                    <div className='profile_content'>
                                        <Typography>
                                            Date of Birth                                            
                                        </Typography>
                                        <span>
                                            20/08/2019
                                        </span>                            
                                    </div>
                                    <div className='profile_content'>
                                        <Typography>
                                            Mobile Number                                            
                                        </Typography>
                                        <span>
                                            {userData.user.mobile}
                                        </span>                            
                                    </div>
                                    <div className='profile_content'>
                                        <Typography>
                                            Email                                             
                                        </Typography>
                                        <span>
                                            {userData.user.email}
                                        </span>                            
                                    </div>
                                <Divider className="profile_divider" orientation="horizontal" />
                                <Link className="profile_linkCart" to="/profileForm">
                                    <Button
                                        variant="outlined"
                                        className="profile_buttonPDF"
                                        startIcon={<EditIcon />}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                
                            </CardContent>
                        </Card>                       
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Profile
