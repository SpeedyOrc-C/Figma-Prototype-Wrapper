import type {FigmaMessage} from "$lib/FigmaMessage";
import type {FigmaMessageReceiver} from "$lib/FigmaMessageReceiver";
import {SerialHttpDaemon} from "$lib/SerialHttpDaemon";

export class Figma2Serial implements FigmaMessageReceiver
{
    private daemon = new SerialHttpDaemon(50001);

    ReceiveFigmaMessage(message: FigmaMessage): void
    {
        if (message.type != 'MOUSE_PRESS_OR_RELEASE') return;

        const targetNodeId = message.data.targetNodeId;

        console.log(`Sending...`)

        this.daemon.Send(targetNodeId).then(() =>
        {
            console.log(`Sent: ${targetNodeId}`);
        }).catch(() =>
        {
            console.log(`Failed to send`)
        });
    }
}
