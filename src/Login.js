import './Login.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import FormState from './formState';
import { Link, useHistory } from 'react-router-dom';
import axios from './commonComponent/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { AuthActionType, LogInAuthAction } from './actions/AuthAction';

const fieldSchema = {
    email: {label: 'Email Address', adornmentIcon: <EmailIcon />, labelWidth: 104, type: 'text'},
    password: {label: 'Password', labelWidth: 70, type: 'text'},
};

const validationState = {
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
};


function Login(props) {

    const { login } = props;

    const stateForm = {
        email: {value: '', error: ''},
        password: {value: '', error: ''},
      };

    const [values, setValues] = React.useState({
        showPassword: false,
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


      const onChangeCommanFieldFunc = (Fieldvalue, key) => {
          
        handleOnChange(Fieldvalue);
      }

      const onBlurCommanFieldFunc = (Fieldvalue, key) => {
        handleOnChange(Fieldvalue);
      }

      let history = useHistory();

      const postData = async () => {

        let username     = state['email'].value;
        let password     = state['password'].value;
        let upload_array = {'email': username, 'password': password};

        login(upload_array, history);

      }


      function formSubmit() {
        postData();
     }


      const formField = () => {

        {Object.keys(formState).forEach(function (key) {
            switch (key) {
                case 'password':
                    form.push(
                        <div>
                            <FormControl className='login_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
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
                                            onClick={handleClickShowPassword}
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

                                <span className="login_error">
                                    {state[key].error}
                                </span>
                        </div>
                    )
                    break;

                default :
                    form.push(
                        <div>
                            <FormControl className='login_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
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
                            
                            <span className="login_error" >
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
            <div className="login">
                <Grid container justify='center' alignItems='center' >
                    <Grid item className="login_mobileBottumPd" xs={12} sm={5} md={5} lg={5}>
                        <div className="login_socialSharing">
                            <div className="login_socialSharing_text"> 
                                <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Facebook">
                                    <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                                    </div>Login with Facebook</div>
                                </a>
                            </div>
                            
                            <div className="login_socialSharing_text">
                                <a class="resp-sharing-button__link" href="https://plus.google.com/share?url=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Google">
                                    <div class="resp-sharing-button resp-sharing-button--google resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.84 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.33-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3"/></svg>
                                    </div>Login with Google</div>
                                </a>
                            </div>
                        
                            <div className="login_socialSharing_text">
                                <a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Twitter">
                                    <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
                                    </div>Login with Twitter</div>
                                </a>
                            </div>
                        </div>
                    </Grid>

                    <Grid item className="login_mobile" sm={1} md={1} lg={1} >
                        <div className="loing_divider">
                            <Divider  orientation="vertical" />
                        </div>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div>
                            <Card >
                                <CardContent className="login_title">
                                    <Typography className='login_paddingBt' variant="h5" align="left" component="h2"  >
                                        Login to NeoSTORE
                                    </Typography>   
                                    <div >

                                    {formField()}
                                    <div className='login_button'>
                                        <Button align='left' variant="contained" onClick={handleOnSubmit} disabled={disable}>Login</Button>
                                    </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>   
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" className="login_bottom">
                    <Link className="login_registration" to="/registration">
                        <h3 >Register Now </h3>
                    </Link>
                            <Divider orientation='vertical' /> 
                    <Link className="login_registration" to="/email">
                        <h3>Forgotten? </h3>
                    </Link>
                       
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
        login: async (loginState, history) => {
            try {
                const res = await axios.post("/auth/login", loginState);
                const { data } = res.data;
                dispatch(LogInAuthAction(AuthActionType.LOGIN_SUCCESS, data));
                toast.success("Login Successfully");
                history.push("/dashboard");
                
            } catch (error) {
                toast.error("Invalid Email and Password");
                dispatch(LogInAuthAction(AuthActionType.LOGOUT_FAIL, {}));
                console.log(error);
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);