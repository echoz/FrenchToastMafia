class Director extends MonoBehaviour {
	
	var timeLimit : int = 10; // in minutes
	var hasState : boolean = false;
	
	private var gameState : int = 0;
	private var water : GameObject;
	private var thePlayer : GameObject;
	private var gameController : GameObject;
	
	private var backpack_items = new Array();
	private var player_health : float;
	
	private var previousLevelName : String;
	
	function Start() {
		this.findProps();
		DontDestroyOnLoad(this);
	}
	
	function Awake() {
		this.findProps();
	}
	
	function saveState() {
		backpack_items = new Array();
		copyArray(gameController.GetComponent(Backpack).items,backpack_items);
		
		player_health = gameController.GetComponent(Player).health;
		
		hasState = true;

	}
	
	function restoreState() {
		gameController.GetComponent(Backpack).items.clear();
		copyArray(backpack_items, gameController.GetComponent(Backpack).items);

		gameController.GetComponent(Player).heath = player_health;
		
		hasState = false;
	}
	
	// state
	function OnLevelWasLoaded (level : int) {
		findProps();
		if ((gameController) && (hasState)) {
			restoreState();	
		}		
	}

	
	function load_level(level : String) {
		saveState();
		previousLevelName = Application.loadedLevelName;
		Application.LoadLevel(level);
	}
	
	function previous_level() {
		Application.LoadLevel(previousLevelName);	
	}
	
	function Update() {
		if (Input.GetKeyUp("p")) {
			saveState();	
		}	
	}
	
	
	function copyArray(arrA, arrB) {
		for (var i=0;i<arrA.length;i++) {
			arrB.Add(arrA[i]);	
		}
	}
	
	// script run
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
		thePlayer = GameObject.FindWithTag("Player");
		gameController = GameObject.FindWithTag("GameController");
	}
	
}