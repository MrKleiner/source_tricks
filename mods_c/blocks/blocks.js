
if (!window.bootlegger){window.bootlegger = {}};

if (!window.bootlegger.blocks){window.bootlegger.blocks={}};

window.bootlegger.blocks.blocks = {};


// Text block from the left and an image from the right
class block_ltext_rimg
{
	// constructor(height, width) {
	constructor(block_info) {
		// basically, fuck js
		const self = this;

		// initialize the block creation process
		return new Promise(async function(resolve, reject){
			// associate an id with this block for later operations
			const block_id = lizard.rndwave(24)

			// call spawner, which will return the element itself
			// and store the resulting html element in the class
			self.block_elem = await self.spawn(block_info, block_id)

			// store global reference to the class
			window.bootlegger.blocks.blocks[block_id] = self;

			// append block to the article
			$('#article_blocks').append(self.block_elem);

			// return the block element to the one who called "new"
			resolve(self.block_elem)
		});
	};

	get html() {
		return this.block_elem
	};

	// the spawn function should always return the element
	async spawn(block_info, blid){
		// height: ${block_info.img_y}px;
		print('ok, spawning shit:', block_info)

		// wait for the image to cache
		const imgcache = await window.bootlegger.core.await_img_buffer(block_info.img)

		// create the block element
		const block = $(`
			<div block_id="${blid}" atype="ltext_rimg" class="article_entry">
				<div class="text_block">${block_info.text}</div>
				<div class="image_unit">
					<img 
						class="image_elem imgmax"

						imgw="${block_info.img_x}"
						imgh="${block_info.img_y}"
						src="${imgcache.src}"
						style="width: ${block_info.img_x}px;"
					>
					<div class="image_caption">${block_info.img_caption}</div>
				</div>
			</div>
		`);

		// and also return the block element itself
		return block
	};


}
window.bootlegger.blocks.ltext_rimg = block_ltext_rimg;








// Pure text block
window.bootlegger.blocks.pure_text = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="pure_text" class="article_entry">
			<div class="text_block">${block_info.text}</div>
		</div>
	`)
}


// A big bold title
window.bootlegger.blocks.header = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="header" class="article_entry">
			<div class="text_block text_header">${block_info.text}</div>
		</div>
	`)
}

// A big bold title
window.bootlegger.blocks.note = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="note" class="article_entry">
			<div class="note_header">
				<div class="note_icon"></div>
				<div class="note_title">Note</div>
			</div>
			<div class="text_block note_text">${block_info.text}</div>
		</div>
	`)
}




// A big bold title
window.bootlegger.blocks.hint = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="hint" class="article_entry">
			<div class="hint_header">
				<div class="hint_icon"></div>
				<div class="hint_title">Hint</div>
			</div>
			<div class="text_block hint_text">${block_info.text}</div>
		</div>
	`)
}



// A big bold title
window.bootlegger.blocks.warning = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="warning" class="article_entry">
			<div class="warning_header">
				<div class="warning_icon"></div>
				<div class="warning_title">Warning</div>
			</div>
			<div class="text_block warning_text">${block_info.text}</div>
		</div>
	`)
}




// A big bold title
window.bootlegger.blocks.see_also = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="see_also" class="article_entry">
			<div class="see_also_header">
				<div class="see_also_icon"></div>
				<div class="see_also_title">See Also</div>
			</div>
			<div class="text_block see_also_text">${block_info.text}</div>
		</div>
	`)
}



// super simple monospace blocks
// no highlight no anything
// but still useful
window.bootlegger.blocks.vdc_code = function(block_info)
{
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="vdc_code" class="article_entry">
			<div class="text_block vdc_code_text">${lizard.atob(block_info.text)}</div>
		</div>
	`)
}




// a singular image
window.bootlegger.blocks.raw_img = async function(block_info)
{
	const align_dict = {
		'left': 'flex-start',
		'right': 'flex-end',
		'center': 'center'
	}
	print('ok, spawning shit:', block_info)

	// await image cache
	const imgcache = await window.bootlegger.core.await_img_buffer(block_info.src)

	$('#article_blocks').append(`
		<div 
			atype="raw_img"
			class="article_entry"
			style="align-items: ${align_dict[block_info.align] ? align_dict[block_info.align] : ''}"
		>
			<img 
				style="width:${block_info.size*100}%"
				class="img_entry imgmax"
				src="${imgcache.src}"
			>
			<div class="img_caption">${block_info.caption}</div>
		</div>
	`)
}



window.bootlegger.blocks.signed_enum = function(block_info)
{
	print('ok, spawning shit:', block_info)

	var entries = []

	for (var entry of block_info.enum_entries){
		entries.push(`
			<div class="enum_unit">
				<div class="enum_unit_title">${entry.title}</div>
				<div class="enum_unit_text">${entry.text}</div>
			</div>
		`)
	}

	$('#article_blocks').append(`
		<div atype="signed_enum" class="article_entry">
			${entries.join('')}
		</div>
	`)
}




























window.bootlegger.core.article_loader('3c3662bcb661d6de679c636744c66b62')