import './Forgot.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormState from './formState';
import InfoIcon from '@material-ui/icons/Info';
import { Link, useHistory } from 'react-router-dom';
import axios from './commonComponent/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';


const fieldSchema = {
    verificationcode: {label: 'Verification Code', labelWidth: 122, type: 'text'},
    newpassword: {label: 'New Password', labelWidth: 107, type: 'text'},
    confirm_password: {label: 'Confirm Password', labelWidth: 132, type: 'text'},
};

const validationState = {
    verificationcode: {
        required: true,
        validator: {

            validationType: 'alpha',
            error: 'Enter Valid Verification Code'
        },
        asterisk: '*'
    },
    newpassword: {
        required: true,
        validator: {

            validationType: 'password',
            error: 'Enter Valid Password'
        },
        asterisk: '*',
    },
    confirm_password: {
        required: true,
        validator: {

            validationType: 'password',
            error: 'Enter Valid Password'
        },
        asterisk: '*',
    },
};


function Forgot(props) {

    const { user } = props;

    const [samePassword, setSamePassword] = React.useState('');
    const [samePasswordError, setSamePasswordError] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const stateForm = {
        verificationcode: {value: '', error: ''},
        newpassword: {value: '', error: ''},
        confirm_password: {value: '', error: ''},
      };

    const [values, setValues] = React.useState({
        showPassword: false,
        showRePassword: false,
      });

      const [formState, setFormState] = React.useState(fieldSchema);

      const {state, handleOnChange, handleOnSubmit, disable} = FormState(
        stateForm,
        validationState,
        formSubmit
    );

      let form = [];   
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleClickShowRePassword = () => {
        setValues({ ...values, showRePassword: !values.showRePassword });
      };


      const onChangeCommanFieldFunc = (Fieldvalue, key) => {
        const value = Fieldvalue.target.value;
        switch (key) {
           
            case 'newpassword': 
                setSamePassword(value);
                if (confirmPassword !== value) {
                    setSamePasswordError("password should be same");
                } else {
                    setSamePasswordError('');
                }
                break;

            case 'confirm_password': 
                setConfirmPassword(value);
                if (samePassword !== value) {
                    setSamePasswordError("password should be same");
                } else {
                    setSamePasswordError('');
                }
                break;

            default:
                break;     
            
        }
        handleOnChange(Fieldvalue);
      }

      const onBlurCommanFieldFunc = (Fieldvalue, key) => {
        const value = Fieldvalue.target.value;
        switch (key) {
           
            case 'newpassword': 
                setSamePassword(value);
                if (confirmPassword !== value) {
                    setSamePasswordError("password should be same");
                } else {
                    setSamePasswordError('');
                }
                break;

            case 'confirm_password': 
                setConfirmPassword(value);
                if (samePassword !== value) {
                    setSamePasswordError("password should be same");
                } else {
                    setSamePasswordError('');
                }
                break;

            default:
                break;     
            
        }
        handleOnChange(Fieldvalue);
      }


      function formSubmit() {
        postData()
    }

    let history = useHistory();


    const postData = async () => {

        // let verificationCode     = state['verificationcode'].value;
        let verificationCode     = user.authentication.user.resetPassToken;
        let newPassword     = state['newpassword'].value;
        let confirmPassword     = state['confirm_password'].value;
        let upload_array = {'token': verificationCode, 'password': newPassword, 'repeatPassword': confirmPassword};

        try {

            const config = {
                headers: {
                    Authorization: user.authentication.user.token,
                  },
            }

            const resp = await axios.post('/auth/forgot-password', JSON.stringify(upload_array), config);
            console.log(resp.data.success)
            if(resp.data.success) {
                history.push("/dashboard");
                // toast.success("Login Successfully");
            }
        } catch (err) {
            // Handle Error Here
                toast.error("Invalid Password");
                console.error(err);
        }

      }


      const formField = () => {

        {Object.keys(formState).forEach(function (key) {
            switch (key) {
                case 'newpassword':
                case 'confirm_password':
                    form.push(
                        <div>
                            <FormControl className='forgot_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
                                    <InputLabel htmlFor={`outlined-adornment-${key}`}>{formState[key].label}</InputLabel>
                                    <OutlinedInput
                                        type={key === 'newpassword' ? values.showPassword ? 'text' : 'password' : values.showRePassword ? 'text' : 'password'}
                                        error={state[key].error}
                                        name={key}
                                        value={state[key].value}
                                        onChange={(event) => onChangeCommanFieldFunc(event, key)}
                                        onBlur={(event) => onBlurCommanFieldFunc(event, key)}
                                        required={validationState[key].required}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle newpassword visibility"
                                            onClick={key === 'newpassword' ? handleClickShowPassword : handleClickShowRePassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                                {key === 'newpassword' ? values.showPassword ? <Visibility /> : <VisibilityOff /> : values.showRePassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={formState[key].labelWidth}
                                    />
                                </FormControl>

                                <span className="forgot_error">
                                    {key === 'newpassword' ? state[key].error : state[key].error? state[key].error : samePasswordError}
                                </span>
                        </div>
                    )
                    break;

                default :
                    form.push(
                        <div>
                            <FormControl className='forgot_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
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
                            
                            <span className="forgot_error" >
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
            <div className="forgot">

                <Grid container justify='center' alignItems='center' >

                    <div className="forgot_title">
                        <Typography className='forgot_paddingBt' variant="h5" align="left" component="h2"  >
                            Recover Password
                        </Typography>
                    </div> 

                    <Divider className="forgot_divider" orientation="horizontal" />
                    
                    <Grid item xs={10} sm={6} lg={6}>
                        <div className="forgot_card">
                            <Card >
                                <CardContent >
                                    <span className="forgot_inform" >
                                       <InfoIcon fontSize="small" />
                                       Verification code has been sent to your registered mail ID
                                    </span>   
                                    <div >
                                        {formField()}
                                        <div className='forgot_button'>
                                            <Button variant="contained" onClick={handleOnSubmit} disabled={disable || samePasswordError !== ''}>Submit</Button>
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

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps)(Forgot);