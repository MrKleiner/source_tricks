

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
	if (request.ok != true){
		return false
	}

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

$this.maximize_image = function(img)
{
	$('body > #img_fullscreen').remove();
	$('body').append(`
		<img id="img_fullscreen" src="${img.src}">
	`)
}

$this.remove_fullscreen_img = function()
{
	$('body > #img_fullscreen').remove();
}

// cache an image
$this.await_img_buffer = async function(url){
	return new Promise(function(resolve, reject){
	    const img = new Image();
	    img.src = url;

	    if (img.complete) {
	        resolve(img);
	    } else {
	        img.onload = () => {
	            resolve(img);
	        };

	        img.onerror = () => {
	            // todo: error handling
	            img.src = '';
	            resolve(img);
	        };
	    }
	});
}

// full article loader
$this.article_loader = async function(article_id)
{
	console.time('Full Article Load')

	const article_index = await $this.get_article_index(article_id)

	print(article_index)

	$('#article_blocks').empty()

	// display an error if article does not exist
	if (article_index == false){
		$('#article #article_header').text('Fatal Error: DE-GFAL. (page does not exist)')
		return
	}

	// show title
	$('#article #article_header').text(article_index.atitle)

	// load units one by one
	for (let unit of range(article_index.unit_count)){
		var block = await $this.get_article_unit(article_id, unit)
		
		print('loaded a block:', block)

		// Each block is of a certain type
		// The block type in the block json corresponds to the function name in the blocks module
		if(block.utype in $all.blocks){
			await $all.blocks[block.utype](block)
		}else{
			print('Unknown block type:', block.utype)
		}
	}

	console.timeEnd('Full Article Load')
}


















