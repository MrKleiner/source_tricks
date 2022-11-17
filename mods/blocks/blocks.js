




// Text block from the left and an image from the right
$this.ltext_rimg = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)

	// wait for the image to cache
	const imgcache = await $all.core.await_img_buffer(block_info.img)

	$('#article_blocks').append(`
		<div atype="ltext_rimg" class="article_entry">
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
	`)
}



// Pure text block
$this.pure_text = async function(block_info)
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
$this.header = async function(block_info)
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
$this.note = async function(block_info)
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
$this.hint = async function(block_info)
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
$this.warning = async function(block_info)
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
$this.see_also = async function(block_info)
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
$this.vdc_code = function(block_info)
{
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="vdc_code" class="article_entry">
			<div class="text_block vdc_code_text">${lizard.atob(block_info.text)}</div>
		</div>
	`)
}




// a singular image
$this.raw_img = async function(block_info)
{
	const align_dict = {
		'left': 'flex-start',
		'right': 'flex-end',
		'center': 'center'
	}
	print('ok, spawning shit:', block_info)

	// await image cache
	const imgcache = await $all.core.await_img_buffer(block_info.src)

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



$this.signed_enum = function(block_info)
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




























$all.core.article_loader('3c3662bcb661d6de679c636744c66b62')