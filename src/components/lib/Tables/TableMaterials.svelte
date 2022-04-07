<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { getMaterials } from '../../../tools/api/materials';
    import { Datatable } from 'svelte-simple-datatables';


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
    const fetchMaterials = async () => {
        try {
            let resp = await getMaterials();
            data = resp;
            return resp;
        } catch (error) {
            alert(error);
        }
    }
    
    let rows;

    const handleClick = (e) => {
        console.log(e.target.parentNode.id);
    }
    let promise = fetchMaterials();
    onMount(() => {
        promise = fetchMaterials();
    })
</script>

{#await promise}
<h3 class="text-primary">Cargando...</h3>
{:then}
<div style="height:100%;width:80%" class="card">
    <h3 style="text-align:center;">Material en almacén</h3>
    <hr>
    <Datatable {settings} {data} bind:dataRows={rows}>
        <thead>
            <th data-key="name">Nombre</th>
            <th data-key="tipo">Tipo</th>
            <th data-key="account">Existencia</th>
            <th data-key="unitprice">Precio unitario</th>
        </thead>
        <tbody>
        {#if rows}
            {#each $rows as row}
            <tr 
            id={row.name}
            class:bg-light={row.tipo !== 'Ferroso'}
            class:text-white={row.tipo === 'Ferroso'}
            class:bg-grey={row.tipo === 'Ferroso'}
            on:click={handleClick}>
                <td>{row.name}</td>
                <td>{row.tipo}</td>
                <td>{row.account}</td>
                <td>{row.unitprice}</td>
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
</style>