<script>
    import { onMount } from "svelte";
    import Chart from 'chart.js/auto/auto';

    export let labels;
    export let accounts;
    export let title;

    let canvas;
    const data = {
            labels,
            datasets:[{
                label:title,
                data:accounts,
                backgroundColor: ['#ef476f', '#ffd166', '#06d6a0','#118ab2','#ff9f1c','#e26d5c',
                    '#073b4c','#9b5de5','#eaac8b','#723d46','#ffd000','#a3b18a','#4ea8de'],
                borderWidth:0
            }]
        };

    const config = {
            type:'doughnut',
            data,
            options:{
                borderRadius:'0',
                responsive:true,
                cutout:'60%',
                spacing:1,
                plugins:{
                    legend:{
                        position:'right',
                        display:true,
                        labels:{
                            usePointStyle:true,
                            padding:10,
                            font:{
                                size:11
                            }
                        }
                    },
                    title:{
                        display:true,
                        text:title
                    }
                }
            }
        }
    
    onMount(async() => {
        try {
            const ctx = canvas.getContext('2d');
            var myChart = new Chart(ctx, config);
        } catch (error) {
            console.log(error);
        }
    })
</script>

<div class="chart">
    {#if labels.length === 0}
    <div style:text-align='center'>
        <h5 class="text-primary">{title} </h5>
        <hr>
        <h6>Sin elementos  a mostrar</h6>
    </div>
    {:else}
    <canvas bind:this={canvas} width={200} height={200}/>
    {/if}
</div>

<style>
    .chart {
        padding:2em;
    }
</style>