	over()
	function over(){
		ajax1({
			type:"get",
			url:"http://localhost:8000/get",
			success:function(da){
				var arr = eval('('+da+')')
//				console.log()
var str = ''
				for(var i=0;i<arr.length;i++){
					str+=`<a href="http://localhost:8000/?uid=${arr[i].uid}">
					<li>新闻名：${arr[i].name}</li>
					<span>发布人：${arr[i].textname}</span>
					<ol>${arr[i].text}</ol>
							<button onclick='shan()'>删除</button>
					</a>
					    `
				}
				ul.innerHTML = str
			},
			error:function(da){
				console.log(da)
			}
		  })
	}
		
		
		btn.onclick = function(){
			ajax1({
			type:"get",
			url:"http://localhost:8000/lu",
			data:{
				text:texts.value,
				name:names.value,
				textname:textname.value
			},
			success:function(da){
				console.log(da)
                over()
			},
			error:function(da){
				console.log(da)
			}
		  })
		}


	var idd=window.location.search.split('=')[1]
	function shan(){
		ajax1({
			type:"get",
			url:"http://localhost:8000/shan",
			data:{
				idd:idd
			},
			success:function(da){
				console.log(da)
			},
			error:function(da){
				console.log(da)
			}
		})
	}
		 function ajax1(text){
        	
        	var xhr = new XMLHttpRequest()
        	if(text.type == "get"){
    //这里是get
        xhr.open('get',text.url+'?'+strUrl(text.data),true)
        xhr.send()
        	}else{
        		//这里是post
        		xhr.open('post',text.url,true)
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
                xhr.send(strUrl(text.data))
        	}
        	xhr.onreadystatechange = function(){
        		if(xhr.readyState == 4){
        			if(xhr.status>=200&&xhr.status<300 || xhr.status==304){
        			  text.success(xhr.responseText)
        			}else{
        				text.error(xhr.status)
        			}
        		}
        	}
        	
        	function strUrl(json){
			var arr = []
		    for(i in json){
			arr.push(i+'='+json[i])
		    }
		    var str = arr.join('&')
		    return str
		   
		    }
        }	
		
		
