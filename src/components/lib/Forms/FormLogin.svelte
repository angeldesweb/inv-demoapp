<script>
// @ts-nocheck
    import { sessionSchema } from '../../../tools/validations/session';
    import { signIn , PassRecovery } from '../../../tools/api/session'
    import { TopLeft , BottomCenter } from '../../../tools/notifications/Toasts';
    import { session } from '../../../store';
    import { Button , Modal , Card } from 'svelte-chota';

    $: errors = {email:'',password:''}
    $: isLoading = false;
    $: open = false;

    //Validación de schema inválida
    const handleInvalid = async (values) => {
        try {
            await sessionSchema.validate(values);
            return true;
        } catch (error) {
            errors[error.path] = error.errors;
            return false
        }
    }
    //Petición de logueo
    const handleLogin = async (body) => {
        try {
            const resp = await signIn(body);
            if(!resp.success){
                isLoading = false;
                TopLeft.error(resp.message)
            }else{
                isLoading = false;
                TopLeft.success(`Bienvenido ${resp.user.email}`);
                session.authUser({email:resp.user.email,role:resp.role,isAuth:true})
            }
        } catch (error) {
            TopLeft.error(error.errors);
        }
    }
    //Reestablecer contraseña
    const handleSubmit = async (e) => {
        isLoading = true;
        const values = Object.fromEntries(new FormData(e.target));
        const valid = await sessionSchema.isValid(values);
        if(!valid) await handleInvalid(values);
        if(valid) await handleLogin(values);
        e.target.reset()
    }

    const handleModal = async (e) => {
        try {
            isLoading = true;
            const { email } = Object.fromEntries(new FormData(e.target));
            const resp = await PassRecovery(email);
            resp.success ? BottomCenter.success('Enviado a su email')
            : BottomCenter.error('Consulte con el administrador del sistema')
            open = false; 
            isLoading = false;
        } catch (error) {
            BottomCenter.error('Comuníquese con el administrador del sistema');
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h3>Inicio de sesión</h3>
    <hr>
    <label for="email">Correo Electrónico</label>
    <input type="email" name="email" id="email" placeholder="ejemplo@mail.com" required>
    <label for="password">Contraseña</label>
    <input type="password" name="password" id="password" placeholder="Introduce tu contraseña" required>
    <br>
    <Button submit loading={isLoading} primary>Iniciar sesión</Button>
    <hr>
    <Button style="width:100%" on:click={e => open = true} loading={isLoading} primary clear>Olvidé mi contraseña</Button>
</form>

<Modal bind:open={open}>
    <Card style="grid-area:b">
        <form style:padding="2rem" on:submit|preventDefault={handleModal}>
            <h4>Reestablecer contraseña</h4>
            <hr>
            <label for="email">Correo electrónico</label>
            <input placeholder="example@mail.com" id="email" type="email" name="email" required>
            <br>
            <Button submit loading={isLoading}>Reestablecer</Button>
        </form>
    </Card>
</Modal>