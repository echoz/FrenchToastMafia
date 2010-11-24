class Level1 extends Objective {
	
	var fadeInLightsTime : float = 15;
	var lightIntensity : float = 3;
	
	private var fadeInLights : boolean = false;

	private var exitVicinity : boolean = false;
	private var exitAnyway : boolean = false;
	private var timeCreated : float = -1;
	
	private var macbookVicinity : boolean = false;
	private var macbookDone : boolean = false;
	private var showTimeRemain : boolean = false;
	
	function Awake() {
		subtitleDelay = 0;
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "errrr";

		var lights = GameObject.FindGameObjectsWithTag("lights");
		
		for (var lightt : GameObject in lights) {
			lightt.light.intensity = 0;
		}
		
		findProps();
		theDirector.setRain(0.8);
		
	}

	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InTriggerSpace") {
			if (who.worldName == "Level1Exit") {
				exitVicinity = true;	
			}
			
			if (who.worldName == "MacbookTrigger") {
				macbookVicinity = true;
			}
			
		} else if (msg == "OutTriggerSpace") {
			if (who.worldName == "Level1Exit") {
				exitVicinity = false;
				exitAnyway = false;
			}	

			if (who.worldName == "MacbookTrigger") {
				macbookVicinity = false;
			}

			
		}
	}
	
	function OnGUI() {
		var style = new GUIStyle();
		style.alignment = TextAnchor.MiddleCenter;
		style.normal.textColor  = new Color(1,1,1,1);

		if ((exitVicinity) && (exitAnyway) && (macbookDone) && (showTimeRemain)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to leave house anyway", style);

		} else if ((exitVicinity) && (!exitAnyway) && (macbookDone) && (showTimeRemain)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to leave house", style);			
		}
		
		
		if ((macbookVicinity) && (!macbookDone)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to calculate time remaining till tsunami hits", style);			
		}
	}
	
	function Update() {
				
		// startup subtitle block
		if ((Mathf.Floor(Time.realtimeSinceStartup - timeCreated) == subtitleDelay) && (!subtitlesDone)) {
			subtitlesDone = true;
			findProps();
			theDirector.addSubtitle(new Subtitle("Radio: Bzzzzzzzzzz? This is an emergency boardcast from the Pacific DART station.",5,0.5));
			theDirector.addSubtitle(new Subtitle("Michael: What a way to be woken up from a hangover...",5,0.5));
			theDirector.addSubtitle(new Subtitle("Radio: An underwater volcanic eruption has been detected 200km off the coast, 7 on the Ricter scale.",5,0.5));
			theDirector.addSubtitle(new Subtitle("Radio: Authorities have issued an immediate evacuation notice to all citizens.",5));
			theDirector.addSubtitle(new Subtitle("Michael: That's not a good thing. I better find out how much time I have left.",5,0.5));
			theDirector.addSubtitle(new Subtitle("Radio: Citizens can call the Pacific DART center at 800-983-343 for more information.",5,0.5));
			theDirector.addSubtitle(new Subtitle("Radio: Or tune their radios to 12.50Hz.",5,0.5));
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
		if (Input.GetKeyUp("e") && (exitVicinity) && (macbookDone) && (showTimeRemain)) {
			
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
		
		if ((Input.GetKeyUp("e")) && (macbookVicinity) && (!macbookDone)) {
			theDirector.addSubtitle(new Subtitle("Michael: Okay. Let's see.",3, 0.5));			
			theDirector.addSubtitle(new Subtitle("Michael: The velocity of the compression wave in open (deep) water is about 700km/h.", 5, 0.5));			
			theDirector.addSubtitle(new Subtitle("Michael: Dividing the distance from the epicenter to the coast by the speed should get me the time remaining.", 5, 0.5));			

			theDirector.addSubtitle(new Subtitle("Michael: That's about 17 minutes.", 5, 0.5, this, "timeRemain"));
			theDirector.addSubtitle(new Subtitle("Michael: I better find a way to higher ground.", 5, 0.5));
			theDirector.addSubtitle(new Subtitle("Michael: I better find a way to higher ground.", 5, 0.5));
			macbookDone = true;
		}
	}
	
	function subtitleCallback(msg : String) {
		if (msg == "timeRemain") {
			theDirector.startCountdown();
			showTimeRemain = true;
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