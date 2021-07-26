import React from 'react';
import './Cart.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Grid, Stepper, Step, StepLabel, Avatar, Card, CardContent, IconButton, Box, Divider, Button } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, setProductCount } from "./actions";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(image, name, company, status,  calories, fat, carbs, protein) {
  return { image, name, company, status, calories, fat, carbs, protein };
}


const slideImages = [
  'https://images-na.ssl-images-amazon.com/images/I/81i6R3r1rsL._SL1500_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/81JJrSV64ZL._SL1500_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/71tyC9HySeL._SL1210_.jpg'
];

const rows = [
  createData(<Avatar variant='square' src={`${slideImages[0]}`} />, "Winchester Fabric Sofa", "By Winchester Pvt. Ltd.", "In Stock", 159, 59999, 59999, <DeleteOutlineOutlinedIcon />),
  createData(<Avatar variant='square' src={`${slideImages[1]}`} />, "Robinson", "By Somu Stores", "In Stock", 237, 40000, 40000, <DeleteOutlineOutlinedIcon />),
  createData(<Avatar variant='square' src={`${slideImages[2]}`} />, "Winchester Fabric", "By Winchester Pvt. Ltd.", "In Stock", 262, 30000, 30000, <DeleteOutlineOutlinedIcon />)
];

 function Cart() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const productsCount = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  function getSteps() {
    return ['Cart', 'Delivery Address'];
  }

  const restrictZero = (event) => {
    if(event.target.value.length === 0 && event.key === "0"){
      event.preventDefault();
    }
  }

  return (
          <div className="cart">
            <Container>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

                <Grid container justify='center' alignItems='flex-start' spacing={4} className="cart_container" >
                    <Grid item xs={12} sm={6} md={8} lg={8}>
                      <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell align="center" >Quality</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right">Total</TableCell>
                              <TableCell align="right"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell >
                                  <Grid container justify='center' alignItems='center' spacing={3} >
                                    <Grid item xs={12} sm={12} md={4} lg={2} className="cart_avatar">  
                                      {row.image}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={10}> 
                                      <Typography>{row.name}</Typography>
                                      <Typography>{row.company}</Typography>
                                      <Typography>{row.status}</Typography>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell >
                                  <div className="cart_quantity">
                                    <IconButton onClick={() => dispatch(decrement(1))} disabled={productsCount <= 1} className="cart_button">
                                      <RemoveIcon />
                                    </IconButton>
                                     <input type="number" value={productsCount} onKeyDown={(event)=> restrictZero(event)} onChange={(e) => dispatch(setProductCount(parseInt(e.target.value)))} className="cart_input" />
                                    <IconButton onClick={() => dispatch(increment(1))} className="cart_button" >
                                      <AddIcon />
                                    </IconButton>                                           
                                  </div>
                                </TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{productsCount*row.carbs}</TableCell>
                                <TableCell align="right">
                                  <IconButton color="secondary">
                                      <DeleteOutlineOutlinedIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Card>
                        <CardContent>
                          <div className="cart_reviewOrder">
                            <Typography variant="h5" component="h2">
                              Review Order
                            </Typography>
                          </div> 
                          <Grid Container justify='space-between'  alignItems="center" className='cart_subtotal'>
                            <Box >
                              Subtotal
                            </Box>
                            <Box p={1}>
                              159998
                            </Box>
                          </Grid>
                          <Divider className="cart_divider" orientation="horizontal" />
                          <Grid Container justify='space-between'  alignItems="center" className='cart_subtotal'>
                            <Box >
                              GST(5%)
                            </Box>
                            <Box p={1}>
                              8000
                            </Box>
                          </Grid>
                          <Divider className="cart_divider" orientation="horizontal" />
                          <Grid Container justify='space-between'  alignItems="center" className='cart_subtotal'>
                            <Box >
                              Order Total
                            </Box>
                            <Box p={1}>
                              167998
                            </Box>
                          </Grid>
                          <Divider className="cart_divider" orientation="horizontal" />
                          <Link className="cart_linkCart" to="/checkout">
                            <Button fullWidth variant='contained' color='primary' >
                              Proceed To Buy
                            </Button>
                          </Link>                      
                        </CardContent>
                      </Card>
                    </Grid>
                </Grid>
            </Container>
          </div>
  );
}

export default Cart;