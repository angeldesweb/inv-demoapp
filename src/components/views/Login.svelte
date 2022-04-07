<script>
    //@ts-nocheck
    import Layout from "svelte-fluid-layout";
    import AppFooter from "../lib/Footer/AppFooter.svelte";
    import FormLogin from "../lib/Forms/FormLogin.svelte";
    import TittleApp from "../lib/Tittle/TittleApp.svelte";
</script> 
   
<Layout>
    <header class="bg-primary text-light" slot="header">
        <TittleApp/>
    </header>
    <section slot="side1"></section>
    <main class="main" slot="main">
        <div class="card">
            <FormLogin/>
        </div>
    </main>
    <section slot="side2"></section>
    <footer class="bg-primary text-light" slot="footer">
        <AppFooter/>
    </footer>
</Layout>
   
<style>
    :global(.svelte-fluid-layout-large main) {
        width: 80%;
    }
    header {
        padding: 0 1em
    }
    section {
        text-align:center;
        padding:1em 0;
    }
    footer {
        text-align:center;
        padding:1em 0;
    }
    .main {
        display:grid;
        padding:.5em;
        align-content: center;
    }
</style> 