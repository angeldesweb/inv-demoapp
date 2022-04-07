<script>
    //@ts-nocheck
import { detail } from "../../../store";
import { getInbound } from "../../../tools/api/inbounds";
import { onMount } from "svelte";
import { getProvider } from "../../../tools/api/providers";
import {Button} from 'svelte-chota';


    let lote = $detail.inbound
    const fetchInbound = async () => {
        try {
            const inb = await getInbound(lote);
            const prov = await getProvider(inb.provider.split('/')[2]);
            const resp = {...inb,prov}
            return resp;
        } catch (error) {
            return error;
        }
    }
    let promise = fetchInbound();
    

    onMount( async () => promise = await fetchInbound())
    $: console.log(promise)
</script>

{#await promise}
<h3 class="text-primary">Cargando...</h3>
{:then inbound}
<div class="card">
    <h1>MetalRecuperadora</h1>
    <hr>
    <h4>Ingreso N° {inbound.lote}</h4>
    <div class="prov">
        <h5>Datos del proveedor</h5>
        <p>Nombre: {inbound.prov.name}    Cédula: {inbound.prov.id}</p>
        <p>Teléfono: {inbound.prov.phone}</p>
    </div>
    <div class="prov">
        <h5>Materiales recibidos</h5>
        {#each inbound.inbounds as inb}
        <li>{inb.material.split('/')[2]} Cantidad: {inb.account}</li>
        {/each}
    </div>
    <div class="prov">
        <h5>Estatus de pago</h5>
        <p>Monto a cancelar: {inbound.bill}$</p>
        <p>Monto cancelado: {inbound.ammount}$</p>
    </div>
    <br>
    <Button primary>Imprimir</Button>
    <Button primary>Modificar</Button>
</div>
{/await}