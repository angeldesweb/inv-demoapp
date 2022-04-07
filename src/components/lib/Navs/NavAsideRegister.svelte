<script>
    import { view } from "../../../store";

    const changeView = (e) => {
        view.activeRegister(e.target.id)
    }
</script>
<span>Formularios</span>
<hr>
<ul class="menu">
    <li><a class="text-primary" href="#/#" on:click|preventDefault={changeView} id="material">Material</a></li>
    <br>
    <li><a class="text-primary" href="#/#" on:click|preventDefault={changeView} id="client">Cliente</a></li>
    <br>
    <li><a class="text-primary" href="#/#" on:click|preventDefault={changeView} id="provider">Proveedor</a></li>
    <br>
    <li><a class="text-primary" href="#/#" on:click|preventDefault={changeView} id="inbound">Ingreso</a></li>
    <br>
    <li><a class="text-primary" href="#/#" on:click|preventDefault={changeView} id="outbound">Salida</a></li>
    <br>
    <li><a class="text-primary" href="#/#" on:click|preventDefault={changeView} id="sell">Venta</a></li>
</ul>
<hr>
<style>
    .menu {
        padding:1em;
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
    }
    .menu > li {
        display:inline;
        text-align:center;
        width:100%;
        padding: 1em 0;
    }
    .menu > li > a {
        text-decoration:none;
    }
</style>