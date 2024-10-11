export class FigmaProject
{
    constructor(
        public readonly ProjectId: string,
        public readonly NodeId: string | null = null,
    )
    {
    }

    static FromCoarseUrl(s: string): FigmaProject | null
    {
        const url = new URL(s);

        if (!url.host.endsWith("figma.com"))
            return null;

        const breadcrumb = url.pathname.split("/");

        if (breadcrumb.length < 3)
            return null;

        const projectId = breadcrumb[2];
        const nodeId = url.searchParams.get("node-id");

        return new FigmaProject(projectId, nodeId);
    }

    Design(): string
    {
        return `https://www.figma.com/design/${this.ProjectId}`;
    }

    EmbeddedPrototype()
    {
        if (this.NodeId == null)
            return `https://embed.figma.com/proto/${this.ProjectId}`;

        return `https://embed.figma.com/proto/${this.ProjectId}?node-id=${encodeURIComponent(this.NodeId)}&embed-host=example-domain`;
    }
}
