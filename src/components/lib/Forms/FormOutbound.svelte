<script>
    // @ts-nocheck
    import { TopLeft } from '../../../tools/notifications/Toasts';
    import { Button , Modal , Card } from 'svelte-chota';
    import { createOutbound } from '../../../tools/api/outbounds.js';
    import { substractAccount } from '../../../tools/api/materials';
    import { Timestamp } from 'firebase/firestore';
    import moment from 'moment';
    import 'moment/locale/es';

    export let clients;
    export let materials;

    const clientsList = clients.map(pro => `${pro.id} ${pro.name}`) 
    const materialsList = materials.map(mat => `/material/${mat.name}`)

    $: outbounds = [];
    $: lote = moment().format('y-M-D-hhmm');
    $: open = false;
    $: errors = {name:'',id:'',phone:''}
    $: isLoading = false;

    const formatBody = (values) => {
        const { client , bill , ammount } = values;
        const clientFormat = `/clients/${client.split(' ')[0]}`
        const date = Timestamp.now();
        return {lote,date,client:clientFormat,attended:false,outbounds}
    }

    const adds = async () => {
        let promises = outbounds.map(async doc => {
            const response = await substractAccount(doc.material.split('/')[2],doc.account);
            return response;
        });
        const responses = await Promise.all(promises);
        return responses;
    }
    
    const PostForm = async (body) => {
        try {
            const logs = await adds();
            const invalids = logs.filter(i => i.success === false);
            if(invalids.length > 0){
                TopLeft('No se pudo realizar la operación');
            }else{
                const resp = await createOutbound(body);
                if(!resp.success){
                    alert(resp)
                    TopLeft.error(resp.message)
                    isLoading = false;
                }else{
                    TopLeft.success(`Registro realizado satisfactoriamente`);
                }
            }
            return;
        } catch (error) {
            alert(error)
            TopLeft.error(error.errors);
        }
    }

    const handleSubmit = async (e) => {
        isLoading = true;
        const values = Object.fromEntries(new FormData(e.target));
        const body = formatBody(values);
        await PostForm(body);
        outbounds = []
        e.target.reset()
        isLoading = false;
    }
    $: console.log(outbounds);
    const handleModal = (e) => {
        isLoading = true;
        const values = Object.fromEntries(new FormData(e.target));
        outbounds = [...outbounds,{material:values.material,account:Number(values.account)}];
        open = false;
        isLoading = false;
    }
</script>

<div class="card">
    <form on:submit|preventDefault={handleSubmit}>
        <h3>Registro de salida <small style="font-size:1.3rem;color:grey">N° {lote}</small></h3>
        <hr>
        <p class="bg-primary text-light" style="text-align:center"><span>Materiales Agregados: {outbounds.length}</span></p>
        <label for="client">Cliente</label>
        <input type="text" list="clients" name="client" id="client" placeholder="Datos del cliente" required>
        <datalist id="clients">
            {#each clientsList as item}
                <option>{item}</option>
            {/each}
        </datalist>
        <br>
        <Button submit loading={isLoading} primary disabled={outbounds.length === 0 ? true : false}>Registrar</Button>
        <hr>
        <Button clear style="width:100%" on:click={e => open = true} loading={isLoading} primary>Materiales a entergar</Button>
    </form>
</div>

<Modal bind:open={open}>
    <Card style="grid-area:b">
        <form style:padding="2rem" on:submit|preventDefault={handleModal}>
            <h4>Salientes</h4>
            <hr>
            <label for="material">Material</label>
            <input placeholder="Material ingresado" list="materials" id="material" type="text" name="material" required>
            <datalist id="materials">
                {#each materialsList as item}
                    <option>{item}</option>
                {/each}
            </datalist>
            <label for="account">Cantidad</label>
            <input placeholder="Cantidad de material" id="account" type="number" name="account" required>
            <br>
            <Button submit loading={isLoading}>Agregar</Button>
        </form>
    </Card>
</Modal>

<style>
    .card {
        width:60%;
    }
</style>