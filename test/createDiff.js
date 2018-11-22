const snapshot = require('snap-shot-it');
const { createDiff } = require('../src');

describe('createDiff', function() {
    it('Works for empty snapshots', function() {
        const diff = snapshot(createDiff(
            { },
            { }
        ));
    });

    describe('One src table', function() {
        it('Works for empty table', function() {
            const diff = snapshot(createDiff(
                { 
                    foo: { },
                },
                { }
            ));
        });

        it('Works for one record', function() {
            const iff = snapshot(createDiff(
                {
                    foo: {
                        '1': { id: 1, key: 'val', date: new Date(0) },
                    },
                },
                { }
            ));
        });

        it('Works for two records', function() {
            const diff = snapshot(createDiff(
                {
                    foo: {
                        '1': { id: 1, key: 'val1', date: new Date(0) },
                        '2': { id: 2, key: 'val2', date: new Date(0) },
                    },
                },
                { }
            ));
        });
    });

    describe('One dst table', function() {
        it('Works for empty table', function() {
            const diff = snapshot(createDiff(
                { },
                { 
                    foo: { },
                }
            ));
        });

        it('Works for one record', function() {
            const diff = snapshot(createDiff(
                { },
                {
                    foo: {
                        '1': { id: 1, key: 'val', date: new Date(0) },
                    },
                }
            ));
        });

        it('Works for two records', function() {
            const diff = snapshot(createDiff(
                { },
                {
                    foo: {
                        '1': { id: 1, key: 'val1', date: new Date(0) },
                        '2': { id: 2, key: 'val2', date: new Date(0) },
                    },
                }
            ));
        });
    });

    describe('One table', function() {
        it('Works for empty table', function() {
            const diff = snapshot(createDiff(
                { 
                    foo: { },
                },
                { 
                    foo: { },
                }
            ));
        });

        it('Works for one record', function() {
            const diff = snapshot(createDiff(
                { 
                    foo: {
                        '1': { id: 1, key: 'foo', date: new Date(0) },
                    },
                },
                {
                    foo: {
                        '1': { id: 1, key: 'bar', date: new Date(1000000) },
                    },
                }
            ));
        });

        it('Works for two records', function() {
            const diff = snapshot(createDiff(
                {
                    foo: {
                        '1': { id: 1, key: 'val1', date: new Date(0) },
                        '2': { id: 2, key: 'val2', date: new Date(0) },
                    },
                },
                {
                    foo: {
                        '1': { id: 2, key: 'val1', date: new Date(0) },
                        '2': { id: 3, key: 'val2', date: new Date(0) },
                    },
                }
            ));
        });
    });

});