import type {FigmaMessage} from "$lib/FigmaMessage";

export interface FigmaMessageReceiver
{
    ReceiveFigmaMessage(message: FigmaMessage): void
}
