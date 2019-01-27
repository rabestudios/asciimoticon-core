const faces = require('../../modules/faces.module');
const text = require('../../modules/text.module');
const number = require('../../modules/number.module');
const symbols = require('../../modules/symbols.module');

/**
 * Builds a lookup dictionary for all the valid key-value pairs.
 * If useData parameter is not null, it writes it to the returned lookup
 * If any of the keys in the userData exists in the core lookup, it overwrites
 * the data in the core lookup with the user defined data.
 *
 * @param {*} userData
 */
exports.build = (userData) => {
    const core = exports.core();
    if (userData) {
        for (const hash in userData) {
            core[hash] = userData[hash];
        }
    }
    return core;
};

/**
 * Retrieves the core mappings from the asciimoticon-core API.
 */
exports.core = () => {
    const result = {};
    addFaces(result);
    addSymbols(result);
    addTextFunctions(result);
    addNumberFunctions(result);
    return result;
};

function addFaces(dictionary) {
    for (const name in faces) {
        const words = faces[name].words;
        const ascii = faces[name].ascii;
        words.forEach(word => dictionary[word] = ascii);
    }
}

function addSymbols(dictionary) {
    for (const name in symbols) {
        const words = symbols[name].words;
        const ascii = symbols[name].ascii;
        words.forEach(word => dictionary[word] = ascii);
    }
}

function addTextFunctions(dictionary) {
    dictionary['arcanetext'] = text.toArcanetext;
    dictionary['bubbletext'] = text.toBubbletext;
    dictionary['crazytext'] = text.toCrazytext;
    dictionary['fancytext'] = text.toFancytext;
    dictionary['fliptext'] = text.toFliptext;
    dictionary['fliptabletext'] = text.toFliptextTable;
    dictionary['witchtext'] = text.toWitchtext;
}

function addNumberFunctions(dictionary) {
    dictionary['dice'] = number.dice;
    dictionary['dollarbill'] = number.dollarbill;
    dictionary['loadingbar'] = number.loading;
}
