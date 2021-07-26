import React from 'react';
import "./ChangePassword.css";
import { Typography, Grid, Divider, Container, Avatar, Card, CardContent, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import Myaccount from './commonComponent/Myaccount';
import FormState from './formState';
import axios from './commonComponent/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';

const fieldSchema = {
    oldpassword: {label: 'Old Password', labelWidth: 100, type: 'text'},
    newpassword: {label: 'New Password', labelWidth: 107, type: 'text'},
    confirm_password: {label: 'Confirm Password', labelWidth: 132, type: 'text'},
};

const validationState = {
    oldpassword: {
        required: true,
        validator: {

            validationType: 'password',
            error: 'Enter Valid Password'
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


function ChangePassword(props) {

    const { user } = props;

    const [samePassword, setSamePassword] = React.useState('');
    const [samePasswordError, setSamePasswordError] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const stateForm = {
        oldpassword: {value: '', error: ''},
        newpassword: {value: '', error: ''},
        confirm_password: {value: '', error: ''},
      };

      const [values, setValues] = React.useState({
        showOldPassword: false,
        showNewPassword: false,
        showRePassword: false,
      });

      const [formState, setFormState] = React.useState(fieldSchema);

      const {state, handleOnChange, handleOnSubmit, disable} = FormState(
        stateForm,
        validationState,
        formSubmit
        );

      let history = useHistory();

      const form = [];

      const handleClickOldShowPassword = () => {
        setValues({ ...values, showOldPassword: !values.showOldPassword });
      };

      const handleClickNewShowPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword });
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

    const postData = async () => {

        // const field = stateForm;
        // const forgot = {};

        // for (let key in field) {
        //     forgot[key] = state[key].value;
        // }

        let oldPassword     = state['oldpassword'].value;
        let confirmPassword     = state['confirm_password'].value;
        let upload_array = {'password': oldPassword, 'newPassword': confirmPassword};

        try {

            const config = {
                headers: {
                    Authorization: user.authentication.user.token,
                  },
            }

            const resp = await axios.post('/user/change-password', JSON.stringify(upload_array), config);
            console.log(resp.data.success)
            if(resp.data.success) {
                history.push("/dashboard");
                toast.success("Password changhed Successfully");
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
                case 'oldpassword':
                    form.push(
                        <div>
                            <FormControl className='changePassword_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
                                    <InputLabel htmlFor={`outlined-adornment-${key}`}>{formState[key].label}</InputLabel>
                                    <OutlinedInput
                                        type={values.showOldPassword ? 'text' : 'password'}
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
                                            onClick={handleClickOldShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                                {values.showOldPassword ? <Visibility /> : <VisibilityOff /> }
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={formState[key].labelWidth}
                                    />
                                </FormControl>

                                <span className="changePassword_error">
                                    {state[key].error}
                                </span>
                        </div>
                    )
                    break;

                default :
                form.push(
                    <div>
                        <FormControl className='changePassword_fieldBtPadding' size='small' fullWidth variant="outlined" key={formState[key].label + key}>
                                <InputLabel htmlFor={`outlined-adornment-${key}`}>{formState[key].label}</InputLabel>
                                <OutlinedInput
                                    type={key === 'newpassword' ? values.showNewPassword ? 'text' : 'password' : values.showRePassword ? 'text' : 'password'}
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
                                        onClick={key === 'newpassword' ? handleClickNewShowPassword : handleClickShowRePassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                            {key === 'newpassword' ? values.showNewPassword ? <Visibility /> : <VisibilityOff /> : values.showRePassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={formState[key].labelWidth}
                                />
                            </FormControl>

                            <span className="changePassword_error">
                                {key === 'newpassword' ? state[key].error : state[key].error? state[key].error : samePasswordError}
                            </span>
                    </div>
                )
                break;
            }

        })}
        return form;
        } 
 
    return (
        <div className="changePassword">
            <Container>
                <Grid container justify='center' alignItems='center' className="changePassword_container" spacing={3}>
                    <Typography className='changePassword_paddingBt' variant="h5" align="left" component="h2"  >
                        My Account
                    </Typography> 
                    <Divider className="changePassword_dividerHeader" orientation="horizontal" />
                    <Grid item justify='center' alignItems='center' xs={12} sm={4} md={5} lg={5} className='changePassword_profile'>
                        <Myaccount />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} lg={7}>
                        <div className="changePassword_card">
                            <Card >
                                <CardContent >
                                    <div className='changePassword_listHeader'>
                                        <Typography align='center' variant='h4'  component="h4">
                                            Change Password
                                        </Typography>
                                    </div>
                                    <Divider className="changePassword_divider" orientation="horizontal" />   
                                    <div >
                                        {formField()}
                                        <div className='changePassword_button'>
                                            <Button variant="contained" onClick={handleOnSubmit} disabled={disable || samePasswordError !== ''}>Submit</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>                        
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

export default connect(mapStateToProps) (ChangePassword);
