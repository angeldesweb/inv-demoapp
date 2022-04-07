<article>
    <slot></slot>
</article>

<style>
    article {
        height:100%;
        width:100%;
        display:grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: min(100%,35rem);
    }
</style>