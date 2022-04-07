<script>
    import { logOut } from "../../../tools/api/session";
    import { router, session } from "../../../store";

    
    const navigate = (e) => router.navigateTo(e.target.id);

    const closeSession = async () => {
        await logOut();
        session.closeSession()
    }
</script>
<span>Menú</span>
<hr>
<ul class="menu">
    <li><a href="#/#" id="register" class="text-primary" on:click|preventDefault={navigate}>Registrar</a></li>
    <li><a href="#/#" id="search" class="text-primary" on:click|preventDefault={navigate}>Consultar</a></li>
    <!--li><a href="#/#" id="account" class="text-light" on:click|preventDefault={navigate}>Perfil</a></li-->
    <li><a href="#/#" class="text-primary" on:click|preventDefault={closeSession}>Cerrar</a></li>
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