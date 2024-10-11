<script lang="ts">
    import type {FigmaProject} from "$lib/FigmaProject";

    export let project: FigmaProject
</script>

<iframe title="Embedded Figma Prototype"
        src={project.EmbeddedPrototype()}
        allowfullscreen
/>

<style>
    iframe {
        display: block;

        max-width: 50rem;
        height: 30rem;
        width: 100%;

        margin: 0 auto;
    }
</style>
