<main class="grid-container">
    <header class="row">
        <slot name="header"></slot>
    </header>
    <section class="row">
        <slot name="content"></slot>
    </section>
    <footer class="row">
        <slot name="footer"></slot>
    </footer>
</main>

<style>
    .grid-container {
        width:100%;
        display: grid;
        min-height:100vh;
        grid-template-rows: 1fr 4fr 1fr;
    }
    .row  {
        height:100%;
    }
</style>