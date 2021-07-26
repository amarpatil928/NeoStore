import './AllProducts.css';
import React, { useEffect, useState} from 'react';
import { Typography, Grid, Container, Divider, Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemText, Card } from '@material-ui/core';
import Product from './Product';
import StarRatings from 'react-star-ratings';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowDownward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from './commonComponent/axios';
import RectLoader from './commonComponent/rectLoader';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./actions";


function AllProducts() {

    const [page, setPage] = useState(1);
    const allProduct = useSelector((state) => state.allProducts.products);
    const [productItems, setProductItems] = useState([]);
    const [loader, setLoader] = useState(true);

    const searchData = useSelector((state)=> state.searchList);

    const dispatch = useDispatch();

    useEffect(() => {
        getProductsList();
    }, [page]);

    useEffect(() => {
        searchHandler();
    }, [searchData]);


    const searchHandler = () => {
        if(searchData !== ''){
            let updatedList = allProduct.filter((item)=> {
               return Object.values(item).join(" ").toLowerCase().includes(searchData.toLowerCase());
            });
            setProductItems(updatedList);
        } else {
            setProductItems(allProduct);
        }
    }

    const getProductsList = async () => {

        try {
            const resp = await axios.get(`/product?page=${page}&limit=9`);
            let records = resp.data;
            setProductItems(records.data.docs);
            dispatch(setProducts(records.data.docs));
            setLoader(false);
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }

      }

        const filterItem = (itemId) => {
            
          const updatedItems = allProduct.filter((curItem) => {
              return curItem.category.name === itemId || curItem.color.name === itemId;
          });
          setProductItems(updatedItems);
      }

    
    return (
            <div className="allProducts">
                <div className="allProducts_container">
                <Divider className="allProducts_divider" orientation="horizontal" />
                    <div >
                        <Container>
                            <Grid container justify='center' alignItems="flex-start" spacing={3} >
                                <Grid item xs={12} sm={4} md={3} lg={3} >
                                    <div className="allProducts_accordion">
                                        <Card>
                                            <ListItem
                                            button className="allProducts_buttons"
                                            onClick={() => setProductItems(allProduct)}
                                            >
                                                <ListItemText primary="All Products" />
                                            </ListItem>
                                        </Card>
                                        <Accordion className="allProducts_details">
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            alignItems="center"
                                            >
                                            <Typography >Categories</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Table')}
                                                >
                                                    <ListItemText primary="Table" />
                                                </ListItem>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Sofa')}
                                                >
                                                    <ListItemText primary="Sofa" />
                                                </ListItem>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Bed')}
                                                >
                                                    <ListItemText primary="Bed" />
                                                </ListItem>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Cupboard')}
                                                >
                                                    <ListItemText primary="Cupboard" />
                                                </ListItem>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion className="allProducts_details">
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography >Color</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Red')}
                                                >
                                                    <ListItemText primary="Red" />
                                                </ListItem>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Black')}
                                                >
                                                    <ListItemText primary="Black" />
                                                </ListItem>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Green')}
                                                >
                                                    <ListItemText primary="Green" />
                                                </ListItem>
                                                <ListItem
                                                button className="allProducts_buttons"
                                                onClick={() => filterItem('Yellow')}
                                                >
                                                    <ListItemText primary="Yellow" />
                                                </ListItem>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9} lg={9} >
                                    <div className="allProducts_header">
                                        <Typography className="allProducts_headerWidth">
                                            <span className="allProducts_subHeader">
                                                <span className="allProducts_text">Sort By:</span>  
                                                <span >
                                                    <StarRatings
                                                        rating={1}
                                                        starRatedColor="rgb(24, 90, 188)"
                                                        numberOfStars={1}
                                                        starDimension="20px"
                                                        />
                                                </span>
                                                <span className="allProducts_arrows">
                                                    ₹<ArrowUpwardIcon />
                                                </span>
                                                <span className="allProducts_arrows">
                                                    ₹<ArrowDownwardIcon />
                                                </span>
                                            </span>
                                        </Typography>
                                    </div>
                                    <div>
                                    <Grid container>
                                    {loader ? 
                                            <RectLoader />
                                            :
                                            productItems.map(product => (
                                                <Grid item xs={12} sm={6} md={4} lg={4} key={product.id} >
                                                    <div >
                                                        <Product 
                                                        id={product.id}
                                                        title={product.name}
                                                        price={product.price}
                                                        image={product.mainImage}
                                                        rating={product.avgRating}
                                                        />
                                                        
                                                    </div>
                                                </Grid>
                                            ))
                                    }  
                                        
                                    </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                            <Divider className="allProducts_dividerTopMargin" orientation="horizontal" />
                                <Pagination 
                                 className="allProducts_pagination"
                                 count={10}
                                 color="primary" 
                                 page={page} 
                                 onChange={(event, value) => setPage(value)} />
                            <Divider className="allProducts_divider" orientation="horizontal" />
                        </Container>
                    </div>
                </div>
            </div>
    )   
}

export default AllProducts;