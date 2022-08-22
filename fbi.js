// logger



class csi
{
	constructor() {
		console.log('Initialized logger');
	};

	console_log(txt='', style={}){
		if (txt.constructor == Object){
			var feedback_item = lizard.ehtml(
				`<p class="fback_item_code fback_item language-json">${JSON.stringify(txt, null, 2)}</p>
			`)
			$('#save_feedback_feed').append(feedback_item)
			hljs.highlightElement(feedback_item)
		}else{
			var feedback_item = $(`<p class="fback_item language-json">${txt}</p>`)
			$(feedback_item).css(style)
			$('#save_feedback_feed').append(feedback_item)
		}

		// feedback_item.scrollIntoView()
		$('#save_feedback')[0].scrollTo(0, 214748364)

	}

}
window.fbi = new csi();

