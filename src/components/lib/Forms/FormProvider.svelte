<script>
    // @ts-nocheck
    import { TopLeft } from '../../../tools/notifications/Toasts';
    import { Button } from 'svelte-chota';
    import { providerSchema } from '../../../tools/validations/providers';
    import { createProvider } from '../../../tools/api/providers';
    
    $: errors = {name:'',id:'',phone:''}
    $: isLoading = false;

    const handleInvalid = async (values) => {
        try {
            await providerSchema.validate(values);
            return true;
        } catch (error) {
            errors[error.path] = error.errors;
            return false
        }
    }
    
    const PostForm = async (body) => {
        try {
            const resp = await createProvider(body);
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
        const valid = await providerSchema.isValid(values);
        if(!valid) await handleInvalid(values);
        if(valid) await PostForm(values);
        e.target.reset()
        isLoading = false;
    }
</script>
    
<div class="card">
    <form on:submit|preventDefault={handleSubmit}>
        <h3>Registro de proveedor</h3>
        <hr>
        <label for="name">Cliente</label>
        <input type="text" name="name" id="name" placeholder="Nombre del provedor" required>
        <label for="id">Cédula o Rif</label>
        <input type="text" name="id" id="id" placeholder="EJ: V-11.222.3333 / J-999999999999" required>
        <label for="phone">Teléfono</label>
        <input type="text" name="phone" id="phone" placeholder="EJ: +584241112233 / 04241112233" required>
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