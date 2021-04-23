
//Global variables
//You can fail only one objective that is why there is s2Fail and s4Fail.
//Then there are various items the user can pick up.
var availableButtons = [];
var name = "";
var s2Fail = false;
var s4Fail = false;
var audio;
var itemScrewdriver = false;
var tvent = false;
var janitor = false;
var cKO = false;
var aKO = false;
var mKeys = false;
var keycard = false;

function initialise() {
	
	//Disable all buttons but the start button by calling the appropriate function. This makes it easier to change what buttons are displayed in the future.
	availableButtons = ["button-left", "button-forward", "button-back", "button-right", "button-yes", "button-no", "button-jack", "button-gregor", "button-steve", "button-george", "button-inspect", "button-leave", "button-rack", "button-vent", "button-lobby", "button-lvent", "button-janitor", "button-builder", "button-doctor", "button-meeting", "button-construction", "button-office", "button-hall", "button-trash", "button-KO", "button-ctrash", "button-cKO", "button-swipe", "button-picks", "button-rope"];
	disableButton(availableButtons);
	//Start game button
	document.getElementById("button-start").addEventListener("click", function(){ startGame(); });
}

//Audio function. Volume set at 0.1 so it is not too loud and works as a background tune.
//Audio is from an open source/royalty free site called https://freemusicarchive.org/ It is by an artist called Jim Hall. 
function playAudio(name) {
	audio = new Audio(name);
	audio.volume = 0.1;
	audio.loop = true;
}

function startGame(){
	
	availableButtons = ["button-start"];
	disableButton(availableButtons);
	writeText("Do you want your Mp3 player Grey?");
	
	availableButtons = ["button-yes", "button-no"];
	enableButton(availableButtons);
	
	document.getElementById("button-yes").addEventListener("click", function(){ playAudio("LastBreath.mp3"); audio.play(); disableButton(availableButtons); s1();}, {once: true});
	document.getElementById("button-no").addEventListener("click", function(){ disableButton(availableButtons); s1(); }, {once: true});	
}

//Disables buttons on screen. Pass through an array of buttons you wish to disable.
function disableButton(availableButtons){
	
	for (i = 0; i < availableButtons.length; i++) {
		document.getElementById(availableButtons[i]).style.display = "none";
	}	
}
//Enables buttons on screen. Pass through an array of buttons you wish to enable.
function enableButton(availableButtons){
	
	for (i = 0; i < availableButtons.length; i++) {
		document.getElementById(availableButtons[i]).style.display = "";
	}
}

//Write text to the gameText html. Pass through a string to write to the html DOM
function writeText(lines){
	
	document.getElementById("gameText").innerHTML = lines;
}
//Scene 1 Floor 1 Main lobby 
function s1(){
	
	availableButtons = ["button-left", "button-forward", "button-back", "button-right"];
	enableButton(availableButtons);
	
	writeText("You are standing in the main lobby of the NIS headquarters! In front of you there is a receptionist with the name tag Tiana. To your left is a public bathroom. To your right is the staff only labelled door. Lastly, also obviously, the door behind you is where you entered from.");
	document.getElementById("button-left").addEventListener("click", function(){s3();});
	document.getElementById("button-forward").addEventListener("click", function(){s2();});
	document.getElementById("button-back").addEventListener("click", function(){document.getElementById("gameText").style.color = "red"; writeText("YOU GOT THE SCARED ENDING: Really Grey! I knew we should have hired someone else. Go back to your safe comfy home. Scaredy Cat!"); disableButton(availableButtons);}, {once: true});
	document.getElementById("button-right").addEventListener("click", function(){s4();});
}
//Scene 2 Floor 1 Receptionist 
function s2(){
	
	document.getElementById("button-jack").addEventListener("click", function(){name = "jack"; s2();});
	document.getElementById("button-gregor").addEventListener("click", function(){name = "gregor"; s2();});
	document.getElementById("button-steve").addEventListener("click", function(){name = "heather"; s2();});
	document.getElementById("button-george").addEventListener("click", function(){name = "george"; s2();});

	if (s4Fail == true){
		s22();
	}
	else if (name == "jack" || name == "george"){
		s21();
	}
	else if (s4Fail == false){
		if (name == "gregor" || name == "heather"){
			s2Fail = true;
			nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
			writeText("\"Get out of here, you don't have an appointment under the name " +  nameUpper + ".\"");
			disableButton(availableButtons);
			availableButtons = ["button-back"];
			enableButton(availableButtons);
			document.getElementById("button-back").addEventListener("click", function(){document.getElementById("gameText").style.color = "#FFFAFA"; s1();}, {once:true});
		}
		else{
				writeText("You walk up to the receptionist and ask how to get down to the second floor. She informs you that the second floor is only for designated meetings and you have to have an appointment. You state that you have an appointment and you need to be shown downstairs. She asks for your name to check the appointment list. What name do you choose?");
				disableButton(availableButtons);
				availableButtons = ["button-jack", "button-gregor", "button-steve", "button-george"];
				enableButton(availableButtons);
		}	
		
	}	
}

function s21(){
	writeText("\"Sorry " + name + ", we need to ask for security purposes\" states the receptionist. She hands you an ID badge and shows you to the elevator. You quickly scurry in and press floor 2 and tap your ID badge on the security machine on the elevator wall. With a whirring noise the elevator begins to descend...");
	disableButton(availableButtons);
	setTimeout(function(){s5();}, 10000);
}

function s22(){
	writeText("\"Oh! You must be the person my boss was talking about, he is waiting for you downstairs on floor 2. Allow me to show you the way\". She hands you an ID badge and shows you to the elevator. You quickly scurry in and press floor 2 and tap your ID badge on the security machine on the elevator wall. With a whirring noise the elevator begins to descend...");
	disableButton(availableButtons);
	setTimeout(function(){s5();}, 10000);
}
//Scene 3 Floor 1 Bathroom Scene 
function s3(){
	disableButton(availableButtons);
	if (itemScrewdriver == true){
		writeText("Yep that's what a bathroom looks like, two mirrors, two sinks, a stall, a urinal and even a fancy hand dryer. What did you really think was going to be in here? You already have everything of interest!");
		availableButtons = ["button-leave"];
		disableButton(availableButtons);
		
	}
	else {
		writeText("Yep that's what a bathroom looks like, two mirrors, two sinks, a stall, a urinal and even a fancy hand dryer. What did you really think was going to be in here? As you are about to leave you notice a glint of light coming from a hole underneath the sink. Do you inspect the hole?");
		availableButtons = ["button-inspect", "button-leave"];
		
	}
	enableButton(availableButtons);
	
	document.getElementById("button-inspect").addEventListener("click", function(){writeText("You reach in slowly and much to your surprise you find a phillips-head screwdriver. I guess you may as well keep it, who knows what will happen..."); itemScrewdriver = true; availableButtons = ["button-inspect"]; disableButton(availableButtons);});
	document.getElementById("button-leave").addEventListener("click", function(){availableButtons = ["button-leave", "button-inspect"]; disableButton(availableButtons); s1();}, {once: true});
}
//Scene 4 Floor 1 Staff Room Evaluating what objective the user failed to allow the user to progress
function s4(){
	
	if (s2Fail == true){
		writeText("You spot a janitors outfit and you realise you can blend in and make it past reception without raising any suspicion. You quickly adorn the pale blue outfit and you notice there is an ID badge inside. You then briskly leave the staff room with the ID badge in hand. You then walk past the receptionist to the elevator. You quickly scurry in and press floor 2 and tap your ID badge on the security machine on the elevator wall. With a whirring noise the elevator begins to descend...");
		disableButton(availableButtons);
		janitor = true;
		setTimeout(function(){s5();}, 15000);
	}
	else if (s4Fail == false){
		writeText("You enter the the staff door and luckily no one sees you. There is three different uniforms hanging up on a clothes rack. There is also a vent beside the clothes rack that looks like you could crawl through it... Do you want to look at the clothes rack or the vent?");
		disableButton(availableButtons);
		availableButtons = ["button-rack", "button-vent", "button-lobby"];
		enableButton(availableButtons);
		
		document.getElementById("button-rack").addEventListener("click", function(){s41();});
		document.getElementById("button-vent").addEventListener("click", function(){s42();});
		document.getElementById("button-lobby").addEventListener("click", function(){disableButton(availableButtons); s1();});
	}
	else if (s4Fail == true){
		
		writeText("The clothes rack is no longer any use. However the vent may be of interest...");
		disableButton(availableButtons);
		availableButtons = ["button-vent", "button-lobby"];
		enableButton(availableButtons);
		document.getElementById("button-vent").addEventListener("click", function(){s42();});
		document.getElementById("button-lobby").addEventListener("click", function(){disableButton(availableButtons); s1();});
	}
}
function s41(){
	writeText("You inspect the clothes rack and you see three uniforms hanging up. A janitors uniform, a builders uniform and a doctors uniform. Which uniform do you want to wear?");
	disableButton(availableButtons);
	availableButtons = ["button-janitor", "button-builder", "button-doctor"];
	enableButton(availableButtons);
	
	document.getElementById("button-janitor").addEventListener("click", function(){s2Fail = true; s4();});
	document.getElementById("button-builder").addEventListener("click", function(){s4Fail = true; s43("builders");});
	document.getElementById("button-doctor").addEventListener("click", function(){s4Fail = true; s43("doctors");});
	
}
function s42(){
	if (itemScrewdriver == true){
		writeText("You open the vent with the screwdriver you got from the bathroom and crawl in. It looks like this is an air vent that leads directly to the 2nd floor. You crawl down to the 2nd floor and unscrew the vent and you crawl out into an office.");
		disableButton(availableButtons);
		tvent = true;
		setTimeout(function(){s5();}, 8000);
	}
	else {
		writeText("Looks like this vent could go down to the 2nd floor, however there is nothing you can do to remove it, as it is screwed into the wall. Maybe you could find something that would help you remove the vent.");
		disableButton(availableButtons);
		availableButtons = ["button-lvent"];
		enableButton(availableButtons);
		
		document.getElementById("button-lvent").addEventListener("click", function(){disableButton(availableButtons); s4();});
		
	}	
}
function s43(uniform){
	writeText("Unfortunately it doesn't look like the " + uniform + " outfit will help you get past reception. Maybe if you ask reception or try and find a way to open the vent, you can get to the 2nd floor. However, right now the clothes rack has no more use.");
	disableButton(availableButtons);
	availableButtons = ["button-lobby"];
	enableButton(availableButtons);
	
	document.getElementById("button-lobby").addEventListener("click", function(){disableButton(availableButtons); s1();});
}
//Scene 5 Floor 2 In the office space if come from the vent otherwise be out of the elevator and in the hall
function s5(){
	if (tvent == true){
		writeText("You are currently in the office space, You can either look around the office or go onto the 2nd floor hall.");
		disableButton(availableButtons);
		availableButtons = ["button-office", "button-hall"];
		enableButton(availableButtons);
		
		
		document.getElementById("button-office").addEventListener("click", function(){s54();}, {once: true});
		document.getElementById("button-hall").addEventListener("click", function(){s51();}, {once: true});
		
	}
	else{
		s51();
	}
		
}

function s51() {
	writeText("You are now in the hall of floor 2, you take in your surroundings once again. There is a meeting room in front of you, To your left is some sort of construction project, There is an office to your right and there is no turning back now! Where do you want to go first?");
	disableButton(availableButtons);
	availableButtons = ["button-meeting", "button-construction", "button-office"];
	enableButton(availableButtons);
	
	document.getElementById("button-meeting").addEventListener("click", function(){s52();}, {once: true});
	document.getElementById("button-construction").addEventListener("click", function(){s53();}, {once: true});
	document.getElementById("button-office").addEventListener("click", function(){s54();}, {once: true});
	
}
function s52(){
	if (janitor == true){
		document.getElementById("button-trash").addEventListener("click", function(){s55();});
		document.getElementById("button-KO").addEventListener("click", function(){s57();});
		if (cKO == true){
			writeText("Time to knock him out!");
			disableButton(availableButtons);
			availableButtons = ["button-KO"];
			enableButton(availableButtons);
		}
		else if (aKO == true){
			writeText("You dont need to be in the meeting room any more! Go explore the rest!");
			disableButton(availableButtons);
			availableButtons = ["button-hall"];
			enableButton(availableButtons);
			document.getElementById("button-hall").addEventListener("click", function(){s51();});
			
		}
		else{
			writeText("You walk into the meeting room and you match eyes with a man and your heart starts thumping. \"You aren't meant to be here, play it cool\" You say in your head. The man says \"What are you doing? Please do your job and take out the trash!\" What should you do?");
			disableButton(availableButtons);
			availableButtons = ["button-trash", "button-KO"];
			enableButton(availableButtons);
			document.getElementById("button-trash").addEventListener("click", function(){s55();});
			document.getElementById("button-KO").addEventListener("click", function(){});
		}
	}
	else if (tvent == true){
		document.getElementById("gameText").style.color = "red";
		writeText("YOU GOT THE UNPREPARED ENDING!: \"Hey! You aren't meant to be here! How did you get in!? SECURITY!!\" Screams the man in the meeting room. Looks like you are about to be comfy in jail!");
		disableButton(availableButtons);
	}
	else if(tvent == false && janitor == false){
		writeText("\"Hey you must be the person I am meeting to discuss our new updated security measures, here take this keycard and go to my office and tell me what you think of the secret panel. Well thats if you can find it haha!!\" says the man. You reluctantly take the keycard and make your way back to the hall.");
		disableButton(availableButtons);
		availableButtons = ["button-hall"];
		enableButton(availableButtons);
		keycard = true;
		aKO = true;
		janitor = true;
		document.getElementById("button-hall").addEventListener("click", function(){s51();});
	}
	
}
function s53(){
	writeText("You enter the taped off construction site. As you look around the construction site you see nothing of value. So you take a step forward and almost plummet to your death. Right at your feet is a massive hole going down... It seems this hole might be the quickest way down to the vault. However you aren't a superhero so you can't just jump down. You look around the room for anything that could help. You spot two different items, a long sturdy rope and a set of ice picks. Which one do you choose?");
	disableButton(availableButtons);
	availableButtons = ["button-picks", "button-rope"];
	enableButton(availableButtons);
	
	document.getElementById("button-rope").addEventListener("click", function(){s58();});
	document.getElementById("button-picks").addEventListener("click", function(){s59();});
	
}
function s54(){
	if (keycard == true){
		writeText("As you look around the office, out of the corner of your eye, you spot a suspicious looking book... Pulling he book reveals a keycard lock. Do you want to try and use the keycard you have?");
		disableButton(availableButtons);
		availableButtons = ["button-swipe", "button-hall"];
		enableButton(availableButtons);
		
		document.getElementById("button-swipe").addEventListener("click", function(){writeText("All of a sudden there is a massive creak and then a ....................... CLIFFHANGER!!"); disableButton(availableButtons);});
		document.getElementById("button-hall").addEventListener("click", function(){s51();}, {once: true});
		
	}
	else{
		writeText("You look around the office and see nothing of interest. Maybe if you explored other areas, you might find something that could help you...");
		disableButton(availableButtons);
		availableButtons = ["button-hall"];
		enableButton(availableButtons);
		
		document.getElementById("button-hall").addEventListener("click", function(){s51();}, {once: true});
	}
	
}
function s55(){
	writeText("Really? Like for real? You would rather empty rubbish than have a little action?! C'mon Grey, don't be so boring!! If you really want to take the trash out I can't stop you. What do you want to do?");
	disableButton(availableButtons);
	availableButtons = ["button-ctrash", "button-cKO"];
	enableButton(availableButtons);
	
	document.getElementById("button-ctrash").addEventListener("click", function(){writeText("Fine have this boring ending!"); disableButton(availableButtons); setTimeout(function(){s56();}, 2000);});
	document.getElementById("button-cKO").addEventListener("click", function(){disableButton(availableButtons); writeText("Thats more like it!!! Get him!!"); cKO = true; setTimeout(function(){s52();}, 2000);});
	
	
}
function s56(){
	document.getElementById("gameText").style.color = "red";
	writeText("You got the sarcastic ending...: I mean what did you really expect? How about this? You got a job working for NIS as a janitor. You worked there until you were eighty on minimum wage and then retired to the bahamas. Although that was short lived because after being there for six months you died of a heart attack with no one around to mourn you. There! Thats what you get for taking out the trash. Lets try again shall we?");
	disableButton(availableButtons);
}
function s57(){
	writeText("You strike a blow to the side of the mans' temple, with a loud smack he hits the ground cold. You quickly loot his pockets and find a set of keys that look somewhat like nuclear missile keys, and you also find an access card for level 3-5.");
	disableButton(availableButtons);
	aKO = true;
	cKO = false;
	mKeys = true;
	keycard = true;
	availableButtons = ["button-hall"];
	enableButton(availableButtons);
	document.getElementById("button-hall").addEventListener("click", function(){s51();}, {once: true});
}
function s58(){
	writeText("You grab the long sturdy rope and tie it to a wedge of wood in the middle of the ground. It seems sturdy enough. You procced to slide down the rope...");
	disableButton(availableButtons);
	s60();
}
function s59(){
	writeText("For some reason you decide it is a better idea to grab the ice picks rather than the long sturdy rope. You proceed to clamber down onto the ground. Hanging off the side of the hole, you slam your ice pick into the shiny cobalt stone. You make your way down the hole slamming your ice picks from left to right, left to right. Your body strength doesn't seem to be as good as it used to be. You drop your left ice pick and hear it clatter to the ground. You then lose all upper body strength and plummit towards the bottom of the hole. Crack goes your skull as you hit the bottom. Then your lights go out...");
	disableButton(availableButtons);
}
//Scene 6 Rope Death ending Floor 2/5
function s60(){
	document.getElementById("gameText").style.color = "red";
	writeText("UH OH ENDING: With all your might you slide down the rope and 30 seconds later you arrive at the bottom. However, It's no longer just you on your own. There are five security guards who are guarding the vault and they have just witnessed you sliding down the rope. Without hesitation they all open fire and you succumb to your wounds and die. Maybe if you had the construction outfit you may have been safe...");
}
