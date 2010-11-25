class Director extends MonoBehaviour {
	
	var timeLimit : int = 17; // in minutes
	var developer : boolean = false;
	
	var subtitleStyle = new GUIStyle();
	
	static var globalState = new Hashtable();
	
	private var gameState : int = 0;
	private var water : GameObject;
	private var thePlayer : GameObject;
	private var gameController : GameObject;
	
	private static var score : int;
	private var subtitles = new Array();
	private var lastShownSubtitleTime : float;
	private var subtitlePostDelay : float;
	private var subtitleCallFunction : boolean = false;
	
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
	
	private static var hasState : boolean = false;
	
	private var modifier : float = 0;
	var timeStartCountdown : float = -1;
	
	function Start() {
		this.findProps();
		Screen.lockCursor = true;
	}
	
	function Awake() {
		this.timeCreated = Time.realtimeSinceStartup;
		DontDestroyOnLoad(this);
	}
	
	function infanticide() {
		globalState.Clear();
		player_positon = null;
		player_rotation = Quaternion.identity;
		player_health = 0.0;
		loadLevelTimeStamp = 0;
		timeCreated = 0;
		hasState = false;
		backpack_items.Clear();
		backpack_activeItem = 0;
		backpack_hasActive = false;
	}
	
	function saveState() {

		findProps();

		var objective;

		if (GameObject.FindWithTag("objective")) {
			objective = GameObject.FindWithTag("objective").GetComponent(Objective);
		}
		
		objective.willSaveState();
		
		if (gameController) {
			hasState = true;
			
			backpack_items = new Array();
			if (gameController.GetComponent(Backpack).items.length > 0) {
				copyArray(gameController.GetComponent(Backpack).items,backpack_items);
				backpack_activeItem = gameController.GetComponent(Backpack).indexOfItem(gameController.GetComponent(Backpack).activeItem, gameController.GetComponent(Backpack).items);
				backpack_hasActive = gameController.GetComponent(Backpack).hasActiveItem;
			}

			player_health = gameController.GetComponent(Player).health;
			player_position = gameController.transform.position;
			player_rotation = gameController.transform.rotation;
		}
		
		objective.didSaveState();		
	}
	
	function restoreState() {
		Debug.Log("DIRECTOR: Sending Restore state msg");
		
		var objective;

		if (GameObject.FindWithTag("objective")) {
			objective = GameObject.FindWithTag("objective").GetComponent(Objective);
			Debug.Log("Objective exists!");
		}
		
		if (objective)
			objective.willRestoreState();
		
		if (gameController) {		
			if (backpack_items.length > 0) {
		
				gameController.GetComponent(Backpack).items.clear();
				copyArray(backpack_items, gameController.GetComponent(Backpack).items);
				backpack_items = new Array();
				gameController.GetComponent(Backpack).hasActiveItem = backpack_hasActive;
				gameController.GetComponent(Backpack).activeItem = gameController.GetComponent(Backpack).items[backpack_activeItem];
				gameController.GetComponent(Backpack).cullEquippedItems();
				gameController.GetComponent(Backpack).wakeItems();
			}
			
			gameController.GetComponent(Player).health = player_health;
					
			hasState = false;
		}
		if (objective)
			objective.didRestoreState();
			
	}
	
	// state
	function OnLevelWasLoaded (level : int) {
		findProps();
		cullClones();
	
		if ((previousLevelName == Application.loadedLevelName) && (gameController)) {
			gameController.transform.position = player_position;
			gameController.transform.rotation = player_rotation;
	
		}
		
		Debug.Log(gameController + ":" + hasState);
		
		if ((gameController) && (hasState)) {
			restoreState();	
		}

		if ((Time.realtimeSinceStartup - loadLevelTimeStamp) > 0) {
			timeSpentLoading += Time.realtimeSinceStartup - loadLevelTimeStamp;
		}

		Screen.lockCursor = true;
	}
	
	function cullClones() {
		var directors = GameObject.FindGameObjectsWithTag("god");
		if (directors.length > 1) {
			var realDirector : GameObject = directors[0];

			for (var d : GameObject in directors) {
				if (d.GetComponent(Director).timeCreated < realDirector.GetComponent(Director).timeCreated) {
					realDirector = d;	
				}
			}
			
			for (var d : GameObject in directors) {
				if (d !== realDirector) {
					Debug.Log("killed!");
					Destroy(d);	
				}	
			}
			
		}
	}
	
	function load_level(level : String) {
		saveState();
		subtitles.Clear();
		previousLevelName = Application.loadedLevelName;
		loadLevelTimeStamp = Time.realtimeSinceStartup;
		Application.LoadLevel(level);
	}
	
	function load_level(objective : Objective, level : String) {
		if (objective.canLoadLevel()) {
			this.load_level(level);
		}
	}
	
	function previous_level() {
		loadLevelTimeStamp = Time.realtimeSinceStartup;
		Application.LoadLevel(previousLevelName);

	}
	
	function modifyScore(scoreDelta : float) {
		score += scoreDelta;
	}
	
	function playerScore() {
		return score;	
	}
	
	function Update() {
		if (developer) {
			if (Input.GetKeyUp("p")) {
				Debug.Log(backpack_items);
			}				
			if (Input.GetKeyUp("1")) {
				modifier+=10;	
			}
		}
		
		if (Input.GetKeyUp("`")) {
			this.nextSubtitle();	
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
	
	function nextSubtitle() {
		if (subtitles.length > 0) {
			subtitleCallFunction = false;			
			subtitles.RemoveAt(0);
			lastShownSubtitleTime = Time.realtimeSinceStartup;	
			
			if (subtitles.length == 0) {
				lastShownSubtitleTime = 0.0;	
			}								
		}

	}
	
	function OnGUI() {
		var subtitleLeftPadding : float = 100.0;
		var subtitleRightPadding: float = 100.0;
		var subtitleHeight : float = 100.0;
		
				
		if (developer) {
//			var water : GameObject = GameObject.FindWithTag("Water");
//			if ((thePlayer) && (water))
//				GUI.Box(new Rect(500,200,400,100), "Player Pos: " + thePlayer.transform.position.x + "," + thePlayer.transform.position.y + "," + thePlayer.transform.position.z + "\nWater Level: " + water.transform.position.y);
		}
		
		// time remaining
		if (timeStartCountdown > 0) {
			GUI.Box(new Rect(Screen.width - 10 - 202, 10, 202, 20), remainingTimeString() + " until Tsunami");
		}
		
		// subtitle system
		if (subtitles.length > 0) {
			if ((Time.realtimeSinceStartup - lastShownSubtitleTime) <= subtitles[0].displayTime) {
				GUI.Label(new Rect(subtitleLeftPadding, (Screen.height + subtitleHeight)/2, Screen.width - subtitleLeftPadding - subtitleRightPadding ,subtitleHeight), subtitles[0].content, subtitleStyle);

				if (!subtitleCallFunction) {
					if (subtitles[0].callbackDelegate) {
						subtitles[0].callbackDelegate.subtitleCallback(subtitles[0].callbackMessage);
					}
					subtitleCallFunction = true;	
				}
			} else {
				if ((Time.realtimeSinceStartup - lastShownSubtitleTime) <= (subtitles[0].displayTime + subtitles[0].postDelay)) {
					// do post delay stuff
					
				} else {
					this.nextSubtitle();
				}
			}
		}
		
	}
	
	function startCountdown() {
		if (timeStartCountdown < 0) {
			timeStartCountdown = Time.realtimeSinceStartup;	
		}	
	}
	
	function remainingTimeString() {
		if (timeStartCountdown > 0) {
		
			if (remainingTime() >=0) {
				var mins = Mathf.Floor(remainingTime() / 60);
				var secs = Mathf.Floor(remainingTime() - (mins * 60));
			
				return mins + "m " + secs + "s";
			} else {
				return "0m 0s";	
			}
		} else {
			return "Countdown not started";	
		}
	}
	
	// functions related to director
	function remainingTime() {
		if (timeStartCountdown > 0) {
			return ((timeLimit * 60) + timeSpentLoading - (Time.realtimeSinceStartup - timeStartCountdown)) - modifier;
		} else {
			return -1;	
		}
	}
	
	function setWaterLevel(level : float) {
		var water : GameObject = GameObject.FindWithTag("WaterLevel");
		
		if (water) {
			water.transform.position.y = level;
			
		}
	}
	
	function waterLevel() {
		var water : GameObject = GameObject.FindWithTag("WaterLevel");
		if (water) {
			return water.transform.position.y;	
		} else {
			
			return -1;
		}
	}
	
	function setRain(intense : float) {
		if ((intense <= 1) && (intense > 0)) {
			var rain = GameObject.FindWithTag("rain");
			rain.particleEmitter.emit = true;
			rain.audio.Play();
			
			rain.audio.volume = (intense * 0.5) + 0.5;
			rain.particleEmitter.minEmission = Mathf.Floor(intense * 2000);
			rain.particleEmitter.maxEmission = Mathf.Floor(intense * 3000);
		}
		
	}
	
	function stopRain() {
		var rain = GameObject.FindWithTag("rain");
		rain.particleEmitter.emit = false;
		rain.audio.Stop();
	}
	
	function stopRainEffects() {
		var rain = GameObject.FindWithTag("rain");
		rain.particleEmitter.emit = false;
		
	}
	
	function setSky(intense : float) {
		if ((intense <= 1) && (intense > 0)) {
			var sun = GameObject.FindWithTag("sun");
			var ambience = GameObject.FindWithTag("ambience");
			
			sun.GetComponent(Light).intensity = intense * 0.64;
			ambience.GetComponent(Light).intensity = intense * 0.1;
			
		}
		
	}
	
	function findProps() {
		water = GameObject.FindWithTag("WaterLevel");
		thePlayer = GameObject.FindWithTag("Player");
		gameController = GameObject.FindWithTag("GameController");
	}
	
}