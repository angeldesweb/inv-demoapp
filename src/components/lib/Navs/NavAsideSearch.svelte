<script>
    import { view } from "../../../store";

    const changeView = (e) => {
        view.activeSearch(e.target.id)
    }
</script>
<span>VIstas</span>
<hr>
<ul class="menu">
    <li><a href="#/#" on:click|preventDefault={changeView} id="materials">Materiales</a></li>
    <br>
    <li><a href="#/#" on:click|preventDefault={changeView} id="inbounds">Ingresos</a></li>
    <br>
    <li><a href="#/#" on:click|preventDefault={changeView} id="outbounds">Egresos</a></li>
    <br>
    <li><a href="#/#" on:click|preventDefault={changeView} id="">Ventas</a></li>
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
        padding: 1em 0;
    }
    .menu > li > a {
        text-decoration:none;
    }
</style>