<article>
    <aside class="row">
        <slot name="aside"></slot>
    </aside>
    <section class="row">
        <slot name="content"></slot>
    </section>
</article>

<style>
    article {
        width:100%;
        height:100%;
    }
    aside {
        width:20%;
        height:100%;
    }
    section {
        width:50%;
        height:100%;
    }
</style>