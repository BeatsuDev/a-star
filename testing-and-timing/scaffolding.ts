/**
 * Methods for loading in MapData (creating a {@link NodeMap} and {@link EdgeMap}).
 */
import type { NodeId, Node, NodeMap, Edge, EdgeMap } from "../src/types";


export async function loadNodes(path: string): Promise<NodeMap> {
    const content = await Bun.file(path).text();
    const lines = content.split("\n");

    const [firstLine, ...otherLines] = lines;
    if (!firstLine || firstLine.length === 0) {
        throw new Error(`${path} is empty`);
    }
    
    const nodeCount = parseInt(firstLine.trim(), 10);
    if (isNaN(nodeCount)) {
        throw new Error(`Invalid node count in ${path}`);
    }

    const nodeMap: NodeMap = new Map<NodeId, Node>();

    for (let i = 0; i < nodeCount; i++) {
        const line = otherLines[i];
        if (line === undefined) {
            throw new Error(`Missing node data in ${path}`);
        }

        const data = line.split(" ");
        if (data.length !== 3 || data[0] == undefined || data[1] == undefined || data[2] == undefined) {
            throw new Error(`Invalid node data in ${path} at line: ${i}`);
        }

        const node: Node = {
            longitude: parseFloat(data[1]),
            latitude: parseFloat(data[2])
        };

        nodeMap.set(
            parseInt(data[0], 10),
            node
        );
    }
    return nodeMap;
}

export async function loadEdges(path: string): Promise<EdgeMap> {
    const content = await Bun.file(path).text();
    const lines = content.split("\n");

    const [firstLine, ...otherLines] = lines;
    if (!firstLine || firstLine.length === 0) {
        throw new Error(`${path} is empty`);
    }
    
    const edgeCount = parseInt(firstLine.trim(), 10);
    if (isNaN(edgeCount)) {
        throw new Error(`Invalid edge count in ${path}`);
    }

    const edgeMap: EdgeMap = new Map<NodeId, Edge[]>();

    for (let i = 0; i < edgeCount; i++) {
        const line = otherLines[i++];

        if (line === undefined) {
            throw new Error(`Missing edge data in ${path}`);
        }

        const data = line.split("\t");
        if (data.length !== 5 || data[0] == undefined || data[1] == undefined || data[2] == undefined || data[3] == undefined || data[4] == undefined) {
            throw new Error(`Invalid edge data in ${path} at line: ${i}`);
        }

        const edge: Edge = {
            source: parseInt(data[0], 10),
            target: parseInt(data[1], 10),
            time: parseInt(data[2], 10),
            distance: parseInt(data[3], 10),
            speedLimit: parseInt(data[4], 10)
        };

        if (!edgeMap.has(edge.source)) {
            edgeMap.set(edge.source, []);
        }
        edgeMap.get(edge.source)!.push(edge);
    }
    return edgeMap;
}