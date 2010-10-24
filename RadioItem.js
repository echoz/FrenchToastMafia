class RadioItem extends InventoryItem {

	function Start() {
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
	}
	function equippedDidUpdateFunction() {
	}
	function equippedWillGUIFunction() {
	}
	function equippedDidGUIFunction() {
	}
	function performFunction() {
		var director = GameObject.FindWithTag("god");
		director.GetComponent(Director).load_level("radio_scene");
	}
}