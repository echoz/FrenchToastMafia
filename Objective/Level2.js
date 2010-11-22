class Level2 extends Objective {
	
	private var lucyVicinity : boolean = false;
	private var lucySaved : boolean = false;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "";

	}

	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InTriggerSpace") {
			if (who.worldName == "LucyTrigger") {
				lucyVicinity = true;	
			}
			
		} else if (msg == "OutTriggerSpace") {
			if (who.worldName == "LucyTrigger") {
				lucyVicinity = false;
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
		if ((Mathf.Floor(Time.realtimeSinceStartup - timeCreated) == subtitleDelay) && (!subtitlesDone)) {
			subtitlesDone = true;
			findProps();
			theDirector.addSubtitle(new Subtitle("Michael: Oh man. Its raining too?",5,0.5));
			theDirector.addSubtitle(new Subtitle("Michael: What crummy weather to make things worse",5,10));
			theDirector.addSubtitle(new Subtitle("Lucy: HELLLLLPPPPPPPPPPPPPPPP!!!!!!!!!!",5,0.5));
			theDirector.addSubtitle(new Subtitle("Lucy: SOMEBODY HELP ME!",5,0.5));

		}				

		// track keypress
		if (Input.GetKeyUp("e") && (lucyVicinity) && (!lucySaved)) {
			
		}
		
	}
	
	function subtitleCallback(msg : String) {
	}
	
}