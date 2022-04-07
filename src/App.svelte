<script>
    import Login from "./components/views/Login.svelte";
    import Main from './components/views/Main.svelte';
    import { session } from './store';
</script>
    
<div class="app">
    <svelte:component style="width:100vw;" this={$session.isAuth ? Main : Login} />
</div>

<style>
    .app {
        min-height:100vh;
        min-width:100vw;
    }
</style>