import { useState, useEffect, useCallback } from 'react';

function FormState(stateSchema, validationSchema = {}, callback) {
    const [state, setState]    = useState(stateSchema);
    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    // Disable button in initial render.
    useEffect(() => {
        setDisable(true);
    }, []);

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => {
        if (isDirty) {
            setDisable(validateState());
        }
    }, [state, isDirty]);

    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const validateState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema).some(key => {
            const isInputFieldRequired = validationSchema[key].required;
            const stateValue = state[key].value==null||state[key].value.length===0?'':state[key].value; // state value
            const stateError = state[key].error; // state error
            return (isInputFieldRequired && !stateValue) || stateError;

        });
        return hasErrorInState;
    }, [state, validationSchema]);

    // Used to handle every changes in every input
    const handleOnChange = useCallback(
        event => {
            setIsDirty(true);
            let requiredValue = '';
            const name = event.target.name;
            const value = event.target.value;
            let error = '';
            if (validationSchema[name].required) {
                if (!value) {
                    error = 'This is required field.';
                }
            }
            if (
                validationSchema[name].validator !== null &&
                typeof validationSchema[name].validator === 'object' && value !=''
            ) {
                let  isValid    = true;
                let lengthField = 0;
                switch (validationSchema[name]['validator'].validationType) {
                    case 'email':
                        isValid =
                            /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value) && isValid;
                        break;

                    case 'text':
                        isValid = /^[A-Za-z' ]+$/.test(value) && isValid;
                        break;

                    case 'character':
                        isValid = /^[A-Za-z ]+$/.test(value) && isValid;
                        validationSchema[name].validator.error = "Enter Valid Data";
                        lengthField = validationSchema[name]['validator']['length'];
                        if(isValid && lengthField>0){
                            isValid = (value.length <= lengthField) && isValid;
                            validationSchema[name].validator.error = "Required Field Length is "+validationSchema[name]['validator']['length'];
                        }
                        break;

                    case 'alpha':
                        // isValid = /^[ A-Za-z0-9_/\n@.#&/(),[|\]-]*$/.test(value) && isValid;
                        isValid = /^[\S]+$/gm.test(value) && isValid;
                        validationSchema[name].validator.error = "Enter Valid Data";
                        lengthField = validationSchema[name]['validator']['length'];
                        if(isValid && lengthField>0){
                            isValid = (value.length <= lengthField) && isValid;
                            validationSchema[name].validator.error = "Required Field Length is "+validationSchema[name]['validator']['length'];
                        }
                        break;

                    case 'alphanumericsplchr':
                        // allow only numbers and characters  special characters
                        isValid = /^[ A-Za-z0-9_/\n@.#&/(),[|\]-]*$/.test(value) && isValid;
                        break;

                    case 'date':
                        requiredValue = event.target.reqValue;

                        // allow only numbers and characters not special characters
                        isValid = /^(\d{1,2})(\/|-)([a-zA-Z0-9]{2,3})(\/|-)(\d{4})$/.test(requiredValue) && isValid;
                        break;

                    case 'birthdate':
                        requiredValue = event.target.reqValue;

                        // allow only numbers and characters not special characters
                        isValid = /^(\d{1,2})(\/|-)([a-zA-Z0-9]{2,3})(\/|-)(\d{4})$/.test(requiredValue) && isValid;
                            validationSchema[name].validator.error = 'Enter Valid Date';

                        if (isValid) {
                            let tdyDate = new Date().getFullYear();
                          requiredValue = requiredValue.split("-")[2];
                            if(tdyDate-requiredValue <18){
                                validationSchema[name].validator.error = 'Age Should be above 18';
                                isValid =false;
                            }
                        }
                        break;

                    case 'DOB':
                        requiredValue = event.target.reqValue;

                        // allow only numbers and characters not special characters
                        isValid = /^(\d{1,2})(\/|-)([a-zA-Z0-9]{2,3})(\/|-)(\d{4})$/.test(requiredValue) && isValid;
                        break;

                    case 'number':
                        isValid = /^[0-9]+([,.][0-9]+)?$/.test(value) && isValid;
                        break;

                    case 'numeric':
                        isValid = /^[0-9]+([,.][0-9]+)?$/.test(value) && isValid;
                        validationSchema[name].validator.error = "Enter Valid Data";
                        lengthField = validationSchema[name]['validator']['length'];
                        if(isValid && lengthField>0){
                            isValid = (value.length <= lengthField);
                            validationSchema[name].validator.error = "Required Field Length is "+validationSchema[name]['validator']['length'];
                        }
                        break;

                    case 'ctry_code':
                        isValid = /^[0-9]+([,.][0-9]+)?$/.test(value) && isValid;
                        break;

                    case 'mobile':
                        /*^ start of line
                         * A + followed by \d+ followed by a or - which are optional.
                         * Whole point two is optional.
                         * Negative look ahead to make sure 0s do not follow.
                         * Match \d+ 10 times.
                         * Line end
                         */
                      //  requiredValue = event.target.reqValue;
                    //    isValid = /^[0-9]$/.test(requiredValue.trim()) && isValid;
                        isValid = /\+?\d[\d -]{8,12}\d/.test(value) && isValid;
                        // isValid = event.target.valid;
                        break;

                    case 'mobileCode':
                        isValid = /^[0-9]{1,3}$/.test(value) && isValid;
                        break;

                    case 'landline':
                        /*This is  indian phone number. where it will take a format of std code 3 to 4  digits
                         *hypen and rest of the 6 to 8 digits.
                         *Ex:  0222-8345622 or 09786-567567
                         */
                        isValid = /^[0-9]\d{2,5}-\d{6,15}$/.test(value) && isValid;
                        break;

                    case 'landlineCode':
                        /*This is  indian phone number Code. where it will take a format of std code 3 to 4  digits

                         *Ex:  0222 or 09786
                         */
                        isValid = /^[0]\d{1}\d{1,3}$/.test(value) && isValid;
                        //isValid = /^[0-9]\d{2,5}$/.test(value) && isValid;
                        break;

                    case 'landlineNumber':
                        /*This is  indian phone number. where it will take a format of 6 to 8 digits
                         *Ex:  8345622 or 567567
                         */
                        isValid = /^[0-9]{5,15}$/.test(value) && isValid;
                        break;

                    case 'address':
                        isValid = /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,~`.<>/?]{1,100}$/.test(value) && isValid;
                        break;

                    case 'pincode':
                        isValid = /^[0-9]{6,9}$/.test(value) && isValid;
                        break;

                    case 'adhar':
                        isValid = /^\d{4}\d{4}\d{4}$/.test(value) && isValid;
                        break;

                    case 'pan' :
                        isValid = /[a-zA-z]{5}\d{4}[a-zA-Z]{1}$/.test(value) && isValid;
                        break;
                    case 'ifsc_code' :
                        isValid = /^[A-Za-z]{4}[0][a-zA-Z0-9]{6}$/.test(value) && isValid;
                        break;

                    case 'uan' :
                        isValid = /^\d{4}\d{4}\d{4}$/.test(value) && isValid;
                        break;

                    case 'comaNumber' :
                        isValid = /^[0-9.,]*$/.test(value) && isValid;
                        break;

                    case 'accNumber' :
                        isValid = /^[a-zA-Z0-9]{9,18}$/.test(value) && isValid;
                        break;

                    case 'gstin' :
                        isValid = /^([0-9]{2})([A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9-A-Za-z]{1}[a-zA-z]{1}[0-9-A-Za-z]{1})+$/.test(value) && isValid;
                        break;

                    case 'tan' :
                        isValid = /[a-zA-z]{4}\d{5}[a-zA-Z]{1}$/.test(value) && isValid;
                        break;

                    case 'cin' :
                        isValid = /^[A-Za-z]{1}\d{5}[a-zA-z]{2}\d{4}[a-zA-z]{3}\d{6}$/.test(value) && isValid;
                        break;

                    case 'overhead' :
                        isValid = /^(\d+|\d+[.]\d+)%?$/.test(value) && isValid;
                        break;

                    case 'switch' :
                        isValid = true;
                        break;

                    case 'select' :
                        if (value === 0 ||value === '') {
                            isValid = false;
                        }
                        break;
                    case 'multiSelect' :
                        if ((value=== null) || (value.length===0 )) {
                            isValid = false;
                        }
                        break;

                    case 'amountrange':
                        isValid = /^([+-]{1}[0-9.,])?([0-9.,]+)?$/.test(value) && isValid;
                        break;

                    case 'url':
                      isValid = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value) && isValid;
                      break;

                    case 'repassword':
                      isValid = state['password'].value === value && isValid;
                      break;

                    case 'password':
                    isValid = /^[a-zA-Z0-9]{8,12}$/.test(value) && isValid;
                    break;

                    default:
                        break;


                }
                if (!isValid) {
                    error = validationSchema[name].validator.error;
                }
            }
           setState(prevState => ({
                ...prevState,
                [name]: { value, error },
            }));


        },
        [validationSchema]

    );

    const handleOnSubmit = useCallback(
        event => {
            event.preventDefault();

            // Make sure that validateState returns false
            // Before calling the submit callback function
            if (!validateState()) {
                callback(state);
            }
        },
        [state]
    );


    return { state, disable, handleOnChange, handleOnSubmit };
}

export default FormState;
