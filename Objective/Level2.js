class Level2 extends Objective {
	
	var lucy : GameObject;
	var car : GameObject;
	
	private var lucyVicinity : boolean = false;
	private var lucySaved : boolean = false;
	
	private var lucyHelpVicinity : boolean = false;
	private var lucyHelpShown : boolean = false;
	
	private var houseVicinity : boolean = false;
	
	private var timeCreated : float;
	
	private var startFloodingTime : float = -1;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "";
		
	}


	function didSaveState() {
		findProps();
		
		theDirector.globalState.Remove("car_pos");
		theDirector.globalState.Remove("car_rot");
		theDirector.globalState.Remove("flood_starttime");
		
		theDirector.globalState.Add("car_pos", car.transform.position);
		theDirector.globalState.Add("car_rot", car.transform.rotation);
		theDirector.globalState.Add("flood_starttime", startFloodingTime);
		
	}
	
	
	function didRestoreState() {
		findProps();
		if (theDirector.globalState.Contains("car_pos")) {
			car.transform.position = theDirector.globalState["car_pos"];	
		}

		if (theDirector.globalState.Contains("car_rot")) {
			car.transform.rotation = theDirector.globalState["car_rot"];	
		}

		if (theDirector.globalState.Contains("startFloodingTime")) {
			startFloodingTime = theDirector.globalState["flood_starttime"];	
		}

		
		if (theDirector.globalState.Contains("lucySaved")) {
			lucySaved = theDirector.globalState["lucySaved"];
		} else {
			lucySaved = false;	
		}
		if (lucySaved) {
			Destroy(lucy);	
		}
		
	}	

	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InTriggerSpace") {
			if (who.worldName == "LucyTrigger") {
				lucyVicinity = true;	
			}
			
			if (who.worldName == "LucyHelpTrigger") {
				lucyHelpVicinity = true;	
			}
			
			if (who.worldName == "StartFloodTrigger") {
				if (startFloodingTime < 0) {
					Debug.Log("START FLOODING");
					startFloodingTime = Time.realtimeSinceStartup;	
				}	
			}
			if (who.worldName == "AbandonedHouseTrigger") {
				houseVicinity = true;	
			}
			
			
			
		} else if (msg == "OutTriggerSpace") {
			if (who.worldName == "LucyTrigger") {
				lucyVicinity = false;
			}	
			if (who.worldName == "LucyHelpTrigger") {
				lucyHelpVicinity = false;	
				lucyHelpShown = false;
			}
			if (who.worldName == "AbandonedHouseTrigger") {
				houseVicinity = false;	
			}
			
		}
	}
	
	function OnGUI() {
		var style = new GUIStyle();
		style.alignment = TextAnchor.MiddleCenter;
		style.normal.textColor  = new Color(1,1,1,1);

		
		if ((lucyVicinity) && (!lucySaved)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to try and save lucy", style);			
		}
		
		if (houseVicinity) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to enter house", style);			
		}
	}
	
	function FixedUpdate() {
		if (startFloodingTime > 0) {
			if ((theDirector.waterLevel() > 0) && (theDirector.waterLevel() < 358)) {
				var floodTimeLimit = (theDirector.timeLimit * 60) - (startFloodingTime - theDirector.timeStartCountdown);
				theDirector.setWaterLevel(((1 - ((theDirector.remainingTime()  - startFloodingTime) / floodTimeLimit)) *  (358-23)) + 20);
			}
		}
	}
	
	
	function Update() {
				
		// startup subtitle block
		findProps();
		if (!theDirector.globalState.Contains("outdoorsubtitle")) {
	
			if ((Mathf.Floor(Time.realtimeSinceStartup - timeCreated) == subtitleDelay) && (!subtitlesDone)) {
				subtitlesDone = true;
				theDirector.addSubtitle(new Subtitle("Michael: Oh man. Its raining too?",3,0.5));
				theDirector.addSubtitle(new Subtitle("Michael: What crummy weather to make things worse",5,0.5));
				theDirector.addSubtitle(new Subtitle("Michael: I think I better radio for some directions",5));
	
				theDirector.globalState.Add("outdoorsubtitle", true);
			}
		}
		
		if ((lucyHelpVicinity) && (!lucyHelpShown) && (!lucySaved)) {		
			lucyHelpShown = true;	
			theDirector.addSubtitle(new Subtitle("Lucy: HHHHHHHEEEEEEEEEELLLLLLPPPPPPPPP!",5,0.5));
			theDirector.addSubtitle(new Subtitle("Lucy: SOMEBODY HELP ME!!!!",5,0.5));

		}

		// track keypress
		if (Input.GetKeyUp("e") && (lucyVicinity) && (!lucySaved)) {
			if (thePlayer.GetComponent("Backpack").hasItemOfType("RopeItem")) {
				theDirector.load_level("Lucy");
			} else {
				theDirector.addSubtitle(new Subtitle("Micahel: Can't do anything without a rope.",4,0.5));
				theDirector.addSubtitle(new Subtitle("Micahel: The thing's too heavy to lift.",4,0.5));			
			}
		}
		
		if (Input.GetKeyUp("e") && (houseVicinity)) {
			theDirector.load_level("");
		}
		
	}
	
	function subtitleCallback(msg : String) {
	}
	
}