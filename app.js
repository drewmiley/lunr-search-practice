console.log('hello');

console.log($);

console.log(lunr);

const keywords = ['Apple', 'Banana', 'Cucumber', 'Dolcelatte', 'Edam', 'Fries', 'Gorgonzola', 'Houmous', 'Icing', 'Jelly', 'Kumquat', 'Lichen', 'Melon', 'Neuro', 'Olive'];

const titlePrefixes = ['Part', 'Name', 'Worker', 'Key'];

const itemsToGenerate = 10000;

const documents = new Array(itemsToGenerate).map((d, i) => {
	const id = `${ titlePrefixes[Math.floor(titlePrefixes.length * Math.random())] }000AB${ i }`;
	const name = `${ keywords[Math.floor(keywords.length * Math.random())] }
		${ titlePrefixes[Math.floor(titlePrefixes.length * Math.random())] }
		${ keywords[Math.floor(keywords.length * Math.random())] }`;
	const keywords = new Array(Math.ceil(3 * Math.random())).map((d, i) => keywords[Math.floor(keywords.length * Math.random())]);
	return { id, ID: id, name, keywords };
});

var lunrSearchID = lunr(function() {
	this.ref('id')
	this.field('ID')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

const idSearchResults = lunrSearchID.search('234');

console.log(idSearchResults);

var lunrSearchName = lunr(function() {
	this.ref('id')
	this.field('name')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

const nameSearchResults = lunrSearchName.search('PartApple');

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