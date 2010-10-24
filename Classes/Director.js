class Director extends MonoBehaviour {
	
	var timeLimit : int = 20; // in minutes
	var hasState : boolean = false;
	
	var globalState = new Hashtable();
	
	private var gameState : int = 0;
	private var water : GameObject;
	private var thePlayer : GameObject;
	private var gameController : GameObject;
	
	// state
	private var backpack_items = new Array();
	private var backpack_activeItem : int;
	private var backpack_hasActive : boolean;
	private var player_health : float;
	private var player_position : Vector3;
	private var player_rotation : Quaternion;
	
	private var previousLevelName : String;
	
	function Start() {
		this.findProps();
	}
	
	function Awake() {
		DontDestroyOnLoad(this);
	}
	
	function saveState() {
		backpack_items = new Array();
		copyArray(gameController.GetComponent(Backpack).items,backpack_items);
		backpack_activeItem = gameController.GetComponent(Backpack).indexOfItem(gameController.GetComponent(Backpack).activeItem, gameController.GetComponent(Backpack).items);
		backpack_hasActive = gameController.GetComponent(Backpack).hasActiveItem;
		
		player_health = gameController.GetComponent(Player).health;
		
		player_position = gameController.transform.position;
		player_rotation = gameController.transform.rotation;
		
		hasState = true;

	}
	
	function restoreState() {

		gameController.GetComponent(Backpack).items.clear();
		copyArray(backpack_items, gameController.GetComponent(Backpack).items);
		gameController.GetComponent(Backpack).hasActiveItem = backpack_hasActive;
		gameController.GetComponent(Backpack).activeItem = gameController.GetComponent(Backpack).items[backpack_activeItem];
		gameController.GetComponent(Backpack).cullEquippedItems();
		
		gameController.GetComponent(Player).health = player_health;
				
		hasState = false;
	}
	
	// state
	function OnLevelWasLoaded (level : int) {
		findProps();
		if ((gameController) && (hasState)) {
			restoreState();	
		}
		if ((previousLevelName == Application.loadedLevelName) && (gameController)) {
			gameController.transform.position = player_position;
			gameController.transform.rotation = player_rotation;
	
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
			Debug.Log(backpack_items);	
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