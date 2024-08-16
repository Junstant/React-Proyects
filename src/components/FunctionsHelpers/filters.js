// Function to filter the palettes by time
function timePaletteFilter(palette) {
    palette.sort((a, b) => {
        //convert the UTC string to a number
        a.time = new Date(a.time).getTime();
        b.time = new Date(b.time).getTime();
        return b.time - a.time;
    });
}
// Function to filter the popular palettes
function popularPaletteFilter(palette) {
    palette.sort((a, b) => {
        return b.likes - a.likes;
    });
}

// Function to order the palettes randomly
function randomPaletteFilter(palette) {
    for (let i = palette.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [palette[i], palette[j]] = [palette[j], palette[i]];
    }
    return palette;
}


export { popularPaletteFilter, timePaletteFilter, randomPaletteFilter };