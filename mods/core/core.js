

const print = console.log;
const obj_url = (window.URL || window.webkitURL); 


// get index info of a certain article
// index contains the amount of blocks and other useful info, like aricle name
$this.get_article_index = async function(article_id)
{
	const request = await fetch(`/content/articles/${article_id}/index.sex`, {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	// response.status == 404
	// response.json()

	const got_shit = await request.json()
	return got_shit
}

// each article is split into individual boxes
// this function returns a json of a said block
$this.get_article_unit = async function(article_id, unit_id)
{
	const request = await fetch(`/content/articles/${article_id}/units/${unit_id}.bdsm`, {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	const got_shit = await request.json()
	return got_shit
}

// full article loader
$this.article_loader = async function(article_id)
{
	const article_index = await $this.get_article_index(article_id)

	print(article_index)

	$('#article_blocks').empty()

	for (let unit of range(article_index.unit_count)){
		var block = await $this.get_article_unit(article_id, unit)
		
		print('loaded a block:', block)
		
		// Each block is of a certain type
		// The blocks modules contains evaluators from them
		// The block type in the block json corresponds to the function name in the blocks module
		if(block.utype in $all.blocks){
			await $all.blocks[block.utype](block)
		}else{
			print('Unknown block type:', block.utype)
		}
	}
}


















