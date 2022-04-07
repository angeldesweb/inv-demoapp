<script>
    import { view } from "../../../store";
    import NavAsideSearch from "../../lib/Navs/NavAsideSearch.svelte";
    import TableMaterials from "../../lib/Tables/TableMaterials.svelte";
    import TableInbounds from "../../lib/Tables/TableInbounds.svelte";
    import TableOutbounds from "../../lib/Tables/TableOutbounds.svelte";

    const tables = {
        materials:TableMaterials,
        inbounds:TableInbounds,
        outbounds:TableOutbounds
    }
</script>

<NavAsideSearch/>
<div class="table">
    <svelte:component this={tables[$view.search]} />
</div>

<style>
    .table {
        height:100%;
        padding:2em;
        width:80%;
    }
</style>