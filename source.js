// 1 2 3 4
// green red yellow blue

function playMusic(i) {
	var foo;
	switch(i) {
		case 1:
		foo=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",100,false);
		foo.play();
		break;
		case 2:
		foo=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",100,false);
		foo.play();
		break;
		case 3:
		foo=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",100,false);		
		foo.play();
		break;
		case 4:
		foo=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",100,false);
		foo.play();
		break;
	}
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

function stripClass(i,t) {
	setTimeout(function(){
		$('#'+i).removeClass('color-active');
	},t);
}

function runSequence(sequence) {
	var i=0;
	setInterval(function(){
		$('#'+sequence[i]).addClass('color-active');
		playMusic(sequence[i]);
		stripClass(sequence[i],200);
		i=i+1;
	},500);
}

function play(sequence,l) {
	// stopped till here
	if (l===1)
		return sequence;
	else {
		var colors = [1,2,3,4];
		var choice = colors[Math.floor(Math.random() * colors.length)];
		sequence.push(choice);
		runSequence(sequence);
	}
}

$(document).ready(function() {
	
	var colors = [1,2,3,4];
	var choice;
	var sequence = [];
	var answers = [];
	var winning = true;
	var started = true;
	var l=0;
	var strict = false;
	var wins = 0;

	$("#play").click(function() {
		if (winning){
			choice = colors[Math.floor(Math.random() * colors.length)];
			sequence.push(choice);
			var p = parseInt($('#points').html());
			p+=1;
			$('#points').html(p);
			runSequence(sequence);
			l+=1;
		}
	});

	$(".cell").click(function() {
		var choice = parseInt($(this).attr('id'));
		answers.push(choice);
		if (answers.length===sequence.length) {
			if (arraysEqual(answers,sequence) && wins<20) {
				$('#banner').html('Correct!');
				console.log('Correct!');
				wins+=1;
				l+=1;
				if (wins===20) {
					$('#banner').html('You are a Pro');
					console.log('You are a Pro');
					setTimeout(function(){
						location.href = location.href;
					},2000);
				}
				else {
					var p = parseInt($('#points').html());
					p+=1;
					$('#points').html(p+'');
					play(sequence,started);
					answers = [];
				}
			}
			else {
				if (strict) {
					winning = false;
					$('#banner').html('Lost :(');
					console.log('Lost :(');
				}
				else {
					runSequence(sequence);
					answers = [];
				}
			}
		}
	});

	$("#strict").click(function() {
		strict = !strict;
		if (strict) {
			$('#status').html('<i class="fa fa-circle" id="strict" aria-hidden="true"></i>');
		}
		else {
			$('#status').html('&nbsp');
		}
	});

	$("#refresh").click(function() {
		location.href = location.href;
	});
});