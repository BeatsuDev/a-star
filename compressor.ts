// Script to decompress map files
async function compress() {
    const nodeFile = "./maps/norden/noder.txt";
    const edgeFile = "./maps/norden/kanter.txt";

    const nodeData = await Bun.file(nodeFile).text();
    const edgeData = await Bun.file(edgeFile).text();

    // Split into 120 MB chunks to and compress to avoid GitHub's 50 MB limit

    const data = nodeData + edgeData;
    const chunkSize = 120 * 1024 * 1024; // 120 MB
    const chunks = Math.ceil(data.length / chunkSize);
    console.log("Number of chunks:", chunks);

    for (let i = 0; i < chunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, data.length);
        const chunk = data.slice(start, end);

        const compressedChunk = Bun.gzipSync(Buffer.from(chunk));
        await Bun.write(Bun.file(`./maps/norden/chunk_${i}.gz`), compressedChunk);
        console.log(`Compressed chunk ${i}:`, compressedChunk.length);
    }
}

async function decompress() {
    const chunkFiles = [...Array(6).keys()].map(i => `./maps/norden/chunk_${i}.gz`);
    const decompressedData = await Promise.all(chunkFiles.map(async (file) => {
        const compressedChunk = await Bun.file(file).arrayBuffer();
        return Bun.gunzipSync(compressedChunk);
    }));

    const allData = Buffer.concat(decompressedData);
    const nodeData = allData.slice(0, 237595489);
    const edgeData = allData.slice(237595489);

    await Bun.write(Bun.file("./maps/norden/noder.txt"), nodeData);
    await Bun.write(Bun.file("./maps/norden/kanter.txt"), edgeData);

    // Delete the chunk files
    for (const file of chunkFiles) {
        await Bun.file(file).unlink();
    }
}

// Invoke compress if flag passed, otherwise decompress
console.log(Bun.argv)
if (Bun.argv[2] === "--decompress") {
    await decompress();
} else {
    await compress();
}