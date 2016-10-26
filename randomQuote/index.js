function getQuote() {
	$.ajax({
		url: 'http://api.hitokoto.cn/?c=b',
		success: function(res) {
			//console.log(res);
			console.log(typeof(res));
			r = JSON.parse(res);
			//console.log(r)
			author = r.from;
			quote = r.hitokoto;
			//console.log(author);
			$('.quote').html(quote);
			$('.author').html(author);
		}
	})
}
$(function() {

	console.log('11')
})