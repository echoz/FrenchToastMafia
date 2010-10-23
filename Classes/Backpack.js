class Backpack extends MonoBehaviour {
	var maxCapacity : int = 100;
	var items = new Array();

	var activeItem : InventoryItem;

	private var collideItems = new Array();
		
	// gui
	
	// detect objects
	function FixedUpdate() {
		if (Input.GetKey("e") && (collideItems.length > 0)) {
			for (var item : InventoryItem in collideItems) {
				if (addItem(item)) {
					DestroyImmediate(item.gameObject);
				}
			}
			collideItems.clear();
		}
		Debug.Log(items.length);
	}
	
	function notification(who : Object, msg : String, userInfo : Object) {
		if (msg == "InItemSpace") {
			collideItems.Add(who);	
		} else if (msg == "OutItemSpace") {
			collideItems.RemoveAt(indexOfItem(who, collideItems));
		}
	}
	
	// hardcore functions
	function currentCapacity() {
		var currcapc = 0;
		for (var i=0;i<items.length;i++) {
			currcapc += items[i].quantity * items[i].unitSpaceRequired;
		}	
		
		return currcapc;
	}
	
	function indexOfItem(item : Object, items : Array) {
		for (var i=0;i<items.length;i++) {
			if (items[i] == item) {
				return i;	
			}	
		}
		return -1;
	}
	
	function addItem(item : InventoryItem) {
		if (((item.quantity * item.unitSpaceRequired) + currentCapacity()) <= maxCapacity) {
			items.Add(item);

			return true;
		} else {	
			return false;
		}
	}
	
	function swapItem(itemToSwap : InventoryItem, itemToSwapFor : InventoryItem) {
		this.removeItem(itemToSwap);
		items.Add(itemToSwapFor);	
	}
	
	function removeItem(item : InventoryItem) {
		items.RemoveAt(this.indexOfItem(item, items));	
	}
	
	function removeItemAtIndex(idx : int) {
		items.RemoveAt(idx);	
	}
	


}