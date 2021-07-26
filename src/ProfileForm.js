import React from 'react';
import "./ProfileForm.css";
import { Typography, Grid, Divider, Container, Card, CardContent, Button, Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemText, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import FormState from './formState';
import axios from './commonComponent/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const fieldSchema = {
    firstName: {label: 'First Name', labelWidth: 80, type: 'text'},
    lastName: {label: 'Last Name', labelWidth: 78, type: 'text'},
    gender: {label: 'Gender', labelWidth: 78, type: 'text'},
    DOB: {label: 'Date of Birth', labelWidth: 78, type: 'text'},
    email: {label: 'Email Address', labelWidth: 104, type: 'text'},
    mobile: {label: 'Mobile No.', labelWidth: 75, type: 'number'},
};

const validationState = {
    firstName: {
        required: true,
        validator: {

            validationType: 'alpha',
            error: 'Enter Valid First Name'
        },
        asterisk: '*',
    },
    lastName: {
        required: true,
        validator: {

            validationType: 'alpha',
            error: 'Enter Valid Last Name'
        },
        asterisk: '*',
    },
    gender: {
        required: true,
        validator: {
            error: 'Select Gender',
            validationType: 'alpha'
        },
        asterisk: '*',
    },
    DOB: {
        required: true,
        validator: {

            validationType: 'DOB',
            error: 'Enter Valid Date of birth'
        },
        asterisk: '*'
    },
    mobile: {
        required: true,
        validator: {

            validationType: 'mobile',
            error: 'Enter Valid Mobile Number '
        },
        asterisk: '*',
    },
    email: {
        required: true,
        validator: {

            validationType: 'email',
            error: 'Enter Valid Email'
        },
        asterisk: '*'
    },

};



function ProfileForm() {

    const stateForm = {
        firstName: {value: '', error: ''},
        lastName: {value: '', error: ''},
        gender: {value: '', error: ''},
        DOB: {value: '', error: ''},
        mobile: {value: '', error: ''},
        email: {value: '', error: ''},     
      };

      const [formState, setFormState] = React.useState(fieldSchema);

      const {state, handleOnChange, handleOnSubmit, disable} = FormState(
        stateForm,
        validationState,
        formSubmit
        );

        const form = [];

        const onChangeCommanFieldFunc = (Fieldvalue, key) => {
          
            handleOnChange(Fieldvalue);
          }
    
          const onBlurCommanFieldFunc = (Fieldvalue, key) => {
            handleOnChange(Fieldvalue);
          }


        function formSubmit() {
            postData()
         }
    
        const postData = async () => {
    
            const field = stateForm;
            const forgot = {};
    
            for (let key in field) {
                forgot[key] = state[key].value;
            }
    
            alert(JSON.stringify(forgot))
    
            try {
                const resp = await axios.post('/auth/forgot-password', JSON.stringify(forgot));
                console.log(resp.data.success)
                if(resp.data.success) {
                    toast.success("Login Successfully");
                }
            } catch (err) {
                // Handle Error Here
                    toast.error("Invalid Password");
                    console.error(err);
            }
    
          }
    
    
          const formField = () => {
    
            {Object.keys(formState).forEach(function (key) {
                form.push(
                    <div>
                        <FormControl className='address_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
                        <InputLabel htmlFor={`outlined-adornment-${key}`}>{formState[key].label}</InputLabel>
                        <OutlinedInput
                            type={formState[key].type}
                            error={state[key].error}
                            name={key}
                            value={state[key].value}
                            onChange={(event) => onChangeCommanFieldFunc(event, key)}
                            onBlur={(event) => onBlurCommanFieldFunc(event, key)}
                            required={validationState[key].required}
                            labelWidth={formState[key].labelWidth}
                        />
                        </FormControl>
                        
                        <span className="address_error" >
                            {state[key].error}
                        </span>
                    </div>
                )
    
            })}

            return form;

            } 
 
    return (
            <div className="profileForm">
                <Container>
                    <Grid container justify='center' alignItems='flex-start' className="profileForm_container" spacing={3}>
                        <Typography className='profileForm_paddingBt' variant="h5" align="left" component="h2"  >
                            My Account
                        </Typography> 
                        <Divider className="profileForm_dividerHeader" orientation="horizontal" />
                        <Grid item justify='center' alignItems='center' xs={12} sm={4} md={4} lg={4} className='profileForm_profile'>
                            <div className="profileForm_accordion">
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
                                        <Link className="profileForm_linkCart" to="/order">
                                            <ListItem
                                            button className="profileForm_buttons"
                                            >
                                                <ListItemText primary="Order" />
                                            </ListItem>
                                        </Link>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider className="profileForm_divider" orientation="horizontal" />
                                <Accordion >
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography >Account</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Link className="profileForm_linkCart" to="/profile">
                                            <ListItem
                                            button className="profileForm_buttons"
                                            >
                                                <ListItemText primary="Profile" />
                                            </ListItem>
                                        </Link>
                                        <Link className="profileForm_linkCart" to="/checkout">
                                            <ListItem
                                            button className="profileForm_buttons"
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
                                <CardContent className='profileForm_list'>
                                    <div className='profileForm_listHeader'>
                                        <Typography  variant='h4'  component="h4">
                                            Add Profile Details 
                                        </Typography>
                                    </div>
                                    <Divider className="profileForm_divider" orientation="horizontal" />
                                        {formField()}
                                    <Divider className="profileForm_divider" orientation="horizontal" />
                                    <Button
                                        variant="contained"
                                        className="profileForm_buttonPDF"
                                        startIcon={<SaveIcon />}
                                        onClick={handleOnSubmit} 
                                        disabled={disable}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="profileForm_buttonPDF"
                                        startIcon={<CloseIcon />}
                                    >
                                        Cancel
                                    </Button>
                                </CardContent>
                            </Card>                       
                        </Grid>
                    </Grid>
                </Container>

                <ToastContainer position="top-center" />

            </div>
            )
}

export default ProfileForm
