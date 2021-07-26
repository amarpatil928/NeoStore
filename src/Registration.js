import './Registration.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import FormState from './formState';
import RectLoader from './commonComponent/rectLoader';
import axios from './commonComponent/axios';
import { connect } from 'react-redux';
import { AuthActionType, RegisterAuthAction } from './actions/AuthAction';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const fieldSchema = {
    firstName: {label: 'First Name', adornmentIcon: <FormatSizeIcon />, labelWidth: 80, type: 'text'},
    lastName: {label: 'Last Name', adornmentIcon: <FormatSizeIcon />, labelWidth: 78, type: 'text'},
    email: {label: 'Email Address', adornmentIcon: <EmailIcon />, labelWidth: 104, type: 'text'},
    password: {label: 'Password', labelWidth: 70, type: 'text'},
    confirm_password: {label: 'Confirm Password', labelWidth: 132, type: 'text'},
    mobile: {label: 'Mobile No.', adornmentIcon: <LocalPhoneIcon />, labelWidth: 75, type: 'number'},
    gender: {label: 'Gender', type: 'text'},
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
    email: {
        required: true,
        validator: {

            validationType: 'email',
            error: 'Enter Valid Email'
        },
        asterisk: '*'
    },
    password: {
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
    mobile: {
        required: true,
        validator: {

            validationType: 'mobile',
            error: 'Enter Valid Mobile Number '
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

};


function Registration(props) {

    const stateForm = {
        firstName: {value: '', error: ''},
        lastName: {value: '', error: ''},
        email: {value: '', error: ''},
        password: {value: '', error: ''},
        confirm_password: {value: '', error: ''},
        mobile: {value: '', error: ''},
        gender: {value: '', error: ''},
      };

    const { user, register } = props;

    const [loader, setLoader] = React.useState(false);
    const [samePassword, setSamePassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [samePasswordError, setSamePasswordError] = React.useState('');
    const [formState, setFormState] = React.useState(fieldSchema);

    const [values, setValues] = React.useState({
        showPassword: false,
        showRePassword: false,
      });

      const {state, handleOnChange, handleOnSubmit, disable} = FormState(
        stateForm,
        validationState,
        formSubmit
    );

    let history = useHistory();

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
           
            case 'password': 
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
        Fieldvalue.preventDefault();
        handleOnChange(Fieldvalue);
      }

      const onBlurCommanFieldFunc = (Fieldvalue, key) => {
        const value = Fieldvalue.target.value;
        switch (key) {
           
            case 'password': 
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
        Fieldvalue.preventDefault();
        handleOnChange(Fieldvalue);
      }


      const postData = async () => {

        const field = stateForm;
        const registration = {};

        for (let key in field) {
            registration[key] = state[key].value;
        }

        register(JSON.stringify(registration), history);
      }



      function formSubmit() {
        postData()
      }

      const formField = () => {

        {Object.keys(formState).forEach(function (key) {
            switch (key) {
                case 'password':
                case 'confirm_password':
                    form.push(
                        <div>
                            <FormControl className='registration_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
                                    <InputLabel htmlFor={`outlined-adornment-${key}`}>{formState[key].label}</InputLabel>
                                    <OutlinedInput
                                        type={key === 'password' ? values.showPassword ? 'text' : 'password' : values.showRePassword ? 'text' : 'password'}
                                        error={state[key].error}
                                        name={key}
                                        value={state[key].value}
                                        onChange={(event) => onChangeCommanFieldFunc(event, key)}
                                        onBlur={(event) => onBlurCommanFieldFunc(event, key)}
                                        required={validationState[key].required}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={key === 'password' ? handleClickShowPassword : handleClickShowRePassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                                {key === 'password' ? values.showPassword ? <Visibility /> : <VisibilityOff /> : values.showRePassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={formState[key].labelWidth}
                                    />
                                </FormControl>

                                <span className="registration_label" >
                                    <span className="registration_error">
                                        
                                        {key === 'password' ? state[key].error : state[key].error? state[key].error : samePasswordError}
                                        
                                    </span> <span className="registration_inform" >8-12 alphanumeric characters </span>  
                                </span>
                        </div>
                    )
                    break;

                    case 'gender':
                        form.push(
                                <div>
                                    <div className='registration_radio'>
                                    <RadioGroup aria-label="gender"
                                    name={key} 
                                    value={state[key].value} 
                                    onChange={(event) => onChangeCommanFieldFunc(event, key)} 
                                    onBlur={(event) => onBlurCommanFieldFunc(event, key)}
                                    required={validationState[key].required}
                                    error={state[key].error}
                                    >
                                        <FormControlLabel value="male" control={<Radio size='small' />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio size='small' />} label="Female" />
                                    </RadioGroup>
                                    </div>

                                    <span className="registration_label" >
                                        <span className="registration_error">{state[key].error}</span> 
                                    </span>
                                </div>
                        )
                                
                    break;

                default :
                    form.push(
                        <div>
                            <FormControl className='registration_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
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
                                    aria-label={`toggle ${key} visibility`}
                                    edge="end"
                                    >
                                        {formState[key].adornmentIcon}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={formState[key].labelWidth}
                            />
                            </FormControl>

                            <span className="registration_label" >
                                    <span className="registration_error">{state[key].error}</span> 
                            </span>
                        </div>
                    )
                break;
            }

        })}
        return form;
        } 

    return (
            <div className="registration">
                <Grid container justify='center' alignItems='center' >
                    <Grid item xs={12} sm={12} md={12} lg={12}> 
                        <div className="registration_socialSharing">
                            <Grid container justify='center' alignItems='center'>
                                <Grid item xs={12} sm={6} md={6} lg={6}> 
                                    <div className="registration_socialSharing_facebook"> 
                                        <a className="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Facebook">
                                            <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                                            </div>Login with Facebook</div>
                                        </a>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6}> 
                                    <div className="registration_socialSharing_google">
                                        <a className="resp-sharing-button__link" href="https://plus.google.com/share?url=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Google">
                                            <div className="resp-sharing-button resp-sharing-button--google resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.84 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.33-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3"/></svg>
                                            </div>Login with Google</div>
                                        </a>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                        <Divider className="registration_divider" orientation="horizontal" />
                    <Grid item xs={12} sm={12} md={12} lg={12} container justify='center' alignItems='center' >
                    <Card className="registration_crad" >
                        <CardContent className="registration_title">
                            <Typography className='registration_paddingBt' variant="h5" align="left" component="h2"  >
                                Register to NeoSTORE
                            </Typography>   
                            <div >

                            {loader ? 
                                    <RectLoader />
                                    :
                                    formField()
                            }

                                <div className='registration_button'>
                                    <Button align='left' variant="contained" onClick={handleOnSubmit} disabled={disable || samePasswordError !== ''}>Register</Button>
                                </div>
                            </div>
                            
                        </CardContent>
                    </Card>
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

const mapDispatchToProps = (dispatch) => {
    return {
        register: async (userState, history) => {
            try {
                const res = await axios.post("/auth/register", userState);
                const { data } = res.data;
                dispatch(RegisterAuthAction(AuthActionType.REGISTER_SUCCESS, data));
                toast.success("Registration successfully completed");
                history.push("/dashboard");
                
            } catch (error) {
                console.log(error);
                toast.error("Registration failed");
                dispatch(RegisterAuthAction(AuthActionType.REGISTER_FAIL, {}));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);