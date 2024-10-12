import type {FigmaMessageReceiver} from "$lib/FigmaMessageReceiver";
import type {FigmaMessage} from "./FigmaMessage";

export default class FigmaMessageLogger implements FigmaMessageReceiver
{
    ReceiveFigmaMessage(message: FigmaMessage): void
    {
        console.log(message);
    }
}
