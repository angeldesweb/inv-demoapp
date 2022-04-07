<script>
    // @ts-nocheck
    import { TopLeft } from '../../../tools/notifications/Toasts';
    import { Button } from 'svelte-chota';
    import { materialSchema } from '../../../tools/validations/materials';
    import { createMaterial } from '../../../tools/api/materials';
    
    $: errors = {name:'',tipo:'',account:'',unitprice:'',unitsymbol:''}
    $: isLoading = false;

    const handleInvalid = async (values) => {
        try {
            await materialSchema.validate(values);
            return true;
        } catch (error) {
            errors[error.path] = error.errors;
            return false
        }
    }
    
    const PostForm = async (body) => {
        try {
            const resp = await createMaterial(body);
            if(!resp.success){
                isLoading = false;
                TopLeft.error(resp.message)
            }else{
                TopLeft.success(`Registro realizado satisfactoriamente`);
            }
        } catch (error) {
            TopLeft.error(error.errors);
        }
    }

    const handleSubmit = async (e) => {
        isLoading = true;
        const values = Object.fromEntries(new FormData(e.target));
        const valid = await materialSchema.isValid(values);
        if(!valid) await handleInvalid(values);
        if(valid) await PostForm(values);
        e.target.reset()
        isLoading = false;
    }
</script>
    
<div class="card">
    <form on:submit|preventDefault={handleSubmit}>
        <h3>Registro de material</h3>
        <hr>
        <label for="name">Material</label>
        <input type="text" name="name" id="name" placeholder="Nombre el material" required>
        <label for="account">Cantidad Actual</label>
        <input type="number" name="account" id="account" placeholder="Cantidad existente" required>
        <label for="tipo">Tipo de material</label>
        <select name="tipo" id="tipo">
            <option value="" disabled>Seleccione</option>
            <option value="Ferroso">Ferroso</option>
            <option value="No Ferroso">No Ferroso</option>
        </select>
        <label for="unitprice">Precio unitario</label>
        <input type="number" name="unitprice" id="unitprice" placeholder="Precio unidad" required>
        <label for="unitsymbol">Unidad de medida</label>
        <select name="unitsymbol" id="unitsymbol">
            <option value="" disabled>Seleccione</option>
            <option value="Kg">Kg</option>
            <option value="Unidades">Unidades</option>
        </select>
        <br>
        <Button submit loading={isLoading} primary>Registrar</Button>
        <hr>
    </form>
</div>

<style>
    .card {
        width:60%;
    }
</style>