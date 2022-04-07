<script>
    import { router } from '../../../store';

    const navigate = (e) => {
        router.navigateTo(e.target.id)
    }
</script>

<h1><a href="#/#" id="home" on:click|preventDefault={navigate}>MetalRecuperadora</a></h1>

<style>
    @media screen and (orientation:portrait) {
        h1 {
            font-size:3vh;
        }
    }
    @media screen and (orientation:landscape) {
        h1 {
            font-size:3vw;
        }
    }
    a {
        color:#fff;
    }
    a:hover {
        color:aquamarine;
    }
</style>