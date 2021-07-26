import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container } from '@material-ui/core';
import Product from './Product';
import axios from './commonComponent/axios';
import RectLoader from './commonComponent/rectLoader';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./actions"


function Dashboard() {

    const allProducts = useSelector((state) => state.allProducts.products);
    const [productItems, setProductItems] = useState([]);
    // const [productSearchList, setProductSearchList] = useState([]);
    const [loader, setLoader] = useState(true);

    const searchData = useSelector((state)=> state.searchList);

    const dispatch = useDispatch();

    const slideImages = [
        'https://images-na.ssl-images-amazon.com/images/I/81i6R3r1rsL._SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/81JJrSV64ZL._SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71tyC9HySeL._SL1210_.jpg'
      ];


    useEffect(() => {
        getProductsList();
    }, []);


    useEffect(() => {
        searchHandler();
    }, [searchData]);


    const searchHandler = () => {
        if(searchData !== ''){
            let updatedList = allProducts.filter((item)=> {
               return Object.values(item).join(" ").toLowerCase().includes(searchData.toLowerCase());
            });
            setProductItems(updatedList);
        } else {
            setProductItems(allProducts);
        }
    }

    const getProductsList = async () => {

        try {
            const resp = await axios.get('/product').then((result) => {
                let records = result.data;
                setProductItems(records.data.docs);
                dispatch(setProducts(records.data.docs));
                setLoader(false);
            });
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
      }

    
    return (
            <div className="dashboard">
                <div className="dashboard_container">
                    <div className="slide-container">
                        <Slide>
                            <div className="each-slide">
                                <div style={{'backgroundImage': `url(${slideImages[0]})`, 'backgroundSize': "cover", 'backgroundRepeat': "no-repeat", 'backgroundPosition': "center", 'height': "285px"}}>
                                </div>
                            </div>
                            <div className="each-slide">
                                <div style={{'backgroundImage': `url(${slideImages[1]})`, 'backgroundSize': "cover", 'backgroundRepeat': "no-repeat", 'backgroundPosition': "center", 'height': "285px"}}>
                                </div>
                            </div>
                            <div className="each-slide">
                                <div style={{'backgroundImage': `url(${slideImages[2]})`, 'backgroundSize': "cover", 'backgroundRepeat': "no-repeat", 'backgroundPosition': "center", 'height': "285px"}}>
                                </div>
                            </div>
                        </Slide>
                    </div>
                    {/* <img className="dashboard_image" src="https://m.media-amazon.com/images/G/01/digital/video/sonata/US_SVOD_NonPrime_Banner/f69c4124-8751-4646-b8de-14e68f14ff8e._UR3000,600_SX1500_FMwebp_.jpg" alt="" /> */}
                    <div className="dashboard_header">
                        <Typography className='dashboard_paddingBt' variant="h6" component="h6"  >
                            Popular Product
                        </Typography>
                        <span>
                            View All
                        </span>
                        <Container>
                            <Grid container justify='center' alignItems='center' >     
                            {loader ? 
                                    <RectLoader />
                                    :
                                    productItems.map(product => (
                                        <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
                                            <div >
                                                <Product 
                                                id={product.id}
                                                title={product.name}
                                                price={product.price}
                                                image={product.mainImage}
                                                rating={product.avgRating}
                                                subImages={product.subImages}
                                                description={product.description}
                                                color={product.color}
                                                features={product.features}
                                                />
                                                
                                            </div>
                                        </Grid>
                                    ))
                            }  
                                
                            </Grid>
                        </Container>
                    </div>
                </div>
            </div>
    )   
}

export default Dashboard;