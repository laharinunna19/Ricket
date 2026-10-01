function normalizeOutput(output) {

    return String(output)
        .trim()
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map(line => line.trim())
        .join("\n");

}


function compareOutput(
    actual,
    expected
) {

    return (
        normalizeOutput(actual) ===
        normalizeOutput(expected)
    );

}


module.exports = {
    compareOutput,
    normalizeOutput
};
