export type NodeId = number;

export type Node = {
    longitude: number;
    latitude: number;
}

export type Edge = {
    source: NodeId;
    target: NodeId;
    time: number; // Hundredths of seconds
    distance: number; // metres
    speedLimit: number; // km/h
}

export type NodeMap = Map<NodeId, Node>;
export type EdgeMap = Map<NodeId, Edge[]>;

export type GraphData = {
    nodeMap: Map<NodeId, Node>;  // This is a NodeMap, but it's typed out to give clearer intellisense
    edgeMap: Map<NodeId, Edge[]>;  // Same here, with EdgeMap
}