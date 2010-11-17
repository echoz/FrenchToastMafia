class Level1 extends Objective {
	
	var fadeInLightsTime : float = 15;
	var lightIntensity : float = 3;
	
	private var fadeInLights : boolean = false;

	private var exitVicinity : boolean = false;
	private var exitAnyway : boolean = false;
	private var timeCreated : float = -1;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;		

		var lights = GameObject.FindGameObjectsWithTag("lights");
		
		for (var lightt : GameObject in lights) {
			lightt.light.intensity = 0;
		}
	}

	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InTriggerSpace") {
			if (who.worldName == "Level1Exit") {
				exitVicinity = true;	
			}	
		} else if (msg == "OutTriggerSpace") {
			if (who.worldName == "Level1Exit") {
				exitVicinity = false;
				exitAnyway = false;
			}	
			
		}
	}
	
	function OnGUI() {
		var style = new GUIStyle();
		style.alignment = TextAnchor.MiddleCenter;
		style.normal.textColor  = new Color(1,1,1,1);

		if ((exitVicinity) && (exitAnyway)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to leave house anyway", style);

		} else if ((exitVicinity) && (!exitAnyway)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to leave house", style);			
		}
	}
	
	function Update() {
				
		// startup subtitle block
		if ((Mathf.Floor(Time.realtimeSinceStartup - timeCreated) == subtitleDelay) && (!subtitlesDone)) {
			subtitlesDone = true;
			findProps();
			theDirector.addSubtitle(new Subtitle("Radio: Bzzzzzzzzz. This is an alert.",5,0.5));
			theDirector.addSubtitle(new Subtitle("Michael: Huh? What was that?.",5,0.5));
		}				
				
				
		// fade in lights;
		if (!fadeInLights) {
			var lights = GameObject.FindGameObjectsWithTag("lights");

			if ((Time.realtimeSinceStartup - timeCreated) <= fadeInLightsTime) {

				for (var lightt : GameObject in lights) {
					lightt.light.intensity = ((Time.realtimeSinceStartup - timeCreated)/fadeInLightsTime) * lightIntensity;
				}
				
			} else {
				for (var lightt : GameObject in lights) {
					lightt.light.intensity = lightIntensity;
				}
				
				fadeInLights = false;
					
			}
		}
		
		
		
		// track time

		
		
		
		// track keypress
		if (Input.GetKeyUp("e") && (exitVicinity)) {
			
			if (!exitAnyway) {
				var msgs = checkBackpack();
				
				theDirector.addSubtitle(new Subtitle("I wonder if I have everything I need...",2));
				if (msgs.length > 0) {
					
					for (var msg in msgs) {
						theDirector.addSubtitle(msg);	
					}
				}
				
				exitAnyway = true;
				
			} else {
				// calculate and update scores first
				theDirector.load_level("errrr");
			}
		}
	}
	
	function checkBackpack() {
		var messages = new Array();
		
		findProps();
		var backpack = thePlayer.GetComponent(Backpack);
		
		// priority items
		if (!backpack.hasItemOfType("RadioItem")) {
			messages.Add(new Subtitle("Man. I would definitely need something that I can use to communicate with people.", 3));
		}
		
		if (!backpack.hasItemOfType("RopeItem")) {
			messages.Add(new Subtitle("I'm not into the SM stuff but you never know when you would need to tie something up with.", 4));	
		}
		
		if (!backpack.hasItemOfType("FlashlightItem")) {
			messages.Add(new Subtitle("Might get dark. Might need light.", 2));	
		}

		if (!backpack.hasItemOfType("GPSItem")) {
			messages.Add(new Subtitle("Where be my maps.",2));	
		}
		
		return messages;
	}

}