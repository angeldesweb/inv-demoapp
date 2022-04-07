import * as yup from 'yup';
yup.setLocale({
    mixed:{
        default:'Campo no válido',
        required:'Debe ingresar algún valor'
    },
    string:{
        min:'Debe contener mínimo ${min} carácteres'
    }
});

export const sessionSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(6).required()
});

/*export const validateSignIn = async (body) => {
    try {
        let messages;
        const valid = await schema.isValid(body);
        if(!valid){
            messages = await schema.validate(body);
            return {valid,messages}
        }else {
            return {valid};
        }
        
    } catch (error) {
        return {valid:false,messages:error.errors,path:error.path}
    }
} */
