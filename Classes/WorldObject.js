class WorldObject extends MonoBehaviour {
	
	var worldName : String = "";	
	
	function notify(who : Object, msg : String, userInfo : Object) {
		// target must respond to notification
		who.notification(this, msg, userInfo);
	}
	
	function indexOfItem(item : Object, items : Array) {
		for (var i=0;i<items.length;i++) {
			if (items[i] === item) {
				return i;
			}	
		}
		return -1;
	}
}