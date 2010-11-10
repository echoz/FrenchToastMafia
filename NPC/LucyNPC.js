class LucyNPC extends NPC {
	// public stuff
	var tree : GameObject;

	// lucy
	private var play : String = "Take 001";
	private var isLifted : boolean = false;
	private var accept : boolean = false;
	private var timeup : boolean = false;
	private var retryShow : boolean = false;
	private var reject : boolean = false;
	private var show : boolean = true;
	
	// guage bar
	private var gaugeBar : int = 0;
	var maxGaugeBar : int = 500;
	private var startTime;
	private var restSeconds : int;
	private var roundedRestSeconds : int;
	private var displaySeconds : int;
	private var startTimer : boolean = false;
 	var countDownSeconds : int = 10;
 	var TextStyleTimer = new GUIStyle();
	var TextStyleInstruction = new GUIStyle();
	
	private var playedTreeAnimationTime : float = -1.0;
	private var playedSitupAnimationTime : float = -1.0;
		
	//print all the GUI of the whole interaction with player and lucy
	function OnGUI() {
		//get canter coordinate
		var width : int = Screen.width/2;
		var height : int = Screen.height/2;
		//When player reach the scene
		if(show)
		{
			GUI.Window (0, new Rect (width-150,height,300,150), DoWindow, "Lucy");
		}
		//player chooses to leave lucy alone
		if(reject)
		{
			GUI.Window (1, new Rect (width-150,height,300,150), DoWindow, "Lucy");
		}
		//successfully lift the tree
		if(isLifted)
		{
			GUI.Window (2, new Rect (width-150,height,300,150), DoWindow, "Lucy");
		}
		//Agree to help but could not lift the tree in time
		if(retryShow)
		{
			GUI.Window (3, new Rect (width-150,height,300,150), DoWindow, "System");
		}
		
		//only show the bar when player agreed to help Lucy
		if(accept && !isLifted)
		{
			//Draw the empty bar
			GUI.Box(new Rect(Screen.width/2 - maxGaugeBar/2, 15, maxGaugeBar, 20),"");
			var guiTime = Time.realtimeSinceStartup - startTime;
			
			//update the bar when "E" is press when the time is ticking
			if (gaugeBar < maxGaugeBar && gaugeBar > 0 && !timeup)
			{
				GUI.Box(new Rect(Screen.width/2 - maxGaugeBar/2, 15, gaugeBar, 20),"");
			}
			//To prevent the bar from overshooting also indicate that the tree is lifted in time
			else if( gaugeBar >= maxGaugeBar && !timeup)
			{
				isLifted = true;
				startTimer = false;				
				GUI.Box(new Rect(Screen.width/2 - maxGaugeBar/2, 15, maxGaugeBar, 20),"");
				if ((playedTreeAnimationTime < 0) || (playedTreeAnimationTime > Time.realtimeSinceStartup)) {
					playedTreeAnimationTime = Time.realtimeSinceStartup;
					tree.animation["flyaway"].wrapMode = WrapMode.Once;
					tree.animation.Play("flyaway");

				}
				//this is a cheat(i think) to stop the animation from looping
				//Destroy(tree);
			}
			//get the correct time
			//count down
			restSeconds = countDownSeconds - (guiTime);
			//Time Up!
			if(restSeconds == 0 && startTimer) 
			{
				retryShow = true;
				timeup = true;
			}
			//Time is still ticking~
			if(restSeconds > 0 && startTimer)
			{
				//display the timer
				roundedRestSeconds = Mathf.CeilToInt(restSeconds);
				displaySeconds = roundedRestSeconds % 60; 
				text = String.Format ("{00} sec left", displaySeconds);
				//display the countdown			
				GUI.Box (Rect (Screen.width/2-50, 50, 100, 30), text, TextStyleTimer );
				//display instruction to lift the tree
				GUI.Label (Rect (Screen.width/2-100, 80, 200, 30), "Press [E] to fill the gauge!!",TextStyleInstruction);
			}
		}		
	}
	
	//to display each text according to the choices
	function DoWindow (windowID : int) 
	{
		//starting dialouge
		if(windowID == 0)
		{
			GUI.Label (new Rect(10, 15, 280, 280), "Hey! Help me!!! I'm stuck under this tree!! Please SAVE me!!!!! I don't want to die!!!");
			//player chooses to help
			if(GUI.Button(new Rect(40, 95, 100,40), "Help", "button"))
			{
				startTime = Time.realtimeSinceStartup;
				accept = true;
				startTimer = true;
				show = false;
			}
			//player chooes not to help, trigger to display next dialouge according to this answer
			if(GUI.Button(new Rect(160, 95, 100,40), "Don't Help", "button"))
			{
				reject = true;
				show = false;
			}
		}
		//Dialouge when player choose not to help
		if(windowID == 1)
		{
			//Get scolding for heartless act.
			GUI.Label (new Rect(10, 15, 280, 280), "Fuck You! You COLD HEARTED BASTARD. GO TO HELL!");
			if(GUI.Button(new Rect(100, 95, 100,25), "Whatever...", "button"))
			{
				//player will leave the scene and score will be deducted.
			}
		}
		//Dialouge when player successfully lifted the tree
		if(windowID == 2)
		{
			GUI.Label (new Rect(10, 15, 280, 280), "Thank you beri much!");
			if(GUI.Button(new Rect(100, 95, 100,25), "Your Welcome!", "button"))
			{
			//player will leave scene and score will be updated
			}
		}
		//Dialouge if player agreed to help but could not lift the tree in the time limited
		if(windowID == 3)
		{
			GUI.Label (new Rect(10, 15, 280, 250), "You didn't manage to lift the tree, do you want to try again?");
			//player chooses to restart and all will be resetted
			if(GUI.Button(new Rect(40, 95, 100,40), "Yes", "button"))
			{
				gaugeBar = 0;
				startTime = Time.realtimeSinceStartup;
				timeup = false;
				retryShow = false;
				Debug.Log(retryShow);
			}
			//player chooses to giveup and jump to the same dialouge to get scolding
			if(GUI.Button(new Rect(160, 95, 100,40), "No", "button"))
			{
				reject = true;
				retryShow = false;
			}
		}
	}	
	
	function Update() {
		if(!isLifted){
			animation.Play(play);
			animation.Stop("Seatup");
		}
		if(isLifted)
		{	
			if ((playedSitupAnimationTime < 0) || (playedSitupAnimationTime > Time.realtimeSinceStartup)) {	
				playedSitupAnimationTime = Time.realtimeSinceStartup;	
				animation.Stop(play);
				animation.Play("Seatup");
			}
		}
		
		//increase the gauge bar
		if( Input.GetKeyUp( "e" ) && !timeup && accept && !isLifted)
		{
			gaugeBar = gaugeBar + 30;
			tree.animation.Play("shake");
		}
		//decrease the gaugebar gradually to make it abit harder
		if(gaugeBar < maxGaugeBar && gaugeBar > 0 && !timeup && accept)
		{
			gaugeBar = gaugeBar - 1;
		}
	
	}
}