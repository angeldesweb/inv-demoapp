import * as yup from 'yup';
yup.setLocale({
    mixed:{
        default:'Campo no válido',
        required:'Debe ingresar algún valor'
    },
    string:{
    }
})
export const clientSchema = yup.object().shape({
    name:yup.string().required(),
    id:yup.string().matches(/^[V|J|E]-([0-9]{6,20})$/g,'Formato de cédula inválido').required('Debe ingresar cédula o rif'),
    phone:yup.string().matches(/^\+?[0-9][0-9]?([0-9]{6,30})$/g,'Formato de teléfono inválido').required('Debe ingresar un número de teléfono')
});
