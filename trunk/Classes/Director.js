class Director extends MonoBehaviour {
	
	var timeLimit : int = 10; // in minutes
	
	private var gameState : int = 0;
	private var water : GameObject;
	private var thePlayer : GameObject;
	
	function Start() {
		this.findProps();
		DontDestroyOnLoad(this);
	}
	
	function Awake() {
		this.findProps();
	}
	
	// script run
	
	function level1() {
		
	}
	
	function level2() {
		
	}
	
	function level3() {
		
	}
	
	function level4() {
		
	}
	
	function level5() {
		
	}
	
	function OnGUI() {
		GUI.Box(new Rect(Screen.width - 10 - 100, 10, 100, 20), remainingTimeString() + " left");
		
	}
	
	function remainingTimeString() {
		var mins = Mathf.Floor(remainingTime() / 60);
		var secs = Mathf.Floor(remainingTime() - (mins * 60));
		
		return mins + "m " + secs + "s";
	}
	
	// functions related to director
	function remainingTime() {
		return (timeLimit * 60) - Time.realtimeSinceStartup;
	}
	
	function findProps() {
		water = GameObject.FindWithTag("Water");
		thePlayer = GameObject.FindWithTag("GameController");
	}
	
}