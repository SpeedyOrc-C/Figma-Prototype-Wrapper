<script lang="ts">
    import {onMount, onDestroy} from "svelte";
    import {FigmaProject} from "$lib/FigmaProject";
    import FigmaEmbed from "$lib/FigmaEmbed.svelte";
    import {FigmaMessageProxy} from "$lib/FigmaMessageProxy";
    import {Figma2Serial} from "./Figma2Serial";

    const figma2Serial = new Figma2Serial()

    const project = new FigmaProject('XvG64I58rodVjF0tVQhbGV', '1-5');

    const proxy = new FigmaMessageProxy([figma2Serial]);

    onMount(() =>
    {
        proxy.Start();
        onDestroy(() => proxy.Stop());
    });
</script>

<FigmaEmbed {project}/>
