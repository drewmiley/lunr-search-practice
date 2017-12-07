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
	return { id, name, keywords };
});

const lunrSearch = lunr(function() {
	this.ref('id')
	this.field('id')
	this.field('name')
	this.field('keywords')

	documents.forEach(function(doc) {
		this.add(doc)
	}, this)
});

const logLunrSearchResultsId = () => {
	const t0 = performance.now();
	const searchResults = lunrSearch.search('id:*000AB234*');
	const t1 = performance.now();
	console.log('Lunr Search Results: id');
	console.log(searchResults);
	console.log(t1 - t0);
}

const logJquerySearchResultsId = () => {
	const t0 = performance.now();
	const searchResults = $.grep(documents, d => {
		return d.id.search(new RegExp(/(.?)000AB234(.?)/)) !== -1;
	});
	const t1 = performance.now();
	console.log('Jquery Search Results: id');
	console.log(searchResults);
	console.log(t1 - t0);
}

const logLunrSearchResultsName = () => {
	const t0 = performance.now();
	const searchResults = lunrSearch.search('name:Part Apple');
	const t1 = performance.now();
	console.log('Lunr Search Results: name');
	console.log(searchResults);
	console.log(t1 - t0);
}

const logJquerySearchResultsName = () => {
	const t0 = performance.now();
	const searchResults = $.grep(documents, d => {
		return d.name.search(new RegExp(/((.?)Part(.?)Apple(.?))|((.?)Apple(.?)Part(.?))/)) !== -1;
	});
	const t1 = performance.now();
	console.log('Jquery Search Results: name');
	console.log(searchResults);
	console.log(t1 - t0);
}

const logLunrSearchResultsKeywords = () => {
	const t0 = performance.now();
	const searchResults = lunrSearch.search('keywords:Houmous');
	const t1 = performance.now();
	console.log('Lunr Search Results: keywords');
	console.log(searchResults);
	console.log(t1 - t0);
}

const logJquerySearchResultsKeywords = () => {
	const t0 = performance.now();
	const searchResults = $.grep(documents, d => {
		return d.keywords.includes('Houmous');
	});
	const t1 = performance.now();
	console.log('Jquery Search Results: keywords');
	console.log(searchResults);
	console.log(t1 - t0);
}

logLunrSearchResultsId();
logJquerySearchResultsId();
logLunrSearchResultsName();
logJquerySearchResultsName();
logLunrSearchResultsKeywords();
logJquerySearchResultsKeywords();