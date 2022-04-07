<script>
    import { onMount } from "svelte";
    import { getMaterials } from "../../../tools/api/materials";
    import { getClients } from "../../../tools/api/clients";
    import FormOutbound from "./FormOutbound.svelte";

    const fetchData = async () => {
        try {
            const clients = await getClients();
            const materials = await getMaterials();
            const results = {clients,materials};
            return results;
        } catch (error) {
            return error;
        }
    }

    let promise = fetchData();

    onMount(async () => promise = await fetchData());
</script>

{#await promise}
    <h3 class="text-primary">Cargando...</h3>
{:then data} 
    <FormOutbound clients={data.clients} materials={data.materials} />

{:catch}
    <h3 class="text-primary">No se pudo recuperar data necesaria para la petición</h3>
{/await}