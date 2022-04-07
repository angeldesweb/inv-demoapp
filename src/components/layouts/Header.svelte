
<div class="grid bg-primary text-light">
    <slot name="title"></slot>
    <slot name="content"></slot>
</div>

<style>
    .grid {
        display:grid;
        height:100%;
        width:100%;
        grid-template-columns: repeat(auto-fit,minmax(min(100%,15rem),1fr));
        grid-gap:1rem;
        justify-items: center;
        align-items: center;
    }
</style>