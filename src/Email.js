import './Email.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import FormState from './formState';
import InfoIcon from '@material-ui/icons/Info';
import { Link, useHistory } from 'react-router-dom';
import axios from './commonComponent/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const fieldSchema = {
    email: {label: 'Email Address', labelWidth: 122, type: 'email'},
};

const validationState = {
    email: {
        required: true,
        validator: {
            validationType: 'email',
            error: 'Enter Valid Email Address'
        },
        asterisk: '*'
    },
};


function Email() {

    const stateForm = {
        email: {value: '', error: ''}
      };

      const [formState, setFormState] = React.useState(fieldSchema);

      const {state, handleOnChange, handleOnSubmit, disable} = FormState(
        stateForm,
        validationState,
        formSubmit
    );

      let form = [];

      const onChangeCommanFieldFunc = (Fieldvalue, key) => {
        handleOnChange(Fieldvalue);
      }

      const onBlurCommanFieldFunc = (Fieldvalue, key) => {
        handleOnChange(Fieldvalue);
      }

      function formSubmit() {
        postData()
    }

    let history = useHistory();

    const postData = async () => {

        const field = stateForm;
        const email = {};

        for (let key in field) {
            email[key] = state[key].value;
        }

        try {
            const resp = await axios.post('/auth/forgot-password', JSON.stringify(email));
            console.log(resp.data.success)
            if(resp.data.success) {
                history.push("/forgot");
                toast.success("verification code sent successfully");
            }
        } catch (err) {
            // Handle Error Here
                toast.error("Invalid Email Address");
                console.error(err);
        }

      }


      const formField = () => {

        {Object.keys(formState).forEach(function (key) {
            form.push(
                <div>
                    <FormControl className='email_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
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
                    
                    <span className="email_error" >
                        {state[key].error}
                    </span>
                </div>
            )

        })}
        return form;
        } 

    return (
            <div className="email">

                <Grid container justify='center' alignItems='center' >

                    <div className="email_title">
                        <Typography className='registration_paddingBt' variant="h5" align="left" component="h2"  >
                            Recover Password
                        </Typography>
                    </div> 

                    <Divider className="email_divider" orientation="horizontal" />
                    
                    <Grid item xs={10} sm={6} lg={6}>
                        <div className="email_card">
                            <Card >
                                <CardContent >
                                    <span className="email_inform" >
                                       <InfoIcon fontSize="small" />
                                       Enter your user account's verified email address and we will send you a verification code
                                    </span>   
                                    <div >
                                        {formField()}
                                        <div className="email_button">
                                            <Button variant="contained" onClick={handleOnSubmit} disabled={disable}>Submit</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>   
                    </Grid>
                </Grid>

            </div>
    )   
}

export default Email;