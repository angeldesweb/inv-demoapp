<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { getOutbounds } from '../../../tools/api/outbounds';
    import { getClients } from '../../../tools/api/clients';
    import { Datatable } from 'svelte-simple-datatables';
    import moment from "moment/min/moment-with-locales";
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
        blocks:{
            searchInput:true
        }
    }
    $: data = [];
    const fetchOutbounds = async () => {
        try {
            const req = await getOutbounds();
            const provs = await getClients();
            const response = req.map(doc => {
            let pro = doc.client.split('/')[2];
            doc.client = provs.filter(doc => doc.id === pro);
            let date = doc.date.toDate()
            doc.date = moment(date).format('DD MM y');
            doc.materials = doc.outbounds.length;
            return doc;
        });
        data = response;
        return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    $: console.log(data);
    let rows;

    const handleClick = (e) => {
        console.log(e.target.parentNode.id);
    }
    let promise = fetchOutbounds();
    onMount(() => {
        promise = fetchOutbounds();
    })
</script>

{#await promise}
<h3 class="text-primary">Cargando...</h3>
{:then}
<div style="height:100%;width:80%" class="card">
    <h3 style="text-align:center;">Salida de material</h3>
    <hr>
    <Datatable {settings} {data} bind:dataRows={rows}>
        <thead style="text-align:center;">
            <th data-key="name">Lote N°</th>
            <th data-key="tipo">Mats</th>
            <th data-key="account">Fecha</th>
            <th data-key="unitprice">Cliente</th>
        </thead>
        <tbody>
        {#if rows}
            {#each $rows as row}
            <tr 
            id={row.lote}
            class:bg-error={!row.attended}
            class:text-white={!row.attended}
            class:bg-warning={!!row.attended}
            on:click={handleClick}>
                <td>{row.lote}</td>
                <td>{row.materials}</td>
                <td>{row.date}</td>
                <td>{row.client[0].name}</td>
            </tr>
            {/each}
        {/if}
        </tbody>
    </Datatable>
</div>
{:catch error}
<h3 class="text-primary">Algo ha salido mal</h3>
{/await}

<style>

    td{
        text-align:center;
        padding:4px 0;
    }
    tr {
        border: 1px solid white;
    }
    td:hover {
        cursor:pointer
    }
    .bg-warning {
        background-color: yellow;
        color:#000;
    }
</style>