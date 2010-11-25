class Level2 extends Objective {
	
	var lucy : GameObject;
	var car : GameObject;
	
	private var lucyVicinity : boolean = false;
	private var lucySaved : boolean = false;
	
	private var lucyHelpVicinity : boolean = false;
	private var lucyHelpShown : boolean = false;
	
	private var houseVicinity : boolean = false;
	
	private var exit_attic : boolean = false;
	
	private var safe : boolean = false;
	private var safeNotified : boolean = false;
	private var safeWindow : boolean = false;
	
	private var safeHouse : boolean = false;
	private var safeHouseNotified : boolean = false;
	private var safeHouseWindow : boolean = false;
		
	private var shownAccidentTrigger : boolean = false;
		
	private var timeCreated : float;
	
	private var startFloodingTime : float = -1;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "";
	
		findProps();
		theDirector.setRain(0);	
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
		Debug.Log("Restore state");
		if (theDirector.globalState.Contains("car_pos")) {
			car.transform.position = theDirector.globalState["car_pos"];	
		}

		if (theDirector.globalState.Contains("car_rot")) {
			car.transform.rotation = theDirector.globalState["car_rot"];	
		}

		if (theDirector.globalState.Contains("flood_starttime")) {
			startFloodingTime = theDirector.globalState["flood_starttime"];	
		}

		if (theDirector.globalState.Contains("exit_attic")) {
			exit_attic = theDirector.globalState["exit_attic"];
			if (exit_attic) {
				thePlayer.transform.position = Vector3(792.1302,381.9263,-735.8791);
				
				// -1614.024 41.57388 -558.1433
			}
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
			
			if (who.worldName == "SafeTrigger") {
				if (!safe) {
					safe = true;	
				}	
			}
			
			if (who.worldName == "SafeHouseTrigger") {
				if (!safeHouse) {
					safeHouse = true;	
				}	
			}
			
			if (who.worldName == "Accident1Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident2Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident3Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident4Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident5Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident6Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident7Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident8Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident9Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
			}
			if (who.worldName == "Accident10Trigger") {
				if (!shownAccidentTrigger) {
					theDirector.addSubtitle(new Subtitle("Michael: Crikey! I need to make a detour...", 3, 0.5, this, "shownAccidentTrigger"));
				}	
				theDirector.modifyScore(50);
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
		
		if ((houseVicinity) && (!exit_attic)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to enter house", style);			
		}

/*		
		if ((safe) || (safeHouse)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to end the game", style);
		}
*/		
		if ((safe) && (!safeNotified)) {
			// show safe and lock character
			safeNotified = true;
			theDirector.modifyScore(theDirector.remainingTime());
			theDirector.addSubtitle(new Subtitle("Michael: Ahh, the Red Cross camp...", 5,0.5));
			theDirector.addSubtitle(new Subtitle("Michael: I'm safe...", 5,0.5, this, "safeReached"));
		}
		
		if ((safeHouse) && (!safeHouseNotified)) {
			// show safe house ending
			safeHouseNotified = true;
			theDirector.modifyScore(theDirector.remainingTime());
			theDirector.addSubtitle(new Subtitle("Michael: The water does seem to rise anymore...", 5,0.5));
			theDirector.addSubtitle(new Subtitle("Michael: Guess I'll just wait here till help comes", 5,0.5, this, "safeHouseReached"));
		}
		
		if(safeWindow) {
			GUI.Window (0, new Rect ((Screen.width-300)/2,(Screen.height-150)/2,300,150), DoWindow, "Game Completed");
		}		
		if(safeHouseWindow) {
			GUI.Window (1, new Rect ((Screen.width-300)/2,(Screen.height-150)/2,300,150), DoWindow, "Game Completed");
		}		
	}
	
	function FixedUpdate() {
		if (startFloodingTime > 0) {
			var floodTimeLimit = (theDirector.timeLimit * 60) - (startFloodingTime - theDirector.timeStartCountdown);
			var level = ((1 - ((theDirector.remainingTime()  - startFloodingTime) / floodTimeLimit)) *  (358-23)) + 9;

			if ((theDirector.waterLevel() > 0) && (theDirector.waterLevel() < 358)) {
				theDirector.setWaterLevel(level);
			} else {
				theDirector.setWaterLevel(358);
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
			theDirector.load_level("3storeyhouse");
		}
		
	}
	
	function DoWindow (windowID : int) {
		if (windowID == 0) {
			GUI.Label (new Rect(10, 15, 280, 280), "Congratulations!\n\nYou've made it to the safety of the Red Cross camp.\n\nYour score is " + theDirector.playerScore());
			//player chooses to help
			if(GUI.Button(new Rect(100, 95, 100,25), "Quit Game", "button"))
			{
				Application.LoadLevel("Menu");
			}			
		} else if (windowID == 1) {
			GUI.Label (new Rect(10, 15, 280, 280), "Congratuations!\n\nNot exactly that safe, but getting there. From here, you can wait for help.\n\nYour score is " + theDirector.playerScore());
			//player chooses to help
			if(GUI.Button(new Rect(100, 95, 100,25), "Quit Game", "button"))
			{
				Application.LoadLevel("Menu");
			}				
		}	
	}
	
	function subtitleCallback(msg : String) {
		
		if (msg == "safeReached") {
			thePlayer.GetComponent(Player).died();
			Screen.lockCursor = false;
			safeWindow = true;			
			// show shit
		} else if (msg == "safeHouseReached") {
			thePlayer.GetComponent(Player).died();
			Screen.lockCursor = false;
			safeHouseWindow = true;
			// show shit
			
		} else if (msg == "showAccidentTrigger") {
			showAccidentTrigger = false;	
		}
	}
	
}