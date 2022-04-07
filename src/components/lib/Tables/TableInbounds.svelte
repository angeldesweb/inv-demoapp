<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { getInbounds } from '../../../tools/api/inbounds';
    import { getProviders } from '../../../tools/api/providers';
    import { Datatable , SearchInput } from 'svelte-simple-datatables';
    import { Modal } from 'svelte-chota'
    import moment from "moment/min/moment-with-locales";
    import { detail, view } from '../../../store';
    import Details from '../../views/screens/Details.svelte';
    $: open = false;
    moment.locale('es')

    const settings = {
        rowsPerPage: 5,
        scrollY:false,
        scrollX:true,
        css:true,
        labels: {
            search: 'Buscar...',    // search input placeholer
            filter: 'Filtrar',       // filter inputs placeholder
            noRows: 'No se encontraron coincidencias',
            info: 'Mostrando de {start} a {end} resultados de {rows} registros',
            previous: 'Anterior',
            next: 'Siguiente',       
        },
        blocks : {
            searchInput:true
        }
    }
    $: data = [];
    const fetchInbounds = async () => {
        try {
            const req = await getInbounds();
            const provs = await getProviders();
            const response = req.map(doc => {
            let pro = doc.provider.split('/')[2];
            doc.provider = provs.filter(doc => doc.id === pro);
            let date = doc.date.toDate()
            doc.date = moment(date).format('DD MM y');
            doc.materials = doc.inbounds.length;
            return doc;
        });
        data = response;
        return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    let rows;

    const handleClick = (e) => {
        console.log(e.target.id)
        view.currentDetail('inbound');
        detail.setInbound(e.target.id);
        open = true;
    }
    let promise = fetchInbounds();
    onMount(() => {
        promise = fetchInbounds();
    })
</script>

{#await promise}
<h3 class="text-primary">Cargando...</h3>
{:then}
<div class="card" style="height:100%;width:80%;">
    <h3 style="text-align:center;">Entrada de material</h3>
    <hr>
    <Datatable {settings} {data} bind:dataRows={rows}>
        <thead>
            <th data-key="name">Lote N°</th>
            <th data-key="tipo">Mats</th>
            <th data-key="account">Fecha</th>
            <th data-key="unitprice">Proveedor</th>
        </thead>
        <tbody>
        {#if rows}
            {#each $rows as row}
            <tr 
            id={row.lote}
            class:bg-error={!row.payed}
            class="text-white"
            class:bg-success={!!row.payed}
            on:click={handleClick}>
                <td id={row.lote} style="width:56px;">{row.lote}</td>
                <td id={row.lote}>{row.materials}</td>
                <td id={row.lote}>{row.date}</td>
                <td id={row.lote}>{row.provider[0].name}</td>
            </tr>
            {/each}
        {/if}
        </tbody>
    </Datatable>
</div>
{:catch error}
<h3 class="text-primary">Algo ha salido mal</h3>
{/await}
<Modal bind:open={open}>
    <Details/>
</Modal>
<style>
    td{text-align:center;padding: 4px 0;white-space:nowrap;}
    tr {
        border: 1px solid white;
    }
    td:hover {
        cursor:pointer
    }
</style>