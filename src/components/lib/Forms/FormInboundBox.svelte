<script>
    import { onMount } from "svelte";
    import { getMaterials } from "../../../tools/api/materials";
    import { getProviders } from "../../../tools/api/providers";
    import FormInbounds from "./FormInbounds.svelte";

    const fetchData = async () => {
        try {
            const providers = await getProviders();
            const materials = await getMaterials();
            const results = {providers,materials};
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
    <FormInbounds providers={data.providers} materials={data.materials} />

{:catch}
    <h3 class="text-primary">No se pudo recuperar data necesaria para la petición</h3>
{/await}
