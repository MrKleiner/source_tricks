




// Text block from the left and an image from the right
$this.ltext_rimg = async function(block_info)
{
	// height: ${block_info.img_y}px;
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div atype="ltext_rimg" class="article_entry">
			<div class="text_block">${block_info.text}</div>
			<div class="image_unit">
				<img 
					class="image_elem"

					imgw="${block_info.img_x}"
					imgh="${block_info.img_y}"
					src="${block_info.img}"
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
$this.raw_img = function(block_info)
{
	const align_dict = {
		'left': 'flex-start',
		'right': 'flex-end',
		'center': 'center'
	}
	print('ok, spawning shit:', block_info)
	$('#article_blocks').append(`
		<div 
			atype="raw_img"
			class="article_entry"
			style="align-items: ${align_dict[block_info.align] ? align_dict[block_info.align] : ''}"
		>
			<img style="width:${block_info.size*100}%" class="img_entry" src="${block_info.src}">
			<div class="img_caption">${block_info.caption}</div>
		</div>
	`)
}
































$all.core.article_loader('3c3662bcb661d6de679c636744c66b62')