
function get_lol()
{
	// console.log(JSON.stringify())
}

$(document).ready(function(){

	// FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU
	// OVERTHINKING WILL KILL ME EVENTUALLY
	// fetch('d.t')
	fetch('d.t', {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		}
	})
	.then(response => response.text())
	.then(data => pload(data) );

});


document.addEventListener('click', event => {
    // console.log('click_registered');

    const pringles = event.target.closest('#previews');
    const helper = event.target.closest('#mail_shown');
    if (pringles) { close_preview(pringles, helper) }

});


function pload(te)
{
	// console.log(te);
	var urlParams = new URLSearchParams(window.location.search);
	var spcontent = CryptoJS.AES.decrypt(te, urlParams.get('kt')).toString(CryptoJS.enc.Utf8);
	window.pcontent = JSON.parse(spcontent);
	console.log(window.pcontent);
	// 
	console.log(urlParams.get('p'))
	if (urlParams.get('p') != null)
	{
		if (urlParams.get('p').split('')[0] == '1')
		{
			$('#logo_img')[0].src = window.pcontent['about']['alt_logo'];
		}
	}else{
			$('#logo_img')[0].src = 'https://cdn.discordapp.com/attachments/598184638367924283/953874658309058580/8636c7f7fc6014082644c641e319825d.png';
	}


	// static (actually comes last)
	$('#text_about').append(pcontent['about']['shortabout']);

	// soft
	$('#about_soft').append('<div id="about_text_inner">' + pcontent['about']['soft'] + '</div>');

	$('#my_tg').attr('href', pcontent['about']['telega'])

	// construct boxes
	for (var bx of pcontent['blocks'])
	{
		var me_box = $('<div class="pics_box"></div>');
		for (var pic of bx)
		{
			var pair = $('<div class="pic_pair"></div>');
			pair.append('<div class="pic_text">' + pic['descr'] + '</div>');
			pair.append('<img src=' + pic['link'] + ' class="box_pic">');
			
			me_box.append(pair);
		}
		$('#pic_boxes').append(me_box);
	}
	$('#pic_boxes').prepend('<div id="alltitle">Stuff I made</div>');
}





function showgmail()
{
	$('#mail_shown').remove();
	$('#previews').append('<input readonly value="' + window.pcontent['about']['gmail'] + '" id="mail_shown"></input>');
	$('#previews').removeClass('nodisplay');
	$('#mail_shown').select();
}


function close_preview(nen, poot)
{
	console.log(nen, poot)
	if (poot == null)
	{
		$('#mail_shown').remove();
		$('#previews').addClass('nodisplay');
	}

}