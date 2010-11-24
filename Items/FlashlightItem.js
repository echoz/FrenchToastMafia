class FlashlightItem extends InventoryItem {
	var switchedOn : boolean = false;

	private var flashlight : Light;

	function Awake() {
		worldName  = "Flashlight";
		description = "Let there be light!";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Flashlight";
		className = "FlashlightItem";
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
	}
	function equippedDidUpdateFunction() {
	}
	function equippedWillGUIFunction() {
	}
	function equippedDidGUIFunction() {
	}
	function performFunction() {
		findProps();
		var audiosrc = thePlayer.GetComponent(Player).extraAudioSource;
		audiosrc.PlayOneShot(performAudio);
		
		switchedOn = !switchedOn;
		flashlight.enabled = switchedOn;
	}
	function willThrowItem() {
		findProps();
		flashlight.enabled = false;
	}
	function didThrowItem() {
	}
	
	function findProps() {
		super.findProps();
		flashlight = GameObject.Find("Player/Flashlight").GetComponent(Light);
	}
	
}