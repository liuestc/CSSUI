var $=require('./zepto.js');


var data={
	ajax:function(url,data,success,type,method){
		if(!data||typeof data!=='object'){
			data={}
		}
		if(!type|| type!=='string'){
			type='json'
		}
		if(!method||typeof method!=='string'){
			method="GET"
		}

		$.ajax({
			type:method,
			url:url,
			data:data,
			dataType:type,
			success:function(res){
				success&& typeof success=='function'&& success(res)
			},
			timeout:10000,
			error:function(res,status,error){
				console.log(res+status+error)
			}

		})
	},
	getTest:function(success){
		this.ajax('../src/test.json',{"data1":"1","data2":"2"},success);
	}
}
// module.exports=data;
module.exports = data;