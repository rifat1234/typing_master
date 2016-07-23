$(document).ready(function(){
	var key_entered = 0,cur,line_len=0,line=[];
	var correct_word = 0 ,wrong_word=0;
	$(".input #reload").click(function(){
		location.reload();
	});
	$(".input #input_word").keypress(function(event){
		if(key_entered==0){
			startTimer(60,$(".input #timer"));
			cur = $(".output #para div").first();
			cur.addClass("highlight");
			line_len = cur.text().length;
			line.push(cur);

		}
		key_entered=1;
		if(event.keyCode == 32){

			var entered_word= $(".input #input_word").val();
			$(".input #input_word").val("");
			cur.removeClass("highlight")

			if(entered_word.replace(" ","") == cur.text()){
				cur.addClass("right");
				cur = cur.next();
				cur.removeClass("right");
				correct_word++;

			}else{
				cur.addClass("wrong");
				cur = cur.next();
				cur.removeClass("wrong");
				wrong_word++;
			}
			//var divHeight = cur.style.lineHeight;
			//$(".input #reload").val("$"+cur.text().length+"$");
			/**
			var cur_len = cur.text().length+1;
			if(cur_len+line_len >57){
				line_len=cur.length;
				for(var i =0;i<line.length;i++){
					line[i].hide();
				}
				line=[];
				line.push(cur);

			}else{
				
				line_len+=cur_len;
				line.push(cur);
			}
			**/
			if(cur.text().length == 0){
				line.push(cur);
				for(var i =0;i<line.length;i++){
					line[i].hide();
				}
				line = [];
				cur = cur.next();
			}
	
			//$(".input #reload").val(line_len);
			line.push(cur);
			cur.addClass("highlight");
		}


	});
	function startTimer(duration, display) {
    	var timer = duration, minutes, seconds;
    	var z = setInterval(function () {
        	minutes = parseInt(timer / 60, 10);
        	seconds = parseInt(timer % 60, 10);

        	minutes = minutes < 10 ? "0" + minutes : minutes;
        	seconds = seconds < 10 ? "0" + seconds : seconds;

        	display.text(minutes + ":" + seconds);
			timer=timer-1;
			if (timer < 0) {
				$(".output").hide();
				$(".input").hide();
				$(".result").css("display","block");
				$(".result #r_wpm").html(correct_word+wrong_word);
				$(".result #r_w").html(wrong_word);
				$(".result #r_c").html(correct_word);
            	clearInterval(z);

     		}
        
    }, 1000);

}
	function split_para(para){
		var new_para = para.split(' ');
		var result = [];
		var len = 0;
		for( var i = 0; i < new_para.length; i++ ) {
        	result[i] = '<div>' + new_para[i] + '</div>';
        	len += (new_para[i].length+1);
        	if(len>57){
        		result[i]="<br>"+result[i];
        		len = new_para[i].length+1;
        	}
		}
		return  result.join(' ');
    }
		
	var paragraph = "well-organized paragraph supports or develops a single controlling idea, which is expressed in a sentence called the topic sentence. A topic sentence has several important functions: it substantiates or supports an essay’s thesis statement; it unifies the content of a paragraph and directs the order of the sentences; and it advises the reader of the subject to be discussed and how the paragraph will discuss it. Readers generally look to the first few sentences in a paragraph to determine the subject and perspective of the paragraph. That’s why it’s often best to put the topic sentence at the very beginning of the paragraph. In some cases, however, it’s more effective to place another sentence before the topic sentence—for example, a sentence linking the current paragraph to the previous one, or one providing background information.";
	
	$(".output #para").html(split_para(paragraph));    
 		   

})

