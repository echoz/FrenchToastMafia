class FluteItem extends InventoryItem {
var sound : AudioClip;
var source : AudioSource;
	
	function Awake() {
		worldName  = "Flute";
		description = "Blow it for some stress-relieving music.";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "Flute";
		className = "FluteItem";	
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
		if (sound)
            source.PlayOneShot (sound);
	}		
	function findProps() {
	}
	function willThrowItem() {
	}
	function didThrowItem() {
	}
	
}