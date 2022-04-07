<script>
import DetailInbound from "../../lib/Details/DetailInbound.svelte";
import { view } from "../../../store";


    const views = {
        inbound:DetailInbound,
        outbound:'',
        sell:'',
    }
</script>

<svelte:component this={views[$view.detail]} />