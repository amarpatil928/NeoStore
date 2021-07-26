import React, { useEffect, useState } from 'react';
import "./Order.css";
import { Typography, Grid, Divider, Container, Avatar, Card, CardContent, Button } from '@material-ui/core';
import Myaccount from './commonComponent/Myaccount';
import axios from './commonComponent/axios';
import { connect } from 'react-redux';
import RectLoader from './commonComponent/rectLoader';

function Order(props) {

    const { user } = props;

    const [productItems, setProductItems] = useState([]);
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        getProductsList();
    }, []);


    const getProductsList = async () => {

        try {

            const config = {
                headers: {
                    Authorization: user.authentication.user.token,
                  },
            }

            const resp = await axios.get('/order', config);
            setProductItems(resp.data.data.orders);
            setLoader(false);
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }

      }
      
      const dateCovert = (date) => {
          const orderDate = new Date(date);
          let dd = orderDate.getDate();
          let mm = orderDate.getMonth() + 1;
          let yyyy = orderDate.getFullYear();
          return dd + '/' + mm + '/' + yyyy;
      }

 
    return (
        <div className="order">
            <Container>
                <Grid container justify='center' alignItems='flex-start' className="order_container" spacing={3}>
                    <Typography className='order_paddingBt' variant="h5" align="left" component="h2"  >
                        My Account
                    </Typography> 
                    <Divider className="order_dividerHeader" orientation="horizontal" />
                    <Grid item justify='center' alignItems='center' xs={12} sm={12} md={5} lg={5} className='order_profile'>
                        <Myaccount />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                            {loader ? 
                                    <RectLoader />
                                    :
                                    productItems.map((order, index) => (
                                        order["items"].map((product) => (
                                            <Card className='order_card'>
                                            <CardContent className='order_llist'>
                                                <div className='order_listHeader'>
                                                    <Typography  variant='h6'  component="h2">
                                                        <span className='order_transit'>TRANSIT</span> Order By:ORDERNO_{index}
                                                    </Typography>
                                                </div>
                                                <Typography>
                                                    Placed on: {dateCovert(order.createdAt)} / <span className='order_price'>₹{product.productId.price}</span>
                                                </Typography>
                                                <Divider className="order_divider" orientation="horizontal" />
                                                <div className='order_images'>
                                                    {product.productId.subImages.map((subImage) => (
                                                        <Avatar className='order_avatarPR' variant='square' src={`${subImage}`} />
                                                    ))}
                                                </div>          
                                                <Divider className="order_divider" orientation="horizontal" />
                                                <Button
                                                variant="contained"
                                                color="primary"
                                                className="order_buttonPDF"
                                            >
                                                Download Invoice as PDF
                                            </Button>

                                            </CardContent>
                                        </Card>
                                        ))
                                    ))
                            } 
                        {/* <Card className='order_card'>
                            <CardContent className='order_llist'>
                                <div className='order_listHeader'>
                                    <Typography  variant='h6'  component="h2">
                                        <span className='order_transit'>TRANSIT</span> Order By:ORDERNO_1
                                    </Typography>
                                </div>
                                <Typography>
                                    Placed on: 28/08/2019 / <span className='order_price'>₹62999</span>
                                </Typography>
                                <Divider className="order_divider" orientation="horizontal" />
                                <div className='order_images'>
                                    <Avatar className='order_avatarPR' variant='square' src="https://images-na.ssl-images-amazon.com/images/I/81JJrSV64ZL._SL1500_.jpg" />
                                </div>          
                                <Divider className="order_divider" orientation="horizontal" />
                                <Button
                                variant="contained"
                                color="primary"
                                className="order_buttonPDF"
                            >
                                Download Invoice as PDF
                            </Button>

                            </CardContent>
                        </Card>
                        <Card className='order_card'>
                            <CardContent className='order_llist'>
                                <div className='order_listHeader'>
                                    <Typography  variant='h6'  component="h2">
                                        <span className='order_transit'>TRANSIT</span> Order By:ORDERNO_1
                                    </Typography>
                                </div>
                                <Typography>
                                    Placed on: 28/08/2019 / <span className='order_price'>₹62999</span>
                                </Typography>
                                <Divider className="order_divider" orientation="horizontal" />
                                <div className='order_images'>
                                    <Avatar className='order_avatarPR' variant='square' src="https://images-na.ssl-images-amazon.com/images/I/81JJrSV64ZL._SL1500_.jpg" />
                                    <Avatar className='order_avatarPR' variant='square' src="https://images-na.ssl-images-amazon.com/images/I/71tyC9HySeL._SL1210_.jpg" />
                                </div>
                                <Divider className="order_divider" orientation="horizontal" />
                                <Button
                                variant="contained"
                                color="primary"
                                className="order_buttonPDF"
                            >
                                Download Invoice as PDF
                            </Button>

                            </CardContent>
                        </Card> */}
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

export default connect(mapStateToProps)(Order);