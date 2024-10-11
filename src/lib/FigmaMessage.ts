export type FigmaMessage
    = MousePressOrReleaseMessage
    | PresentedNodeChangedMessage
    | InitialLoadMessage
    | NewStateMessage
    | RequestCloseMessage

export interface Position
{
    x: number
    y: number
}

export interface ScrollOffset
{
    x: number
    y: number
}

export interface MousePressOrReleaseMessage
{
    type: 'MOUSE_PRESS_OR_RELEASE'
    data: {
        // If there are overlays showing, this is the node id of the
        // topmost overlay on screen. If there are no overlays showing
        // it's the id of the screen we're showing.
        presentedNodeId: string

        // Whether or not the user clicked a hotspot.
        handled: boolean

        // When this event isn't handled, this is the topmost
        // layer under the cursor.
        targetNodeId: string

        // Position relative to the top left corner of the target node;
        // this is unaffected by whether the target node is a scrolling
        // frame and has been scrolled.
        targetNodeMousePosition: Position

        // The nested-most scrolling frame enclosing the targetNode, or
        // the targetNode if it scrolls.
        nearestScrollingFrameId: string

        // Position relative to the top left corner of the scrolling frame;
        // this is unaffected by whether the target node is a scrolling
        // frame and has been scrolled.
        nearestScrollingFrameMousePosition: Position

        // The scroll offset of the above scrolling frame. If the target
        // node is a scrolling frame, you can use this and targetNodeLocation
        // to find where the click happened in the layer content bounds.
        nearestScrollingFrameOffset: ScrollOffset
    }
}

interface PresentedNodeChangedMessage
{
    type: 'PRESENTED_NODE_CHANGED',
    data: {
        // The ID of the top-most node on screen; either an overlay node id
        // or the id of the top level frame if there are no overlays showing.
        presentedNodeId: string

        // In Figma, users can create connections that go "back" to the previous
        // frame. To do this, Figma maintains its own history stack of frames that
        // the user has navigated through.
        //
        // We intentionally exclude some transitions from the history stack: ones
        // triggered via hover, mouse in and mouse out because this best matches
        // user expectations.
        isStoredInHistory: boolean

        // A map of (string) developer friendly node IDs of instances
        // -> (string) symbol IDs that they inherit from. This is useful for
        // determining the current states of interactive components on the screen.
        // This map only contains entries for instances in the current base screen
        // as well as any overlays being displayed.
        stateMappings: {
            [developerFriendlyNodeId: string]: string
        }
    }
}

interface InitialLoadMessage
{
    type: 'INITIAL_LOAD'
    data: {}
}

interface NewStateMessage
{
    type: 'NEW_STATE'
    data: {
        // The developer-friendly node ID of the instance that changed state.
        nodeId: string

        // The state ID (symbol ID) of the instance before the swap.
        currentVariantId: string
        // The state ID (symbol ID) of the instance after the swap.
        newVariantId: string
        // Same as PresentedNodeChangedMessage
        isStoredInHistory: boolean
        // Whether or not this was caused by an "after delay" interaction.
        // This is important b/c people use these for looping animations etc.
        isTimedChange: boolean
    }
}

interface RequestCloseMessage
{
    type: 'REQUEST_CLOSE',
    data: {}
}
