class Player extends WorldObject {
	var health : float = 100.0;
	var maxHealth : float = 100.0;
	
	var healthSubtractInterval : float = 5;
	var healthSubtractDelta : float = -1;
	
	var drowningAudio : AudioClip;
	
	private var healthBarLength : float;
	private var lastUpdateHealth : float = 0;
	private var lastPlayedAudio : float;
	
	function Start() {
		healthBarLength = Screen.width / 4;	
	}
	
	function Update() {
		var playerCamera = GameObject.FindWithTag("Player");
		if (GameObject.FindWithTag("Water")) {
			var waterLevel = GameObject.FindWithTag("Water").transform.position.y;
			affectedByWater(waterLevel, playerCamera);
		}

	}
		
	function affectedByWater(waterLevel : int, playerCamera : GameObject) {
		if (waterLevel > playerCamera.transform.position.y) {
			
			if ((Time.realtimeSinceStartup - lastUpdateHealth) > healthSubtractInterval) {
				lastUpdateHealth = Time.realtimeSinceStartup;
				adjustHealth(healthSubtractDelta);				
			}
			
			if ((Time.realtimeSinceStartup - lastPlayedAudio) > 3) {
				playerCamera.audio.PlayOneShot(drowningAudio);
				lastPlayedAudio = Time.realtimeSinceStartup;
			}
		} 
	}
	
	function OnGUI() {
		GUI.Box(new Rect(10, 10, healthBarLength + 10, 20),"");
		GUI.Box(new Rect(10, 10, Screen.width / 4 + 10, 20), health + "/" + maxHealth);
	}	
	
	function adjustHealth(healthDelta : int) {
		health += healthDelta;
		
		if (health < 0)
			health = 0;
			
		if (health > maxHealth)
			health = maxHealth;
			
		healthBarLength = (Screen.width / 4) * (health / maxHealth);
	}
}