<script>
    // @ts-nocheck
    import { TopLeft } from '../../../tools/notifications/Toasts';
    import { Button , Modal , Card } from 'svelte-chota';
    import { createInbound } from '../../../tools/api/inbounds.js';
    import { addAccount } from '../../../tools/api/materials';
    import { Timestamp } from 'firebase/firestore';
    import moment from 'moment';
    import 'moment/locale/es';

    export let providers;
    export let materials;

    const providersList = providers.map(pro => `${pro.id} ${pro.name}`) 
    const materialsList = materials.map(mat => `/material/${mat.name}`)

    $: inbounds = [];
    $: lote = moment().format('y-M-D-hhmm');
    $: open = false;
    $: errors = {name:'',id:'',phone:''}
    $: isLoading = false;

    const formatBody = (values) => {
        const { provider , bill , ammount } = values;
        const providerFormat = `/providers/${provider.split(' ')[0]}`
        const date = Timestamp.now();
        const payed = bill - ammount <= 0 ? true : false;
        return {lote,date,provider:providerFormat,bill:Number(bill),ammount:Number(ammount),payed,inbounds}
    }

    const adds = async () => {
        let promises = inbounds.map(async doc => {
            const response = await addAccount(doc.material.split('/')[2],doc.account);
            return response;
        });
        const responses = await Promise.all(promises);
        return responses;
    }
    
    const PostForm = async (body) => {
        try {
            const logs = await adds();
            const invalids = logs.filter(i => i.success === false);
            console.log('invalids',invalids)
            if(invalids.length > 0){
                TopLeft('No se pudo realizar la operación');
            }else{
                const resp = await createInbound(body);
                console.log(resp);
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
        values.ammount = Number(values.ammount);
        values.bill = Number(values.bill);
        const body = formatBody(values);
        await PostForm(body);
        inbounds = []
        e.target.reset()
        isLoading = false;
    }

    const handleModal = (e) => {
        isLoading = true;
        const values = Object.fromEntries(new FormData(e.target));
        inbounds = [...inbounds,{material:values.material,account:Number(values.account)}];
        open = false;
        isLoading = false;
    }
</script>

<div class="card">
    <form on:submit|preventDefault={handleSubmit}>
        <h3>Registro de ingreso <small style="font-size:1.3rem;color:grey">N° {lote}</small></h3>
        <hr>
        <p class="bg-primary text-light" style="text-align:center"><span>Materiales Agregados: {inbounds.length}</span></p>
        <label for="provider">Provedor</label>
        <input type="text" list="providers" name="provider" id="provider" placeholder="Nombre del proveedor" required>
        <datalist id="providers">
            {#each providersList as item}
                <option>{item}</option>
            {/each}
        </datalist>
        
        <label for="bill">Monto a pagar</label>
        <input type="number" name="bill" id="bill" placeholder="Monto a cancelar" required>
        
        <label for="ammount">Monto cancelado</label>
        <input type="number" name="ammount" id="ammount" placeholder="Monto cancelado o abonado" required>
        <br>
        <Button submit loading={isLoading} primary disabled={inbounds.length === 0 ? true : false}>Registrar</Button>
        <hr>
        <Button clear style="width:100%" on:click={e => open = true} loading={isLoading} primary>Materiales recibidos</Button>
    </form>
</div>

<Modal bind:open={open}>
    <Card style="grid-area:b">
        <form style:padding="2rem" on:submit|preventDefault={handleModal}>
            <h4>Ingreso</h4>
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