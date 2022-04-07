<script>
    //@ts-nocheck
    import { router } from "../../store";
    import Layout from "svelte-fluid-layout";
    import AppFooter from "../lib/Footer/AppFooter.svelte";
    import Header from "../layouts/Header.svelte";
    import TittleAppNav from "../lib/Tittle/TittleAppNav.svelte";
    import NavMain from "../lib/Navs/NavMain.svelte";
    import Home from './screens/Home.svelte';
    import Register from './screens/Register.svelte';
    import NavAsideRegister from "../lib/Navs/NavAsideRegister.svelte";
    import Search from "./screens/Search.svelte";
    import NavAsideSearch from "../lib/Navs/NavAsideSearch.svelte";

    let components = {
        home:Home,
        register:Register,
        search:Search
    }

    let asides = {
        register:NavAsideRegister,
        search:NavAsideSearch
    }
</script> 
   
<Layout>
    <header class="bg-primary text-light" slot="header">
        <Header>
            <TittleAppNav slot="title" />
        </Header>
    </header>
    <section  slot="side1"><NavMain slot="content" /></section>
    <main class="main" slot="main">
        <svelte:component this={components[$router]} />
    </main>
    <section class="bg-secondary"  slot="side2">
        <svelte:component this={asides[$router]} />
    </section>
    <footer class="bg-primary text-light" slot="footer">
        <AppFooter/>
    </footer>
</Layout>
   
<style>
    :global(.svelte-fluid-layout-large main) {
        width: 80%;
    }
    header {
        padding: 0 2em
    }
    .main {
        display:flex;
        justify-content: center;
        align-items: center;
    }
    section {
        text-align:center;
        padding:1em 0;
    }
    footer {
        text-align:center;
        padding:.5em 0;
    }
</style> 