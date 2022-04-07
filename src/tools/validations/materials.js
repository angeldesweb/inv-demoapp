import * as yup from 'yup';
yup.setLocale({
    mixed:{
        default:'Campo no válido',
        required:'Debe ingresar algún valor'
    },
    string:{
    },
    number:{
        
    }
})
export const materialSchema = yup.object().shape({
    name:yup.string().required(),
    tipo:yup.string().oneOf(['Ferroso','No Ferroso'],'Debe seleccionar tipo de material').required(),
    account:yup.number().typeError('Debe agregar una cantidad').required(),
    unitprice:yup.number().typeError('Debe agregar un monto').required(),
    unitsymbol:yup.string().oneOf(['Unidades','Kg'],'Seleccione unidad de medida').required()
});

