import type { Node, NodeId, Edge, GraphData } from "./types";
import { loadNodes, loadEdges } from "../testing-and-timing/scaffolding";


export function findShortestPath(startNode: NodeId, endNode: NodeId, graphData: GraphData): Edge[] {
    const { nodeMap, edgeMap } = graphData;


    return []
}

async function main() {
    const graphData: GraphData = {
        nodeMap: await loadNodes("./maps/norden/noder.txt"),
        edgeMap: await loadEdges("./maps/norden/kanter.txt"),
    };
}

await main();