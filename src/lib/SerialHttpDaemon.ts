export class SerialHttpDaemon
{
    constructor(public readonly Port: number)
    {
    }

    async Send(data: string): Promise<void>
    {
        await fetch(`http://localhost:${this.Port}/send?data=${encodeURIComponent(data)}`);
    }

    async Read(size: number): Promise<string>
    {
        const response = await fetch(`http://localhost:${this.Port}/read?size=${encodeURIComponent(size)}`);
        return await response.text();
    }
}