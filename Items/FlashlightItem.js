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
		flashlight = GameObject.Find("Player/Flashlight").GetComponent(Light);
	}
	
}