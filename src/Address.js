import React, { useEffect } from 'react';
import "./Address.css";
import { Typography, Grid, Divider, Container, Card, CardContent, Button, Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemText, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import FormState from './formState';
import axios from './commonComponent/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeSelectedAddress } from './actions';


const fieldSchema = {
    addressLine: {label: 'Address', labelWidth: 100, type: 'text'},
    pincode: {label: 'pincode', labelWidth: 60, type: 'number'},
    city: {label: 'City', labelWidth: 30, type: 'text'},
    state: {label: 'State', labelWidth: 40, type: 'text'},
    country: {label: 'Country', labelWidth: 60, type: 'text'}
};

const validationState = {
    addressLine: {
        required: true,
        validator: {

            validationType: 'address',
            error: 'Enter Valid Address'
        },
        asterisk: '*'
    },
    pincode: {
        required: true,
        validator: {
            validationType: 'pincode',
            error: 'Enter Valid Pin Code'
        },
        asterisk: '*',
    },
    city: {
        required: true,
        validator: {

            validationType: 'alpha',
            error: 'Enter Valid City'
        },
        asterisk: '*',
    },
    state: {
        required: true,
        validator: {

            validationType: 'alpha',
            error: 'Enter Valid State'
        },
        asterisk: '*',
    },
    country: {
        required: true,
        validator: {

            validationType: 'alpha',
            error: 'Enter Valid Country'
        },
        asterisk: '*',
    },
};


function Address(props) {

    const stateForm = {
        addressLine: {value: '', error: ''},
        pincode: {value: '', error: ''},
        city: {value: '', error: ''},
        state: {value: '', error: ''},
        country: {value: '', error: ''},
      };

      const [formState, setFormState] = React.useState(fieldSchema);

      const {state, handleOnChange, handleOnSubmit, disable} = FormState(
        stateForm,
        validationState,
        formSubmit
        );

        const form = [];

        const { user, removeAddress } = props;

        useEffect(() => {
            if(user.editAddress) {
                editAddressData();
            }

            return () => {
                removeAddress();
            }
        }, []);

        let history = useHistory();

        const onChangeCommanFieldFunc = (Fieldvalue, key) => {
          
            handleOnChange(Fieldvalue);
          }
    
          const onBlurCommanFieldFunc = (Fieldvalue, key) => {
            handleOnChange(Fieldvalue);
          }


        function formSubmit() {
            if(user.editAddress._id) {
                updateUserAddress(user.editAddress._id);
            } else {
                postData();
            }

         }
         
    
        const postData = async () => {
    
            const field = stateForm;
            const address = {};
    
            for (let key in field) {
                address[key] = state[key].value;
            }
    
            try {

                const config = {
                    headers: {
                        Authorization: user.authentication.user.token,
                      },
                }
                

                const resp = await axios.post('/user/address', JSON.stringify(address), config);
                if(resp.data.success) {
                    toast.success("Address added Successfully");
                    history.push("/checkout");
                }
            } catch (err) {
                // Handle Error Here
                    toast.error("Failed to add Address");
                    console.error(err);
            }
    
          }


          const editAddressData = async () => {

            let addressData = user.editAddress;
            for(let key in state){
                state[key].value = addressData[key];
                state[key].valid = true;
            }
            setFormState({...formState});

        }


        const updateUserAddress = async (addressId) => {

            const field = stateForm;
            const address = {};
    
            for (let key in field) {
                address[key] = state[key].value;
            }
    
            try {

                const config = {
                    headers: {
                        Authorization: user.authentication.user.token,
                      },
                }
                
                const resp = await axios.put(`/user/address/${addressId}`, JSON.stringify(address), config);
                if(resp.data.success) {
                    toast.success("Address updated Successfully");
                    history.push("/checkout");
                }
            } catch (err) {
                // Handle Error Here
                    toast.error("Failed to update Address");
                    console.error(err);
            }
          }
    
    
          const formField = () => {
    
            {Object.keys(formState).forEach(function (key) {
                switch (key) {
                    case 'addressLine':
                        form.push(
                            <div>
                                <FormControl className='address_addressField' size='small' variant="outlined" key={formState[key].label + key}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label={formState[key].label}
                                        type={formState[key].type}
                                        error={state[key].error}
                                        name={key}
                                        value={state[key].value}
                                        onChange={(event) => onChangeCommanFieldFunc(event, key)}
                                        onBlur={(event) => onBlurCommanFieldFunc(event, key)}
                                        required={validationState[key].required}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        />
                                        <span className="address_label" >
                                            <span className="address_error">{state[key].error}</span> <span className="address_inform" >Max 100 characters</span>  
                                        </span>
                                </FormControl>

                                
                                {/* <span className="address_error" >
                                    {state[key].error}
                                </span> */}
                            </div>
                        )
                        break;
    
                    default :
                        form.push(
                            <div>
                                <FormControl className='address_fieldBtPadding' variant="outlined" key={formState[key].label + key}>
                                    <InputLabel htmlFor={`outlined-adornment-${key}`}>{formState[key].label}</InputLabel>
                                    <OutlinedInput
                                        type={formState[key].type}
                                        error={state[key].error}
                                        name={key}
                                        value={state[key].value}
                                        onChange={(event) => onChangeCommanFieldFunc(event, key)}
                                        onBlur={(event) => onBlurCommanFieldFunc(event, key)}
                                        required={validationState[key].required}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle firstname visibility"
                                            edge="end"
                                            >
                                                {formState[key].adornmentIcon}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={formState[key].labelWidth}
                                    />
                                </FormControl>
                                
                                <span className="address_error" >
                                    {state[key].error}
                                </span>
                            </div>
                        )
                    break;
                }
    
            })}

            return form;

            } 
 
    return (
            <div className="address">
                <Container>
                    <Grid container justify='center' alignItems='flex-start' className="address_container" spacing={3}>
                        <Typography className='address_paddingBt' variant="h5" align="left" component="h2"  >
                            My Account
                        </Typography> 
                        <Divider className="address_dividerHeader" orientation="horizontal" />
                        <Grid container item justify='center' alignItems='center' xs={12} sm={4} md={4} lg={4} className='address_profile'>
                            <div className="address_accordion">
                                <Accordion >
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    alignItems="center"
                                    >
                                    <Typography >Orders</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Link className="address_linkCart" to="/order">
                                            <ListItem
                                            button className="address_buttons"
                                            >
                                                <ListItemText primary="Order" />
                                            </ListItem>
                                        </Link>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider className="address_divider" orientation="horizontal" />
                                <Accordion >
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography >Account</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Link className="address_linkCart" to="/profile">
                                            <ListItem
                                            button className="address_buttons"
                                            >
                                                <ListItemText primary="Profile" />
                                            </ListItem>
                                        </Link>
                                        <Link className="address_linkCart" to="/checkout">
                                            <ListItem
                                            button className="address_buttons"
                                            >
                                                <ListItemText primary="Address" />
                                            </ListItem>
                                        </Link>                                                                          
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                            <Card >
                                <CardContent className='address_list'>
                                    <div className='address_listHeader'>
                                        <Typography  variant='h4'  component="h4">
                                            Add new address
                                        </Typography>
                                    </div>
                                    <Divider className="address_divider" orientation="horizontal" />
                                        {formField()}
                                    <Divider className="address_divider" orientation="horizontal" />
                                    <Button
                                        variant="contained"
                                        className="address_buttonPDF"
                                        startIcon={<SaveIcon />}
                                        onClick={handleOnSubmit} 
                                        disabled={disable}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="address_buttonPDF"
                                        startIcon={<CloseIcon />}
                                    >
                                        Cancel
                                    </Button>
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
        removeAddress: async () => {
            dispatch(removeSelectedAddress());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Address);
