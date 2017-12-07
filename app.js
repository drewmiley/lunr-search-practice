console.log('hello');

console.log($);

console.log(lunr);

const keywordValues = ['Apple', 'Banana', 'Cucumber', 'Dolcelatte', 'Edam', 'Fries', 'Gorgonzola', 'Houmous', 'Icing', 'Jelly', 'Kumquat', 'Lichen', 'Melon', 'Neuro', 'Olive'];

const titlePrefixes = ['Part', 'Name', 'Worker', 'Key'];

const itemsToGenerate = 10000;

const documents = Array(itemsToGenerate).fill(undefined).map((d, i) => {
	const id = `${ titlePrefixes[Math.floor(titlePrefixes.length * Math.random())] }000AB${ i }`;
	const name = `${ keywordValues[Math.floor(keywordValues.length * Math.random())] }-${ titlePrefixes[Math.floor(titlePrefixes.length * Math.random())] }-${ keywordValues[Math.floor(keywordValues.length * Math.random())] }`;
	const keywords = Array(Math.ceil(3 * Math.random())).fill(undefined).map((d, i) => keywordValues[Math.floor(keywordValues.length * Math.random())]);
	return { id, ID: id, name, keywords };
});

var lunrSearchID = lunr(function() {
	this.ref('id')
	this.field('ID')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

var t0 = performance.now();

const idSearchResults = lunrSearchID.search('*000AB234*');

var t1 = performance.now();

console.log(idSearchResults);
console.log(t1 - t0);

t0 = performance.now();

const jqIDsearchResults = $.grep(documents, d => {
	return d.ID.search(new RegExp(/(.?)000AB234(.?)/)) !== -1;
});

t1 = performance.now();

console.log(jqIDsearchResults);
console.log(t1 - t0);

var lunrSearchName = lunr(function() {
	this.ref('id')
	this.field('name')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

t0 = performance.now();

const nameSearchResults = lunrSearchName.search('Part Apple');

t1 = performance.now();

console.log(nameSearchResults);
console.log(t1 - t0);

t0 = performance.now();

const jqnameSearchResults = $.grep(documents, d => {
	return d.name.search(new RegExp(/((.?)Part(.?)Apple(.?))|((.?)Apple(.?)Part(.?))/)) !== -1;
});

t1 = performance.now();

console.log(jqnameSearchResults);
console.log(t1 - t0);

var lunrSearchKeywords = lunr(function() {
	this.ref('id')
	this.field('keywords')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

t0 = performance.now();

const keywordsSearchResults = lunrSearchKeywords.search('Houmous');

t1 = performance.now();

console.log(keywordsSearchResults);
console.log(t1 - t0);

t0 = performance.now();

const jqKeywordsSearchResults = $.grep(documents, d => {
	return d.keywords.includes('Houmous');
});

t1 = performance.now();

console.log(jqKeywordsSearchResults);
console.log(t1 - t0);