<script lang="ts">
    const size = '8cm';
</script>

<div class="knob-screen" style="--size: {size}">
    <slot/>
</div>

<style>
    .knob-screen {
        position: relative;
        height: var(--size);
        width: var(--size);
        border-radius: 100%;
        background: black;
    }
</style>
