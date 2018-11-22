const _ = require('lodash');

const eq = (a, b) => {
    if(a instanceof Date) {
        return a.getTime() === b.getTime();
    }
    return a === b;
}

const formatValue = (v) => JSON.stringify(v);

const uniqKeys = (obj1, obj2) => _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);

const recordAdded = (table, rec, ignore) => ({
    type: 'ADD',
    table,
    data: _.pickBy(rec, (v, k) => !ignore.includes(k)),
});

const recordDeleted = (table, rec, ignore) => ({
    type: 'DEL',
    table,
    data: _.pickBy(rec, (v, k) => !ignore.includes(k)),
});

const recordModified = (table, recSrc, recDst, ignore) => ({
    type: 'MOD',
    table,
    data: _.fromPairs(uniqKeys(recSrc, recDst).filter(k => !ignore.includes(k))
        .map(k => eq(recSrc[k], recDst[k]) ? [k, [recSrc[k]]] : [k, [recSrc[k], recDst[k]]])),
});

/**
 * Creates list of differences between two snapshots
 * @param {Object} dataSrc Source data snapshot
 * @param {Object} dataDst Target data snapshot
 * @param {Object} ignore Keys to ignore 
 * @returns {Array<{ type: String, table: String, data: { }>} Array of differences 
 */
const createDiff = (dataSrc, dataDst, ignore = {}) => {
    const allTables = uniqKeys(dataSrc, dataDst);

    let res = [];

    allTables.forEach((table) => {
        const tIgnore = ignore[table] || [];
        if(!dataSrc[table]) {
            Object.values(dataDst[table]).forEach(rec => res.push(recordAdded(table, rec, tIgnore)));
        } else if(!dataDst[table]) {
            Object.values(dataSrc[table]).forEach(rec => res.push(recordDeleted(table, rec, tIgnore)));
        } else {
            const allIds = uniqKeys(dataSrc[table], dataDst[table]);
            allIds.forEach((id) => {
                if(!dataSrc[table][id]) {
                    res.push(recordAdded(table, dataDst[table][id], tIgnore));
                } else if(!dataDst[table][id]) {
                    res.push(recordDeleted(table, dataSrc[table][id], tIgnore));
                } else {
                    const allKeys = uniqKeys(dataSrc[table][id], dataDst[table][id]);
                    if(!_.every(allKeys, key => eq(dataSrc[table][id][key], dataDst[table][id][key]))) {
                        res.push(recordModified(table, dataSrc[table][id], dataDst[table][id], tIgnore));
                    }
                }
            });
        }
    });

    return res;
};

/**
 * Creates list of differences between two snapshots
 * @param {Object} dataSrc Source data snapshot
 * @param {Object} dataDst Target data snapshot
 * @param {Object} ignore Keys to ignore 
 * @returns {String} Diff string in which each record is encoded in a new line 
 */
const createDiffString = (dataSrc, dataDst, ignore) => createDiff(dataSrc, dataDst, ignore).map(({ type, table, data}) => {
    switch(type) {
        case 'ADD':
            return `ADD ${table} ${_.entries(data).map(([k, v]) => `${k}=${formatValue(v)}`).join(',')}`;
        case 'DEL':
            return `DEL ${table} ${_.entries(data).map(([k, v]) => `${k}=${formatValue(v)}`).join(',')}`;
        case 'MOD':
            return `MOD ${table} ${_.entries(data).map(([k, vs]) => `${k}=${vs.length > 1 ? `${formatValue(vs[0])}->${formatValue(vs[1])}` : formatValue(vs[0])}`).join(',')}`;
    }
}).join('\n');

module.exports = {
    createDiff,
    createDiffString
};
