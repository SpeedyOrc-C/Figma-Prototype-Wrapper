import type {FigmaMessageReceiver} from "$lib/FigmaMessageReceiver";
import type {FigmaMessage} from "$lib/FigmaMessage";

export default class FigmaNodeLogger implements FigmaMessageReceiver
{
    constructor(private UpdateUI: () => void)
    {
    }

    pressedNodes: Set<string> = new Set();
    lastPressedNode: string | null = null;

    ReceiveFigmaMessage(message: FigmaMessage)
    {
        if (message.type != 'MOUSE_PRESS_OR_RELEASE') return;

        const targetNodeId = message.data.targetNodeId;

        if (targetNodeId == null) return;

        this.lastPressedNode = targetNodeId;
        this.pressedNodes.add(targetNodeId);

        this.UpdateUI();
    }
}
