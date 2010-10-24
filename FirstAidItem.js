class FirstAidItem extends InventoryItem {

	function Start() {
		worldName  = "First Aid Kit";
		description = "Restores health. Has limited quantity of first aid patches.";
		quantity = 10;
		unitSpaceRequired = 1;
		consummable = true;
		prefabName = "FirstAid";
	}

	function performFunction() {
		quantity--;
		GameObject.FindWithTag("GameController").GetComponent(Player).adjustHealth(10);
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