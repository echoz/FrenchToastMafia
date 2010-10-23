class Backpack extends MonoBehaviour {
	var maxCapacity : int = 100;
	var items = new Array();

	var activeItem : InventoryItem;
	
	// gui
	
	// detect objects
	function Update() {
		var hit : RaycastHit;
		var direction = GameObject.FindWithTag("Player").GetComponent(Camera).transform.forward;

		if(Physics.Raycast(transform.position,direction,hit,10))
		{
			if (hit.collider.gameObject.tag == "items") {
				Debug.Log(hit.collider.gameObject.GetComponent(InventoryItem).unitSpaceRequired);
			}
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
	
	function indexOfItem(item : InventoryItem) {
		for (var i=0;i<items.length;i++) {
			if (items[i] == item) {
				return i;	
			}	
		}
		return -1;
	}
	
	function addItem(item : InventoryItem) {
		if ((item.quantity * item.unitSpaceRequired) < (this.currentCapacity())) {
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
		items.RemoveAt(this.indexOfItem(item));	
	}
	
	function removeItemAtIndex(idx : int) {
		items.RemoveAt(idx);	
	}
	


}