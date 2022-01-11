window.blender_edit_mode = false
window.preview_mode = false

document.addEventListener('click', event => {
    console.log('click_registered');
  
    // holster-unholster
    const img_minimize = event.target.closest('.tut_img_button');
    if (img_minimize) { img_toggler(img_minimize) }

    // holster-unholster
    const hattrick = event.target.closest('.navbar-icon');
    if (hattrick) { activate_edit_mode(event) }

	// enable border
    const enableborder = event.target.closest('.enable_border_checkbox');
    if (enableborder) { enable_border_top(enableborder) }

	// enable border
    const border_suggest = event.target.closest('.border_color_suggestion');
    if (border_suggest) { set_border_top_col(border_suggest, true) }



	// box mover
    const boxmovert = event.target.closest('.article_movetop');
    if (boxmovert) { box_mover(boxmovert, 't') }

	// box mover
    const boxmoverb = event.target.closest('.article_movebot');
    if (boxmoverb) { box_mover(boxmoverb, 'b') }



	// delete preview image
    const imgdel = event.target.closest('.image_deleter');
    if (imgdel) { img_preview_delete(imgdel) }

	// add preview image
    const imgadd = event.target.closest('.image_adder_btn');
    if (imgadd) { img_preview_add(imgadd) }



	// add box
    const boxadd = event.target.closest('.add_box');
    if (boxadd) { add_bbox(boxadd) }

	// delete box
    const boxdel = event.target.closest('.delete_box');
    if (boxdel) { delete_bbox(boxdel, event) }


	// preview page
    const pagepreview = event.target.closest('.preview_page');
    if (pagepreview) { toggle_page_preview() }


	// toggle folder content
    const ftoggler = event.target.closest('.fname_text');
    if (ftoggler) { folder_toggler($(ftoggler).closest('.folder_name')) }

	// toggle folder content
    const ctman = event.target.closest('.ctg_button');
    if (ctman) { catalogue_manager(ctman, event) }




	// wrapper
    const wrapper = event.target.closest('.mkbold_text');
    if (wrapper) { wraptext() }






});

document.addEventListener('change', event => {
    console.log('change_registered');
  
    // border top colour
    const btopcol = event.target.closest('.top_border_color_inp');
    if (btopcol) { set_border_top_col(btopcol, false) }

    // image preview
    const imgprev = event.target.closest('.c_image_input');
    if (imgprev) { img_preview(imgprev) }

    // set size of the image
    const imgprev_size = event.target.closest('.c_image_size');
    if (imgprev_size) { img_preview_set_size(imgprev_size) }



});


$(document).ready(function(){

	fetch("content_index.sex", {
		"headers": {
			"accept": "*/*",
			"cache-control": "no-cache",
			"pragma": "no-cache"
		},
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": null,
		"method": "GET",
		"mode": "cors",
		"credentials": "omit"
	})
	.then(response => response.text())
	.then(data => $('.nav_stuff_box').append(data));

});




function surroundSelection(textBefore, textAfter) {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            var startNode = range.startContainer, startOffset = range.startOffset;

            var startTextNode = document.createTextNode(textBefore);
            var endTextNode = document.createTextNode(textAfter);

            var boundaryRange = range.cloneRange();
            boundaryRange.collapse(false);
            boundaryRange.insertNode(endTextNode);
            boundaryRange.setStart(startNode, startOffset);
            boundaryRange.collapse(true);
            boundaryRange.insertNode(startTextNode);

            // Reselect the original text
            range.setStartAfter(startTextNode);
            range.setEndBefore(endTextNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  var fuck = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  $(e).remove();
  return fuck
}

function htmlenc(inp)
{
	return $('<div/>').text(inp).html();
}


function img_toggler(etgt)
{
    // $(etgt).closest('.tut_step').find('img').toggleClass('e_hidden');
    $(etgt).closest('.tut_step').find('.tut_step_content').toggleClass('e_hidden');
}


function activate_edit_mode(evee)
{
	if (evee.altKey)
	{
		if (window.blender_edit_mode == false)
		{
			window.blender_edit_mode = true
			console.log('enter edit mode')
			// make article header editable
			$('.arcl_header_p').attr('contenteditable', true);
			// make articles editable
			$('.tut_step_head_text').attr('contenteditable', true);
			window.border_edit_m = 
			`
				<div class="at_border_edit_box">
					<label class="enable_border_checkbox"><input checked type="checkbox" class="at_border_top_ena_ch">Enable border</label>
					<input class="top_border_color_inp" type="color">
					<div class="suggest_border_colors">
						<div bgcol="#64DAFF" style="background-color: #64DAFF" class="border_color_suggestion"></div>
						<div bgcol="#64FF86" style="background-color: #64FF86" class="border_color_suggestion"></div>
						<div bgcol="#a064ff" style="background-color: #a064ff" class="border_color_suggestion"></div>
					</div>
					<div class="iliketomoveit">
						<div class="article_movetop"><div class="mv_triangle"></div></div>
						<div class="article_movebot"><div class="mv_triangle"></div></div>
					</div>
					<div class="delete_box">Del</div>
					<div class="mkbold_text">B</div>
				</div>

			`;
			var img_adder = 
			`
				<div class="image_adder_btn">Add Image</div>
			`;

/*			window.img_editor = 
			`
				<div class="image_editor">
					<input class="c_image_input" type="file" accept=".png,.jpeg,.jpg,.jfif,.bmp">
					<input class="c_image_size" type="number" class="image_sizer">
					<div class="image_deleter">Delete</div>
				</div>
			`;
			*/
			window.img_editor = 
			`
				<div class="image_editor">
					<input class="c_image_input" type="file" accept="image/png, image/gif, image/jpeg, image/bmp, image/webp">
					<input class="c_image_size" type="number" class="image_sizer">
					<div class="image_deleter">Delete</div>
				</div>
			`;

			var ctg_btns = 
			`
				<div fman_act="mv_tut" class="ctg_button move_ctg_item">M</div>
				<div fman_act="del_tut" class="ctg_button del_ctg_item">D</div>
			`;

			var folder_btns=
			`
				<div fman_act="add_tut" class="ctg_button add_ctg_tut">AT</div>
				<div fman_act="add_fld" class="ctg_button add_ctg_folder">AD</div>
				<div fman_act="mv_fld" class="ctg_button move_ctg_item">M</div>
				<div fman_act="del_fld" class="ctg_button del_ctg_item">D</div>
				<div fman_act="paste_elem" class="ctg_button paste_btn e_hidden">Here</div>

			`;


			$('.tut_step_head').append(border_edit_m);
			$('.tut_step').append(img_adder);
			$('.tut_step_content').append(img_editor);
			$('.article_content').append('<div class="add_box">Lizard Sex</div>');
			$('.article_content').append('<div class="cum_on_a_lizard">Cum on a sexy lizard</div>');
			$('.rquick_index').append('<div class="preview_page">Preview</div>');

			$('.nav_tutorial').append(ctg_btns);
			$('.folder_name').append(folder_btns);

			$('.nav-side').append('<div fman_act="cancel" class="ctg_button ctg_cancel_operation">Cancel</div>')
			$('.nav_stuff_box').prepend('<div fman_act="rootpaste" class="e_hidden ctg_button ctg_rootpaste">Paste To Root</div>')

			$('.tut_step_head').after('<input class="section_name" type="text">');



			// if an image has width style - show it
			console.log($('.tut_step_content'));

			tits = $('.tut_step_content');

			for (var nen in tits)
			{
				console.log(tits[nen]);
				var ime = $(tits[nen]).find('img');
				var target_f = $(tits[nen]).find('.c_image_size');
				if ($(ime)[0].hasAttribute('style'))
				{
					if ($(ime).attr('style').includes('width'))
					{
						$(target_f).val(parseFloat($(ime).css('width')));
					}
				}

			}
		}
	}
}

// borders
function enable_border_top(etgt)
{
	var cont = $(etgt).closest('.tut_step_head').find('.tut_step_head_text');
	var ch = $(etgt).find('input');
	console.log(cont)
	console.log(ch)

	// if border is there - set border width to 0
	console.log(ch[0].checked)
	if (!ch[0].checked)
	{
		$(cont).css('border-width', '0px');
	}

	// if not checked - try to pull previous state
	if (ch[0].checked)
	{
		if (cont[0].hasAttribute('bwidth'))
		{
			$(cont).css('border-width', $(cont).attr('bwidth') + 'px');
		}else{
			$(cont).css('border-width', '5px');
		}
		
	}
}

function set_border_top_col(etgt, sug)
{

	if(!sug)
	{
		$(etgt).closest('.tut_step_head').find('.tut_step_head_text').css('border-color', $(etgt).val());
		
	}
	if(sug)
	{
		console.log($(etgt).css('background'))
		$(etgt).closest('.tut_step_head').find('.tut_step_head_text').css('border-color', $(etgt).css('background-color'));
		$(etgt).closest('.tut_step_head').find('.top_border_color_inp').val($(etgt).attr('bgcol'));
	}

}


function box_mover(etgt, side)
{
	var soolja_box = $(etgt).closest('.tut_step')

	console.log('where is ' + side)
	
	if (side == 't')
	{
		console.log('exec t');
		soolja_box.insertBefore(soolja_box.prev());	
	}
	
	if (side == 'b')
	{
		console.log('exec b');
		soolja_box.insertAfter(soolja_box.next());	
	}

}



function img_preview(etgt)
{

	var image_slot = $(etgt).closest('.tut_step_content').find('img');
	console.log(image_slot)
    var reader = new FileReader();
    reader.readAsArrayBuffer(etgt.files[0], 'UTF-8');
    reader.onload = function (evt) {
		// var boobs = new Blob([new Uint8Array(reader.result)], {type: $('#lizards_pussy')[0].files[0] });
		var boobs = new Blob([reader.result], {type: etgt.files[0].type });
		
		var urlCreator = window.URL || window.webkitURL;
		var imageUrl = urlCreator.createObjectURL(boobs);
		
		$(image_slot)[0].src = imageUrl
		console.log(reader.result.length)
/*		console.log(reader.result);
		window.softimage = new Image();
		window.softimage.src = imageUrl;
		$('body').append(window.softimage);
		$('body').append('\n');
		console.log(reader.result.length)*/
		// document.getElementById('lizards_pussy2').setAttribute('value', reader.result);
    }

}



function img_preview_set_size(etgt)
{
	$(etgt).closest('.tut_step_content').find('img').css('width', $(etgt).val());

}

function img_preview_delete(etgt)
{

	$(etgt).closest('.tut_step_content').remove();
}

function img_preview_add(etgt)
{
	// tut_step_content
	$(etgt).before('<div class="tut_step_content"><img class="tut_img" src="">' + window.img_editor + '</div>')
}


function add_bbox(etgt)
{
	var bbox = 
	`
		<div class="tut_step">
			<div class="tut_step_head">
				<p contenteditable class="tut_step_head_text">cum</p>
				` + window.border_edit_m + `
			</div>
			<input class="section_name" type="text">
			<div class="image_adder_btn">Add Image</div>
		</div>
	`;

	$(etgt).before(bbox);

}


function delete_bbox(etgt, evee)
{
	if(evee.altKey)
	{
		$(etgt).closest('.tut_step').remove();
	}
}

function toggle_page_preview()
{
	/*
	at_border_edit_box
	image_adder_btn
	image_editor
	add_box
	cum_on_a_lizard
	section_name
	*/

	$('.at_border_edit_box, .image_adder_btn, .image_editor, .add_box, .cum_on_a_lizard, .section_name').toggleClass('e_hidden');
	if (window.preview_mode == false){
		window.preview_mode = true
		eval_to_colors()
	}else if(window.preview_mode == true){
		window.preview_mode = false
		eval_to_code()
	}
}


function folder_toggler(etgt)
{

	$(etgt).siblings('.folder_content').toggleClass('e_hidden');
}



function catalogue_manager(etgt, evee)
{
	console.log(etgt);

	if($(etgt).attr('fman_act') == 'mv_tut')
	{
		window.func_movelinear = $(etgt).closest('.nav_tutorial');
		$('.ctg_button').addClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').removeClass('e_hidden');
	}

	if($(etgt).attr('fman_act') == 'mv_fld')
	{
		window.func_movelinear = $(etgt).closest('.nav_folder');
		$('.ctg_button').addClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').removeClass('e_hidden');
		$(etgt).closest('.nav_folder').find('.paste_btn').addClass('e_hidden');
	}

	if($(etgt).attr('fman_act') == 'paste_elem')
	{
		$(etgt).closest('.folder_name').siblings('.folder_content').append(window.func_movelinear);
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
	}

	if($(etgt).attr('fman_act') == 'rootpaste')
	{
		$('.nav_stuff_box').append(window.func_movelinear);
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
	}


	if($(etgt).attr('fman_act') == 'cancel')
	{
		window.func_movelinear = 'nil';
		$('.ctg_button').removeClass('e_hidden');
		$('.paste_btn, .ctg_rootpaste').addClass('e_hidden');
	}

	if($(etgt).attr('fman_act') == 'del_fld' && evee.altKey)
	{
		$(etgt).closest('.nav_folder').remove();
	}
	if($(etgt).attr('fman_act') == 'del_tut' && evee.altKey)
	{
		$(etgt).closest('.nav_tutorial').remove();
	}







	$('.ctg_cancel_operation').removeClass('e_hidden');
}



function wraptext()
{
	surroundSelection('<st bold strike color="#64DAFF">', '</st>')
}



function eval_to_colors()
{

	// htmlDecode
	// $('.tut_step_head_text')

    $('.tut_step_head_text').each(function(){
        var appendant = htmlDecode($(this).html());
        $(this).empty();
        $(this).append(appendant);
    });

    $('st').each(function(){
    	$(this).css('color', $(this).attr('color'));
    });

}



function eval_to_code()
{
	// $($0).replaceWith(htmlenc($($0)[0].outerHTML.replaceAll('=""', '')))

    $('st').each(function(){
    	$(this).removeAttr('style');
        var convertor = htmlenc($(this)[0].outerHTML.replaceAll('=""', ''));
        $(this).replaceWith(convertor);
    });


}






