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

const idSearchResults = lunrSearchID.search('*000AB234*');

console.log(idSearchResults);

var lunrSearchName = lunr(function() {
	this.ref('id')
	this.field('name')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

const nameSearchResults = lunrSearchName.search('Part Apple');

console.log(nameSearchResults);

var lunrSearchKeywords = lunr(function() {
	this.ref('id')
	this.field('keywords')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

const keywordsSearchResults = lunrSearchKeywords.search('Houmous');

console.log(keywordsSearchResults);