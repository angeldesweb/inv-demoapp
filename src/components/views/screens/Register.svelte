<script>
    import FormMaterial from "../../lib/Forms/FormMaterial.svelte";
    import { view } from "../../../store";
    import FormCliente from "../../lib/Forms/FormCliente.svelte";
    import FormProvider from "../../lib/Forms/FormProvider.svelte";
    import FormInboundBox from "../../lib/Forms/FormInboundBox.svelte";
import FormOutboundsBox from "../../lib/Forms/FormOutboundsBox.svelte";

    $: forms = {
        material:FormMaterial,
        client:FormCliente,
        provider:FormProvider,
        inbound:FormInboundBox,
        outbound:FormOutboundsBox
    }
</script>


<div class="form-box">
    <svelte:component this={forms[$view.register]} />   
</div>

<style>
    .form-box {
        height:100%;
        padding:.5em;
        display: grid;
        place-items: center;
        width:100%;
    }
</style>