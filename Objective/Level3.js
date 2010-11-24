class Level3 extends Objective {
	
	var floodHeight : float = 46;
	
	private var startFloodingTime : float = -1;
	private var atticVicinity : boolean = false;
	private var water : GameObject;
	private var timeCreated : float;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "";
		findProps();
		theDirector.stopRainEffects();	
	
	}


	function didSaveState() {
		findProps();
		
	}
	
	
	function didRestoreState() {
		findProps();
		if (theDirector.globalState.Contains("flood_starttime")) {
			startFloodingTime = theDirector.globalState["flood_starttime"];	
		}
		
	}	

	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InTriggerSpace") {
			if (who.worldName == "AtticTrigger") {
				atticVicinity = true;	
			}
			
			
			
		} else if (msg == "OutTriggerSpace") {
			if (who.worldName == "AtticTrigger") {
				atticVicinity = false;	
			}
			
		}
	}
	
	function OnGUI() {
		var style = new GUIStyle();
		style.alignment = TextAnchor.MiddleCenter;
		style.normal.textColor  = new Color(1,1,1,1);
		
		if (atticVicinity) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to exit attic", style);			
		}
	}
	
	function FixedUpdate() {
		if (startFloodingTime > 0) {
			var floodTimeLimit : float = (theDirector.timeLimit * 60) - (startFloodingTime - theDirector.timeStartCountdown);
			var timeToStartFlood : float = (floodHeight / (358 - 23)) * floodTimeLimit;
			

			if ((theDirector.remainingTime() < timeToStartFlood) && (water.transform.position.y < floodHeight)) {
				water.transform.position.y = (1 - (theDirector.remainingTime() / timeToStartFlood)) * floodHeight;
			}

		}
	}
	
	
	function Update() {
				
		// startup subtitle block
		findProps();
	
		if ((Mathf.Floor(Time.realtimeSinceStartup - timeCreated) == subtitleDelay) && (!subtitlesDone)) {
			subtitlesDone = true;
			theDirector.addSubtitle(new Subtitle("Michael: I gotta get to the top floor before the whole house gets flooded",5,0.5));
			theDirector.addSubtitle(new Subtitle("Michael: Might be able to signal for help there",5));

		}
		if (Input.GetKeyUp("e") && (atticVicinity)) {
			theDirector.globalState.Remove("exit_attic");
			theDirector.globalState.Add("exit_attic", true);
			theDirector.previous_level();
		}
		
	}
	
	function findProps() {
		super.findProps();
		
		water = GameObject.FindWithTag("WaterLevel");	
	}
	
}