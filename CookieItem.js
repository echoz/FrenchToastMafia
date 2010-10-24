class CookieItem extends InventoryItem {

	function Awake() {
		worldName  = "Box of cookies";
		description = "Girl scout mint chocolate chip cookies. Mmmmmmmmmmmm.";
		quantity = 20;
		unitSpaceRequired = 1;
		consummable = true;
		prefabName = "Cookie";
	}

	function performFunction() {
		quantity--;
		GameObject.FindWithTag("GameController").GetComponent(Player).adjustHealth(5);
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

}