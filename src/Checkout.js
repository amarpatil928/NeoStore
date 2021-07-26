import React, { useEffect, useState } from 'react';
import "./Checkout.css";
import { Typography, Grid, Divider, Container, Card, CardContent, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Myaccount from './commonComponent/Myaccount';
import { Link } from 'react-router-dom';
import axios from './commonComponent/axios';
import { connect, useSelector } from 'react-redux';
import RectLoader from './commonComponent/rectLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAddress, setAddresses } from './actions';


function Checkout(props) {

    const { user, editAddress, allAddress } = props;
    const [loader, setLoader] = useState(true);
    const [addresses, setAddresses] = useState([]);

    const searchData = useSelector((state)=> state.searchList);
    
    useEffect(() => {
        getAddressList();
    }, []);

    useEffect(() => {
        searchHandler();
    }, [user.searchList]);


    const searchHandler = () => {
        if(user.searchList !== ''){
            let updatedList = user.addresses.addresses.filter((item)=> {
               return Object.values(item).join(" ").toLowerCase().includes(user.searchList.toLowerCase());
            });
            setAddresses(updatedList);
        } else {
            setAddresses(user.addresses.addresses);
        }
    }

    const getAddressList = async () => {

        try {

            const config = {
                headers: {
                    Authorization: user.authentication.user.token,
                  },
            }

            const resp = await axios.get('/user/address', config).then((result) => {
                setAddresses(result.data.data.address);
                allAddress(result.data.data.address);
                setLoader(false);
            });
            
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
      }

      const deleteAddress = async (id) => {
        try {

            const config = {
                headers: {
                    Authorization: user.authentication.user.token,
                  },
            }

            const resp = await axios.delete(`/user/address/${id}`, config).then((result) => {
                getAddressList()
                toast.success("Address deleted Successfully");
            });
            
        } catch (err) {
            // Handle Error Here
            toast.error("Address delete failed");
            console.error(err);
        }

      }

    return (
        <div className="checkout">
            <Container>
                <Grid container justify='center' alignItems='flex-start' className="checkout_container" spacing={3}>
                    <Typography className='checkout_paddingBt' variant="h5" align="left" component="h2"  >
                        My Account
                    </Typography> 
                    <Divider className="checkout_dividerHeader" orientation="horizontal" />
                    <Grid item justify='center' alignItems='center' xs={12} sm={4} md={5} lg={5} className='checkout_profile'>
                        <Myaccount />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <Card >
                            <CardContent className='checkout_list'>
                                <div className='checkout_listHeader'>
                                    <Typography  variant='h4'  component="h4">
                                       Addresses
                                    </Typography>
                                </div>
                                <Divider className="checkout_divider" orientation="horizontal" />
                                {loader ? 
                                            <RectLoader />
                                            :
                                            addresses.map((address) => (
                                                <div className="checkout_card" key={address._id} >
                                                    <Card >
                                                        <CardContent >
                                                            <div className='checkout_innerCard'>
                                                                <div>
                                                                    <Typography>
                                                                        {address.addressLine}
                                                                    </Typography>
                                                                    <Typography>
                                                                        {address.city}- {address.pincode} {address.state}
                                                                    </Typography>                                            
                                                                    <Typography>
                                                                        {address.country}
                                                                    </Typography>
                                                                </div> 
                                                                <div className='checkout_closeIcon'>
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        color="inherit"
                                                                        size="small"
                                                                        onClick={() => deleteAddress(address._id)}
                                                                        >
                                                                        <CloseIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                </div>
                                                            </div> 
                                                            <Link className="checkout_linkCart" to="/address">
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className="order_buttonPDF"
                                                                    onClick={() => editAddress(address)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Link>                                                                             
                                                        </CardContent>
                                                    </Card>
                                                </div>
              
                                                
                                            ))
                                    }          
                                <Divider className="checkout_divider" orientation="horizontal" />
                                <Link className="checkout_linkCart" to="/address">
                                    <Button
                                        variant="contained"
                                        className="checkout_buttonPDF"
                                    >
                                        Add Address
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

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        allAddress: async (addressList) => {
            dispatch(setAddresses(addressList));
        },
        editAddress: async (addressData) => {
            dispatch(editUserAddress(addressData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
