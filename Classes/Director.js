class Director extends MonoBehaviour {
	
	var timeLimit : int = 20; // in minutes
	var hasState : boolean = false;
	
	var subtitleStyle = new GUIStyle();
	
	static var globalState = new Hashtable();
	
	private var gameState : int = 0;
	private var water : GameObject;
	private var thePlayer : GameObject;
	private var gameController : GameObject;
	
	private var score : int;
	private var subtitles = new Array();
	private var lastShownSubtitleTime : float;
	
	// state
	private var backpack_items = new Array();
	private var backpack_activeItem : int;
	private var backpack_hasActive : boolean;
	private var player_health : float;
	private var player_position : Vector3;
	private var player_rotation : Quaternion;
	
	private var previousLevelName : String;
	
	private var loadLevelTimeStamp : float;
	private var timeSpentLoading: float = 0;
	
	public var timeCreated : float;
	
	function Start() {
		this.findProps();
		Screen.lockCursor = true;
	}
	
	function Awake() {
		this.timeCreated = Time.realtimeSinceStartup;
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
		gameController.GetComponent(Backpack).wakeItems();
		
		gameController.GetComponent(Player).health = player_health;
				
		hasState = false;
	}
	
	// state
	function OnLevelWasLoaded (level : int) {
		findProps();
		cullClones();
		if ((gameController) && (hasState)) {
			restoreState();	
		}
		if ((previousLevelName == Application.loadedLevelName) && (gameController)) {
			gameController.transform.position = player_position;
			gameController.transform.rotation = player_rotation;
	
		}
		if ((Time.realtimeSinceStartup - loadLevelTimeStamp) > 0) {
			timeSpentLoading += Time.realtimeSinceStartup - loadLevelTimeStamp;
		}
		if (level == 2) {
			Screen.lockCursor = false;	
		} else {
			Screen.lockCursor = true;
		}
	}
	
	function cullClones() {
		var directors = GameObject.FindGameObjectsWithTag("god");
		if (directors.length > 1) {
			var realDirector : GameObject = directors[0];

			for (var d : GameObject in directors) {
				Debug.Log(d.GetComponent(Director).timeCreated);
				Debug.Log(realDirector.GetComponent(Director).timeCreated);				
				if (d.GetComponent(Director).timeCreated < realDirector.GetComponent(Director).timeCreated) {
					realDirector = d;	
				}
			}
			
			for (var d : GameObject in directors) {
				if (d !== realDirector) {
					Destroy(d);	
				}	
			}
			
		}
	}
	
	function load_level(level : String) {
		saveState();
		previousLevelName = Application.loadedLevelName;
		loadLevelTimeStamp = Time.realtimeSinceStartup;
		Application.LoadLevel(level);
	}
	
	function previous_level() {
		loadLevelTimeStamp = Time.realtimeSinceStartup;
		Application.LoadLevel(previousLevelName);

	}
	
	function Update() {
		if (Input.GetKeyUp("p")) {
			Debug.Log(backpack_items);
			Debug.Log(globalState);
		}	
	}
	
	
	function copyArray(arrA, arrB) {
		for (var i=0;i<arrA.length;i++) {
			arrB.Add(arrA[i]);	
		}
	}
	
	// script run
	function addSubtitle(subtitle : Subtitle) {
		
		subtitles.Add(subtitle);
		if (lastShownSubtitleTime == 0) {
			lastShownSubtitleTime = Time.realtimeSinceStartup;	
		}
	}
	
	function OnGUI() {
		var subtitleLeftPadding : float = 100.0;
		var subtitleRightPadding: float = 100.0;
		var subtitleHeight : float = 100.0;
		
		// time remaining
		GUI.Box(new Rect(Screen.width - 10 - 202, 10, 202, 20), remainingTimeString() + " until full flood");
		
		// subtitle system
		if (subtitles.length > 0) {
			if ((Time.realtimeSinceStartup - lastShownSubtitleTime) <= subtitles[0].displayTime) {
				GUI.Label(new Rect(subtitleLeftPadding, (Screen.height + subtitleHeight)/2, Screen.width - subtitleLeftPadding - subtitleRightPadding ,subtitleHeight), subtitles[0].content, subtitleStyle);
			} else {
				subtitles.RemoveAt(0);
				lastShownSubtitleTime = Time.realtimeSinceStartup;	
				if (subtitles.length == 0) {
					lastShownSubtitleTime = 0.0;	
				}
			}
		}
		
	}
	
	function remainingTimeString() {
		var mins = Mathf.Floor(remainingTime() / 60);
		var secs = Mathf.Floor(remainingTime() - (mins * 60));
		
		return mins + "m " + secs + "s";
	}
	
	// functions related to director
	function remainingTime() {
		return (timeLimit * 60) + timeSpentLoading - Time.realtimeSinceStartup;
	}
	
	function findProps() {
		water = GameObject.FindWithTag("Water");
		thePlayer = GameObject.FindWithTag("Player");
		gameController = GameObject.FindWithTag("GameController");
	}
	
}