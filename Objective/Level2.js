class Level2 extends Objective {
	
	var lucy : GameObject;
	var car : GameObject;
	
	private var lucyVicinity : boolean = false;
	private var lucySaved : boolean = false;
	
	private var lucyHelpVicinity : boolean = false;
	private var lucyHelpShown : boolean = false;
	
	private var timeCreated : float;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "";
		
		findProps();
		if (theDirector.globalState.Contains("lucySaved")) {
			lucySaved = theDirector.globalState["lucySaved"];
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
			
		} else if (msg == "OutTriggerSpace") {
			if (who.worldName == "LucyTrigger") {
				lucyVicinity = false;
			}	
			if (who.worldName == "LucyHelpTrigger") {
				lucyHelpVicinity = false;	
				lucyHelpShown = false;
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
	}
	
	function Update() {
				
		// startup subtitle block
		findProps();
		if (!theDirector.globalState.Contains("outdoorsubtitle")) {
	
			if ((Mathf.Floor(Time.realtimeSinceStartup - timeCreated) == subtitleDelay) && (!subtitlesDone)) {
				subtitlesDone = true;
				theDirector.addSubtitle(new Subtitle("Michael: Oh man. Its raining too?",5,0.5));
				theDirector.addSubtitle(new Subtitle("Michael: What crummy weather to make things worse",5,0.5));
	
				theDirector.globalState.Add("outdoorsubtitle", true);
			}
		}
		
		if ((lucyHelpVicinity) && (!lucyHelpShown) && (!lucySaved)) {		
			lucyHelpShown = true;	
			theDirector.addSubtitle(new Subtitle("Lucy: HHHHHHHEEEEEEEEEELLLLLLPPPPPPPPP!",5,0.5));
			theDirector.addSubtitle(new Subtitle("Lucy: SOMEBODY HELP ME!!!!",5,10));

		}

		// track keypress
		if (Input.GetKeyUp("e") && (lucyVicinity) && (!lucySaved)) {
			if (thePlayer.GetComponent("Backpack").hasItemOfType("RopeItem")) {
				theDirector.load_level("Lucy");
			} else {
				theDirector.addSubtitle(new Subtitle("Micahel: Can't do anything without a rope.",5,0.5));
				theDirector.addSubtitle(new Subtitle("Micahel: The thing's too heavy to lift.",5,10));			
			}
		}
		
	}
	
	function subtitleCallback(msg : String) {
	}
	
}