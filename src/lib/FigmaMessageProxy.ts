import type {FigmaMessageReceiver} from "$lib/FigmaMessageReceiver";

export class FigmaMessageProxy
{
    constructor(private _receivers: Array<FigmaMessageReceiver>)
    {
    }

    private ReceiveMessageEvent(e: MessageEvent)
    {
        if (e.origin != 'https://www.figma.com')
            return;

        for (const receiver of this._receivers)
            receiver.ReceiveFigmaMessage(e.data)
    }

    Start()
    {
        window.addEventListener('message',this.ReceiveMessageEvent.bind(this));
    }

    Stop()
    {
        window.removeEventListener('message', this.ReceiveMessageEvent.bind(this));
    }
}
