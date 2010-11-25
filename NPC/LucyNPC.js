class LucyNPC extends NPC {
	// public stuff
	var tree : GameObject;
	var incrementDelta : float = 50;

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
	var TextStyleInstruction = new GUIStyle();
	
	private var playedTreeAnimationTime : float = -1.0;
	private var playedSitupAnimationTime : float = -1.0;
	
	function Awake() {
		Screen.lockCursor = false;	
	}
	
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
			var director = GameObject.FindWithTag("god").GetComponent(Director);
			director.globalState.Remove("lucySaved");
			director.previous_level();
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
			var guiTime = Time.realtimeSinceStartup - startTime;
			
			//update the bar when "E" is press when the time is ticking
			if (gaugeBar < maxGaugeBar && gaugeBar > 0 && !timeup)
			{
				GUI.Box(new Rect(Screen.width/2 - maxGaugeBar/2, (Screen.height/2) + 50, gaugeBar, 20),"");
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
				remainTimeText = String.Format ("{00} sec left", displaySeconds);
				//display the countdown			
//				GUI.Box (Rect (Screen.width/2-50, 50, 100, 30), text, TextStyleTimer );
				GUI.Box(new Rect(Screen.width/2 - maxGaugeBar/2, (Screen.height/2) + 50, maxGaugeBar, 20), remainTimeText);
				
				//display instruction to lift the tree
				GUI.Label (Rect (Screen.width/2 - maxGaugeBar/2, (Screen.height/2) + 90, maxGaugeBar, 20), "Press [E] to lift the log",TextStyleInstruction);
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

		//Dialouge when player successfully lifted the tree
		if(windowID == 2)
		{
			GUI.Label (new Rect(10, 15, 280, 280), "Thank you so much!");
			if(GUI.Button(new Rect(100, 95, 100,25), "Your Welcome!", "button"))
			{
			//player will leave scene and score will be updated
			
				var director = GameObject.FindWithTag("god").GetComponent(Director);
				director.modifyScore(100);
				director.globalState.Remove("lucySaved");
				director.globalState.Add("lucySaved", true);
				director.previous_level();
			
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
			gaugeBar = gaugeBar + incrementDelta;
			tree.animation.Play("shake");
		}
		//decrease the gaugebar gradually to make it abit harder
		if(gaugeBar < maxGaugeBar && gaugeBar > 0 && !timeup && accept)
		{
			gaugeBar = gaugeBar - 1;
		}
	
	}
}