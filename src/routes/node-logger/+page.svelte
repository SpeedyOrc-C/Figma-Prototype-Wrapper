<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {FigmaProject} from "$lib/FigmaProject";
    import {FigmaMessageProxy} from "$lib/FigmaMessageProxy";
    import FigmaEmbed from "$lib/FigmaEmbed.svelte";
    import FigmaNodeLogger from "./FigmaNodeLogger";
    import FigmaMessageLogger from "$lib/FigmaMessageLogger";

    // 撰写自定义逻辑……
    let nodeLogger = new FigmaNodeLogger(Update);

    function Update()
    {
        nodeLogger = nodeLogger;
    }

    // 把 Figma 项目的 ID 和需要展示的界面的 ID 写在这里：
    const project = new FigmaProject('8Pk11wPp1ZJCgcxJzNkgwR', '39-210');

    // 把需要接受 Figma 信息的自定义逻辑列在这里：
    const proxy = new FigmaMessageProxy([nodeLogger, new FigmaMessageLogger()]);

    // 管理生命周期，照抄即可：
    onMount(() =>
    {
        proxy.Start();
        onDestroy(() => proxy.Stop());
    });
</script>

<FigmaEmbed {project}/>

<br>

<section>
    {#if nodeLogger.lastPressedNode == null}
        <header>Try to press something in the prototype...</header>
    {:else}
        <header>Last pressed node:</header>
        <div style="font-size: 2rem">
            <code>{nodeLogger.lastPressedNode}</code>
        </div>
    {/if}
</section>

<section>
    <header>Pressed nodes:</header>
    <ul style="font-size: 1.2rem">
        {#each nodeLogger.pressedNodes as node}
            <li><code>{node}</code></li>
        {/each}
    </ul>
</section>

<style>
    section {
        font-family: -apple-system, sans-serif;
    }

    header {
        font-size: 1.5rem;
    }
</style>