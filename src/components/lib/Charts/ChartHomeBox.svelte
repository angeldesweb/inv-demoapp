<script>
    import { onMount } from 'svelte';
    import { getMaterials } from '../../../tools/api/materials';
    import ChartHome from './ChartHome.svelte';

    $: ferMats = [];
    $: noFerMats = []
    $: ferAccs = [];
    $: noFerAccs = [];
    $: unitaries = [];

    const fetchMaterials = async () => {
        try {
            let materials = await getMaterials();
            return materials;
        } catch (error) {
            return error;
        }
    }

    let promise = fetchMaterials();

    onMount(async ()=> {
        const req = await getMaterials();
        const ferrosos = req.filter(obj => obj.tipo === 'Ferroso' && obj.unitsymbol === 'Kg');
        const noFerrosos = req.filter(obj => obj.tipo === 'No Ferroso' && obj.unitsymbol === 'Kg');
        const units = req.filter(obj => obj.tipo === 'No Ferroso' && obj.unitsymbol === 'Unidades');
        ferMats = ferrosos.map(obj => obj.name);
        noFerMats = noFerrosos.map(obj => obj.name);
        ferAccs =  ferrosos.map(obj => obj.account);
        noFerAccs = noFerrosos.map(obj => obj.account);
        unitaries = units.map(obj => ({name:obj.name,account:obj.account}));
        promise = fetchMaterials();
    })

</script>

<div class="chart-box">
    {#await promise}
    <h3 class="text-primary">Cargando...</h3>
    {:then}
    <ChartHome labels={ferMats} accounts={ferAccs} title={'Ferrosos'} />

    <ChartHome labels={noFerMats} accounts={noFerAccs} title={'No Ferrosos'} />
    <div class="units">
        {#each unitaries as unit}
        <span class="tag is-small bg-primary text-white text-center">{unit.name} {unit.account}</span>
        <br>
        {/each}
    </div>
    {:catch}
    <h3>Algo salió mal... Reintentar</h3>
    {/await}
</div>

<style>
    .chart-box {
        display:flex;
        justify-content: space-around;
        align-items:center;
        flex-wrap: wrap;
        height:100%;
    }
    .units {
        display:flex;
        flex-direction: column;
        justify-items: center;
        align-content: space-around;
    }
</style>