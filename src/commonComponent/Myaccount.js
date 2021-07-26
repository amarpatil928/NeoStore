import React from 'react';
import "./Myaccount.css";
import { Typography, Avatar, Button } from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { Link } from 'react-router-dom';


function Myaccount() {
 
    return (
            <div className="myaccount">
                <div className='myaccount_avatar'>
                    <Avatar src="https://images-na.ssl-images-amazon.com/images/I/81JJrSV64ZL._SL1500_.jpg"  />
                </div>
                <Typography align='center' variant='h6'  component="h2">
                    Shubham soni
                </Typography>
                <Link className="myaccount_linkCart" to="/order">
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<NotesIcon />}
                    >
                        Order
                    </Button>
                </Link>
                <Link className="myaccount_linkCart" to="/profile">
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<AccountBoxIcon />}
                    >
                        Profile
                    </Button>
                </Link>
                <Link className="myaccount_linkCart" to="/checkout">
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<LibraryBooksIcon />}
                    >
                        Address
                    </Button>
                </Link>            
                <Link className="myaccount_linkCart" to="/changePassword">
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<SyncAltIcon />}
                    >
                        Change Password
                    </Button>
                </Link>
            </div>
            )
    }

export default Myaccount
