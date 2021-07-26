import React, { useEffect, useState } from 'react';
import "./ProductDetail.css";
import { Typography, Divider, Button, Box, Grid, Container, Tabs, Tab } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import ShareIcon from '@material-ui/icons/Share';
import {
    FacebookShareButton,
    // GooglePlusShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    TwitterShareButton
  } from 'react-share';

  import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    // GooglePlusIcon,
    PinterestIcon,
  } from 'react-share';
import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from './actions';
import axios from './commonComponent/axios';


    function TabPanel(props) {

            const { children, value, index, ...other } = props;

            return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-force-tabpanel-${index}`}
                aria-labelledby={`scrollable-force-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
                )}
            </div>
            );
        }
        
        TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
        };
        
        function a11yProps(index) {
            return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,
            };
        }

function ProductDetail(props) {


    const { productData } = props;
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const products = useSelector((state) => state.allProducts.products);
    
    // const productDetail = useSelector((state) => state.product);
    const [productDetail, setProductDetail] = useState({});
    const [loader, setLoader] = useState(true);


    const { productId } = useParams();


    const dispatch = useDispatch();

     const getProductDetail = () => {

        products.map((data) => {
            
            if(productId === data.id){
                dispatch(selectedProduct(data));
                setProductDetail(data);
            }
        })

      }

      useEffect(() => {
          if (productId && productId !== "") getProductDetail();
          return () => {
              dispatch(removeSelectedProduct());
          }
      }, [productId]);


      const tabPanelData = () => (
        productDetail.subImages.map((product, i) => {
           return  (
                <TabPanel className="productDetail_tabPanel" value={value} index={i}>
                <ReactImageMagnify className="productDetail_imageMagnify" {...{
                            smallImage: {
                                isFluidWidth: true,
                                src: `${product}`
                            },
                            largeImage: {
                                src: `${product}`,
                                width: 1200,
                                height: 1800
                            },
                            // enlargedImageContainerDimensions: {width: '100%', height: '130%'}
                        }} />
                </TabPanel>
            )
        })
      )

      const tabsData = () => (
        productDetail.subImages.map((product, i) => {
          return  (
                <Tab 
                className="productDetail_tabs"
                component={() => (
                    <Button className="productDetail_tabImage" onClick={() => setValue(i)}> 
                        <img style={{'width': "80%", 'height': "80%", 'objectFit': 'cover'}} src={`${product}`} /> 
                        <div>Description</div>
                    </Button>
                    )}
                    {...a11yProps(0)} />
            )
        } )
      )

    const tabImages = [
        'https://images-na.ssl-images-amazon.com/images/I/81i6R3r1rsL._SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/81JJrSV64ZL._SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71tyC9HySeL._SL1210_.jpg'
      ];

 
    return (
        <div className="productDetail">
            <Container>
                <Grid container justify='center' alignItems="center" spacing={3} >
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        {/* {tabPanelData()} */}
                        
                        <TabPanel className="productDetail_tabPanel" value={value} index={0}>
                        <ReactImageMagnify className="productDetail_imageMagnify" {...{
                                    smallImage: {
                                        isFluidWidth: true,
                                        src: `${tabImages[0]}`
                                    },
                                    largeImage: {
                                        src: `${tabImages[0]}`,
                                        width: 1200,
                                        height: 1800
                                    },
                                }} />
                        </TabPanel>
                        <TabPanel className="productDetail_tabPanel" value={value} index={1}>
                        <ReactImageMagnify className="productDetail_imageMagnify" {...{
                                    smallImage: {
                                        isFluidWidth: true,
                                        src: `${tabImages[1]}`
                                    },
                                    largeImage: {
                                        src: `${tabImages[1]}`,
                                        width: 1200,
                                        height: 1800
                                    }
                                }} />
                        </TabPanel>
                        <TabPanel className="productDetail_tabPanel" value={value} index={2}>
                        <ReactImageMagnify className="productDetail_imageMagnify" {...{
                                    smallImage: {
                                        isFluidWidth: true,
                                        src: `${tabImages[2]}`
                                    },
                                    largeImage: {
                                        src: `${tabImages[2]}`,
                                        width: 1200,
                                        height: 1800
                                    }
                                }} />
                        </TabPanel>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                            className="productDetail_tab"
                            >
                            {/* {tabsData()} */}
                            <Tab 
                            className="productDetail_tabs"
                            component={() => (
                                <Button className="productDetail_tabImage" onClick={() => setValue(0)}> 
                                    <img style={{'width': "80%", 'height': "80%", 'objectFit': 'cover'}} src={`${tabImages[0]}`} /> 
                                    <div>Description</div>
                                </Button>
                                )}
                                {...a11yProps(0)} />
                            <Tab 
                            component={() => (
                                <Button className="productDetail_tabImage" onClick={() => setValue(1)}> 
                                   <img style={{'width': "80%", 'height': "80%", 'objectFit': 'cover'}} src={`${tabImages[1]}`} /> 
                                    <div>Features</div>
                                </Button>
                                )}
                            {...a11yProps(1)} />
                            <Tab 
                            component={() => (
                                <Button className="productDetail_tabImage" onClick={() => setValue(2)}> 
                                    <img style={{'width': "80%", 'height': "80%", 'objectFit': 'cover'}} src={`${tabImages[2]}`} /> 
                                    <div></div>
                                </Button>
                                )}
                            {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                         <Grid container alignItems='center'>
                            <div>
                                <Typography className='productDetail_heading' variant="h4"  component="h4"  >
                                    Winchester Fabric Sofa
                                </Typography> 
                                <Box component="fieldset" className='productDetail_rightAlign' mb={3} borderColor="transparent">
                                    <Rating
                                    // name="customized-empty"
                                    defaultValue={4}
                                    // precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    />
                                </Box>
                            </div>
                            <Divider className="productDetail_divider" orientation="horizontal" />
                            <div className="productDetail_container">
                                <div className="productDetail_bottomPadding">
                                    <Typography className='productDetail_rightAlign'>
                                        Price: <span className="productDetail_price">₹59999</span>
                                    </Typography>
                                    <Typography className='productDetail_rightAlign'>
                                        Color: <span style={{'color': 'red'}}>Red</span>
                                    </Typography>
                                </div>
                                <div >
                                    <div className="productDetail_share" variant="h5"  component="h5">
                                        Share <ShareIcon />
                                    </div>
                                </div>
                                <Grid containe >
                                    <Grid item sm={12} md={12} lg={12} className="productDetail_socialShare">
                                        <FacebookShareButton className="productDetail_socialShareButtons" url="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" quote="share and subscribe" hashtag="#React" >
                                            <FacebookIcon size={52} round={true}  />
                                        </FacebookShareButton>
                                        {/* <GooglePlusShareButton className="productDetail_socialShareButtons" url="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" quote="share and subscribe" hashtag="#React" >
                                            <GooglePlusIcon size={52} round={true}  />
                                        </GooglePlusShareButton> */}
                                        <LinkedinShareButton className="productDetail_socialShareButtons" url="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" quote="share and subscribe" hashtag="#React" >
                                            <LinkedinIcon size={52} round={true}  />
                                        </LinkedinShareButton>
                                        <WhatsappShareButton className="productDetail_socialShareButtons" url="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" quote="share and subscribe" hashtag="#React" >
                                            <WhatsappIcon size={52} round={true}  />
                                        </WhatsappShareButton>
                                        <PinterestShareButton className="productDetail_socialShareButtons" url="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" quote="share and subscribe" hashtag="#React" >
                                            <PinterestIcon size={52} round={true}  />
                                        </PinterestShareButton>
                                        <TwitterShareButton className="productDetail_socialShareButtons" url="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" quote="share and subscribe" hashtag="#React" >
                                            <TwitterIcon size={52} round={true}  />
                                        </TwitterShareButton>
                                    </Grid>
                                </Grid>
                                <div className="productDetail_socialShare">
                                    <div className="productDetail_cartButton">
                                        <Button variant='contained'  >
                                            Add To Cart
                                        </Button>
                                    </div>
                                    <div className="productDetail_rateButton">
                                        <Button variant='contained'  >
                                            Rate Product
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                         </Grid>
                    </Grid>
                </Grid>
                <Divider className="productDetail_divider" orientation="horizontal" />
                <Typography className="productDetail_bottomLine">
                    Since sofa
                </Typography>
            </Container>    
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        productData: state,
    };
};

export default connect(mapStateToProps)(ProductDetail);
