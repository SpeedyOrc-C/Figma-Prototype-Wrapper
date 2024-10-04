<script lang="ts">
    import Arc from "$lib/Arc.svelte";

    const step = 6;

    let value = 2;
    let angle: string

    $: angle = `${value / step * 270}deg`

    function keydown(e: KeyboardEvent)
    {
        switch (e.code)
        {
            case 'Minus':
                if (value > 0)
                    value -= 1;
                break;
            case 'Equal':
                if (value < step)
                    value += 1;
                break;
        }
    }
</script>

<svelte:window on:keydown={keydown}/>

<div class="slider">
    <Arc color="#414141" />
    {#if value > 0}
        <Arc color="white" {angle} />
    {/if}
</div>

<style>
    .slider {
        --padding: 3mm;

        position: absolute;
        width: calc(100% - 2 * var(--padding));
        top: var(--padding);
        left: var(--padding);
    }
</style>