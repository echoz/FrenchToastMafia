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
		if (sosSent) {
			switchedOn = !switchedOn;
			director.addSubtitle(new Subtitle("Radio switched " + ((switchedOn)?"on":"off") + "", 2));	
		} else {
			findProps();
			director.load_level("radio_scene");
		}
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}

}