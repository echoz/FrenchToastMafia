class Level0 extends Objective {
	
	private var timeCreated : float;
	
	function Awake() {
		timeCreated = Time.realtimeSinceStartup;
		nextLevel = "InteriorHouse";
	}
	
	function Update() {
		if (((Time.realtimeSinceStartup - timeCreated) >= subtitleDelay) && (!subtitlesDone)) {
			subtitlesDone = true;
			findProps();
			theDirector.addSubtitle(new Subtitle("My name is Michael Weston.",5,2));
			theDirector.addSubtitle(new Subtitle("I was a Ranger in the Marines.",5,2));			
			theDirector.addSubtitle(new Subtitle("The things I've done and the things I've seen...",5,2));			
			theDirector.addSubtitle(new Subtitle("There's no way of forgetting them.",5,3));
			
			theDirector.addSubtitle(new Subtitle("I've retired to the last peaceful place I know.",5,2));
			theDirector.addSubtitle(new Subtitle("A place I call my own by the beach.",5,2));
			theDirector.addSubtitle(new Subtitle("Doing the occasional work.",5,2));
			theDirector.addSubtitle(new Subtitle("Plenty of time at the bar.",5,2));
			theDirector.addSubtitle(new Subtitle("Just living out the rest of my life far from the destruction I've seen.",5,2));
			theDirector.addSubtitle(new Subtitle("Until that day...",5,3));
		}
		if (Input.GetKeyUp("e")) {
			completed = true;
			this.completedLevel();
		}
	}
	
	function canLoadLevel() {
		return completed;	
	}
	
	function OnGUI() {
		var style = new GUIStyle();
		style.alignment = TextAnchor.MiddleCenter;
		style.normal.textColor  = new Color(1,1,1,1);

		if ((Time.realtimeSinceStartup - timeCreated) >= (subtitleDelay + 70)) {
			GUI.Label (new Rect ((Screen.width - 300)/2,(Screen.height-50)/2,300,50), "Press [E] to continue", style);

		}
	}	
}