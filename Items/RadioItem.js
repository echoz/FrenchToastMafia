class RadioItem extends InventoryItem {

	var switchedOn : boolean = false;
	var sosSent : boolean = false;
	private var director : Director;

	function Awake() {
		worldName  = "Amateur Radio";
		description = "Push to talk functionality for sending and receiving of radio communications. Has the ability to send morse code as well.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Radio";
		className = "RadioItem";		
	}

	function activeWillUpdateFunction() {
	}
	function activeDidUpdateFunction() {
	}
	function activeWillGUIFunction() {
	}
	function activeDidGUIFunction() {
	}
	function equippedWillUpdateFunction() {
		if (switchedOn) {
			// radio messages	
			
		}
		
	}
	function equippedDidUpdateFunction() {
	}
	function equippedWillGUIFunction() {
	}
	function equippedDidGUIFunction() {
	}
	
	function wake() {
		findProps();
		if (director.globalState.Contains("sosSent")) {
			sosSent = director.globalState["sosSent"];
		}		
	}
	
	function performFunction() {
		findProps();
		if (sosSent) {
			var audiosrc = thePlayer.GetComponent(Player).extraAudioSource;
			audiosrc.PlayOneShot(performAudio);
			
			switchedOn = !switchedOn;
			director.addSubtitle(new Subtitle("Radio switched " + ((switchedOn)?"on":"off") + "", 2));	
		} else {
			
			if (Application.loadedLevelName == "InteriorHouse") {
				director.addSubtitle(new Subtitle("*static*", 4, 0.5));	
				director.addSubtitle(new Subtitle("Michael: Damnit. No signal on this either. I think I might have to step out of the house to use this.", 5));	
			} else {
				findProps();
				director.load_level("radio_scene");
				
			}
		}
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	function findProps() {
		director = GameObject.FindWithTag("god").GetComponent(Director);	
	}

}