// mongoose-partial-full-search

module.exports = exports = function addPartialFullSearch(schema, options) {
    schema.statics = {
        ...schema.statics,
        makePartialSearchQueries: function (q) {
            if (!q) return {};
            const $or = Object.entries(this.schema.paths).reduce((queries, [path, val]) => {
                val.instance === "String" &&
                queries.push({
                    [path]: new RegExp(q, "gi")
                });
                return queries;
            }, []);
            return { $or }
        },
        searchPartial: function (q, populateValue, populateOptions, opts) {
            return this.find(this.makePartialSearchQueries(q), opts).populate(populateValue, populateOptions);
        },

        searchFull: function (q, populateValue, populateOptions, opts) {
            return this.find({
                $text: {
                    $search: q
                }
            }, opts).populate(populateValue, populateOptions);
        },

        search: function (q, populateValue, populateOptions, opts) {
            if(populateValue)
                return this.searchFull(q, populateValue, populateOptions, opts).then(data => {
                    return data.length ? data : this.searchPartial(q, populateValue, populateOptions, opts);
                });
            return this.searchFull(q, opts).then(data => {
                return data.length ? data : this.searchPartial(q, opts);
            });
        }
    }
};
