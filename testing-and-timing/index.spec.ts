import { expect, it } from "bun:test";
import { findShortestPath } from "../src/index";
import { loadNodes, loadEdges } from "./scaffolding";
import type { Edge, Node, NodeId, GraphData } from "../src/types";


const loadedMaps = new Map<string, GraphData>();

async function loadMap(mapPath: string): Promise<GraphData> {
    if (loadedMaps.has(mapPath)) {
        return loadedMaps.get(mapPath)!;
    }

    const nodeMap = await loadNodes(`${mapPath}/noder.txt`);
    const edgeMap = await loadEdges(`${mapPath}/kanter.txt`);

    const loadedMap = { nodeMap, edgeMap };
    loadedMaps.set(mapPath, loadedMap);

    return loadedMap;
}

function verifyShortestPath(edgePath: Edge[], correctNodePath: NodeId[]): boolean {
    if (!(edgePath.length > 0) || edgePath.length + 1 !== correctNodePath.length) {
        return false;
    }
    if (edgePath[0]!.source !== correctNodePath[0]) {
        return false;
    }
    for (let i = 0; i < edgePath.length; i++) {
        if (edgePath[i]!.target !== correctNodePath[i + 1]) {
            return false;
        }
    }
    return true;
}

type TestCase = {
    label: string;
    fromNodeId: NodeId;
    toNodeId: NodeId;
    correctPath: NodeId[];
    mapPath: string;  // Path to the DIRECTORY containing noder.txt and kanter.txt
};


import OsloTrondheim from "./precomputed-routes/2948202-7826348";  // 2030 nodes
import TrondheimOslo from "./precomputed-routes/7826348-2948202";  // 1981 nodes
import KårvågGjemnes from "./precomputed-routes/2800567-7705656";  // 344 nodes
import GjemnesKårvåg from "./precomputed-routes/7705656-2800567";  // 344 nodes
import EssoTervo from "./precomputed-routes/6441311-3168086"; // 5796 nodes

const TEST_CASES: readonly TestCase[] = [
    {
        label: "Trondheim to Oslo",
        fromNodeId: 7826348,
        toNodeId: 2948202,
        correctPath: TrondheimOslo,
        mapPath: "maps/norden",
    },
    {
        label: "Oslo to Trondheim",
        fromNodeId: 2948202,
        toNodeId: 7826348,
        correctPath: OsloTrondheim,
        mapPath: "maps/norden",
    },
    {
        label: "Kårvåg to Gjemnes",
        fromNodeId: 7705656,
        toNodeId: 2800567,
        correctPath: KårvågGjemnes,
        mapPath: "maps/norden",
    },
    {
        label: "Gjemnes to Kårvåg",
        fromNodeId: 2800567,
        toNodeId: 7705656,
        correctPath: GjemnesKårvåg,
        mapPath: "maps/norden",
    },
    {
        label: "Esso to Tervo",
        fromNodeId: 3168086,
        toNodeId: 6441311,
        correctPath: EssoTervo,
        mapPath: "maps/norden",
    },
];

for (const testCase of TEST_CASES) {
    it(testCase.label, async () => {
        const path = findShortestPath(testCase.fromNodeId, testCase.toNodeId, await loadMap(testCase.mapPath)); 
        expect(verifyShortestPath(path, testCase.correctPath)).toBeTrue();
    });
}