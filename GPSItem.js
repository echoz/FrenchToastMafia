class GPSItem extends InventoryItem {

	var switchedOn : boolean = false;
	var rotateWithTarget : boolean = true;
	
	var scrollSensitivity : float = 3;
	var maxHeight : float = 80;
	var minHeight : float = 5;
	
	var displayWidth : float = 150; // pixels
	var displayHeight : float = 150;
	
	private var thePlayerSphere : GameObject;
	private var theCamera : GameObject;
	private var theDirector : Director;
	private var height = 30;
	
	private var screenRightPadding : float = 10.0;
	private var screenTopPadding : float = 35.0;
	private var internalPadding : float = 1.0;

	
	function Awake() {
		worldName  = "GPS";
		description = "Global Positioning enabled mapping device";
		quantity = 1;
		unitSpaceRequired = 1;
		consummable = false;
		prefabName = "GPS";
	}

	function Start() 
	{
		findProps();
		height = PlayerPrefs.GetInt("MinimapCameraHeight");
	}
	
	function wake() {
		findProps();
		theCamera.GetComponent(Camera).enabled = switchedOn;
		
	}

	function activeWillUpdateFunction() {
	}
	function activeDidUpdateFunction() {
	}
	function activeWillGUIFunction() {	
	}
	function activeDidGUIFunction() {
	}
	function findProps() {
		thePlayerSphere = GameObject.FindWithTag("player_sphere");
		theCamera = GameObject.FindWithTag("minimap_cam");
		theDirector = GameObject.FindWithTag("god").GetComponent(Director);
	}
		
	function equippedWillUpdateFunction() {
		
		if (switchedOn) {
			if ((theCamera == null) || (thePlayerSphere == null))
				findProps();
			
			// Update the transformation of the camera as per the target's position.
			theCamera.transform.position.x = thePlayerSphere.transform.position.x;
			theCamera.transform.position.z = thePlayerSphere.transform.position.z;
		
			// For this, we add the predefined (but variable, see below) height var.
			theCamera.transform.position.y = thePlayerSphere.transform.position.y + height;
			
			// If the minimap should rotate as the target does, the rotateWithTarget var should be true.
			// An extra catch because rotation with the fullscreen map is a bit weird.
			if(rotateWithTarget && !switchedOn)
			{
				theCamera.transform.eulerAngles.y = thePlayerSphere.transform.eulerAngles.y;
			}
		
			// Get the movement of the mouse wheel as an axis.
			// Needs configuring in your project's input setup.
			var mw : float = Input.GetAxis("Mouse ScrollWheel");
			
			// If the value is positive, add the height as defined by the sensitivity.
			// Also, save the height to player prefs in both cases with the call to saveHeight().
			if(mw > 0 && height < maxHeight) 
			{
				height += scrollSensitivity;
				saveHeight();
			}
			
			// Opposite for negative, just sub the value instead.
			else if(mw < 0 && height > minHeight) 
			{
				height -= scrollSensitivity;
				saveHeight();
			}
		}
	}
	function equippedDidUpdateFunction() {
	}
	function equippedWillGUIFunction() {
		if (switchedOn) {
			GUI.Box(new Rect(Screen.width - screenRightPadding - displayWidth - (internalPadding * 2), screenTopPadding + internalPadding, displayWidth + (internalPadding * 2), displayHeight + (internalPadding *2)), "Map");
		}		
	}
	function equippedDidGUIFunction() {
	}
	function performFunction() {
		findProps();
		
		switchedOn = !switchedOn;
		
		theDirector.addSubtitle(new Subtitle("GPS switched " + ((switchedOn)?"on":"off") + "", 2));

		theCamera.GetComponent(Camera).enabled = switchedOn;
		
		var posX : float = (Screen.width - displayWidth - screenRightPadding - internalPadding) / Screen.width;
		var posY : float = (Screen.height - displayHeight - screenTopPadding - (internalPadding * 2)) / Screen.height;
		var camWidth : float = (displayWidth / Screen.width);
		var camHeight : float = (displayHeight / Screen.height);
		Debug.Log(posY);
		theCamera.camera.rect = new Rect(posX,posY,camWidth,camHeight);

	}
	function willThrowItem() {
		theCamera.GetComponent(Camera).enabled = false;

	}
	function didThrowItem() {
	}
	
	function saveHeight() 
	{
		PlayerPrefs.SetInt("MinimapCameraHeight",height);
	}
	
}