<script lang="ts">
    export let thickness = "1mm";
    export let angle = "270deg";
    export let color = "gray";
    export let rotation = "-135deg";
</script>

<div class="arc"
     style="--thickness: {thickness}; --angle: {angle}; --color: {color}; --rotation: {rotation}"
/>

<style>
    .arc {
        transform: rotate(var(--rotation));
        position: absolute;
        width: calc(100% - 2 * var(--thickness));

        aspect-ratio: 1;
        padding: var(--thickness);
        border-radius: 50%;
        background: var(--color);
        --_g: / var(--thickness) var(--thickness) no-repeat
        radial-gradient(50% 50%,#000 97%,#0000);
        mask:
                top var(--_g),
                calc(50% + 50%*sin(var(--angle)))
                calc(50% - 50%*cos(var(--angle))) var(--_g),
                linear-gradient(#0000 0 0) content-box intersect,
                conic-gradient(#000 var(--angle),#0000 0);
    }
</style>