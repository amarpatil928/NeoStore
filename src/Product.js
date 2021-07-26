import React from 'react';
import "./Product.css";
import { Typography, Card, Button, CardMedia, CardActionArea, Box } from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';


function Product({ id, title, image, price, rating, subImages, description, color, features }) {

    // const dispatch = useDispatch((state) => )

    const addToCart = () => {};
 
    return (
        <div className="product">
            <Card className="product_card">
                    <Link className="product_link" to={`/productDetail/${id}`}>
                        <CardActionArea>
                            <CardMedia
                            className="product_image"
                            image={image}
                            title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Link>
                    <Typography color="primary" >
                        <Link className="product_link" to={`/productDetail/${id}`}>
                            {title}
                        </Link>
                    </Typography>
                    <Typography className="product_price" >
                        <Link className="product_linkPrice" to={`/productDetail/${id}`}>
                            <strong>₹{price}</strong>
                        </Link>
                    </Typography>
                    <Button variant="contained" size="small" color="secondary" onClick={addToCart}>
                        add to Basket
                    </Button>
                     <div className="product_rating">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                            // name="customized-empty"
                            defaultValue={rating}
                            // precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            />
                        </Box>
                        {/* <StarRatings
                            rating={rating}
                            starRatedColor="#FDCC0D"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="2px"
                            /> */}
                    </div>
                </Card>
        </div>
    )
}

export default Product
