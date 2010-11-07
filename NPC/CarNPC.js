class CarNPC extends NPC {
	//Credit to Andrew Gotow 2009 for the car script 
	// These variables allow the script to power the wheels of the car.
	var FrontLeftWheel : WheelCollider;
	var FrontRightWheel : WheelCollider;
	var GearRatio : float[];
	var CurrentGear : int = 0;
	// These variables are just for applying torque to the wheels
	var EngineTorque : float = 600.0;
	var MaxEngineRPM : float = 3000.0;
	var MinEngineRPM : float = 1000.0;
	private var EngineRPM : float = 0.0;
	//The petrol the car has
	var maxPetrol : int = 500;
	var curPetrol : float = 500;
	//To toggle headlights
	var carLightL : Light;
	var carLightR : Light;
	var warning : Texture2D;
	var nopetrol : Texture2D;
	public var fadeSpeed = 0.3;
	var TextStyle = new GUIStyle();
	var drawDepth = -1000;
	private var alpha = 1.0;
	private var fadeDir = -1;
	
	var DriveCam : GameObject; 
	private var Player: GameObject;
	private var PlayerCam : GameObject;
	private var nearCar : boolean;
	static var onCar : boolean = false;
	private var getout : Vector3;
	private var instruction : boolean = false;
	
	function Start()
	{
		DriveCam.active = false;
		//this variable is for the positon the player spawn when it got out
		getout = Vector3(5, 3, 0);
	}	
	
	function Awake () 
	{
		// I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
		rigidbody.centerOfMass.y = -2.5;
	}
	
	function OnTriggerEnter (who : Collider)
	{
		if(who.gameObject.tag == "GameController" )
		{
			nearCar = true;
			onCar=false;
			instruction = true;
			Player = who.gameObject;
			PlayerCam = GameObject.FindWithTag("Player");
		}
	} 
	//Player is not near the car
	function OnTriggerExit (who : Collider) 
	{
		if(who.gameObject.tag == "GameController" )
		{
			nearCar = false;
			instruction = false;
		}
	} 	
		
	//Draw the amount of petrol left
	function OnGUI()
	{

		if (onCar) {
			GUI.Label(new Rect(Screen.width/2*0.68 , 15, maxPetrol, 20),"Petrol: ");
			GUI.Box(new Rect(Screen.width/2 - maxPetrol/2, 15, maxPetrol, 20),"");
			//if petrol is empty juz show a empty bar
			if(curPetrol > 0)
			{
				GUI.Box(new Rect(Screen.width/2 - maxPetrol/2, 15, curPetrol, 20),"");
			}
			//Give a warning when petrol is less than 35%
			if(curPetrol > 0 && curPetrol < maxPetrol*0.35)
			{
				alpha += fadeDir * fadeSpeed * Time.deltaTime; 
				alpha = Mathf.Clamp01(alpha);   
				GUI.color.a = alpha;
				GUI.depth = drawDepth;  
				GUI.DrawTexture(new Rect(Screen.width/2 - warning.width/4, 55, warning.width/2, warning.height/2),warning);
				//GUI.Label(new Rect(Screen.width/2 - warning.width/4, 55, warning.width/2, warning.height/2),warning);
			}
			//Warning on no petrol
			if(curPetrol <= 0)
			{
				GUI.Label(new Rect(Screen.width/2 - nopetrol.width/4, 55, nopetrol.width/2, nopetrol.height/2),nopetrol);
			}
		} else {
			if(instruction)
			{
				GUI.Label(Rect(Screen.width/2 - 245, Screen.height /2, 490,100), "Press [E] to get into the car.", TextStyle);
			}
			
		}
	}

	//The movement of the car
	function Update () 
	{
		
		if (onCar) {
			//Spawn the player beside the car
			Player.transform.position = DriveCam.transform.position;
			
			//Get out of the Car
			if(Input.GetKeyUp("g") && onCar)
			{
				// remember to enable FPSWalker
				onCar = false;
				DriveCam.active = false;
				Player.GetComponent("FPSWalker").enabled = true;
				Player.GetComponent("Player").enabled = true;
				Player.GetComponent("Backpack").enabled = true;
				PlayerCam.active = true;
				Player.transform.position = transform.position + getout;
			}			
					
			// This is to limith the maximum speed of the car, adjusting the drag probably isn't the best way of doing it,
			// but it's easy, and it doesn't interfere with the physics processing.
			rigidbody.drag = rigidbody.velocity.magnitude / 250;
			
			//I HAVE NO IDEA HOW THIS SHIT WORKS. but i added brake and only move when player press "w" or "s" and consume petrol
			//press spacebar to brake
			if(Input.GetButton("Jump") || curPetrol <= 0)
			{
				FrontLeftWheel.brakeTorque = 1000;
				FrontRightWheel.brakeTorque = 1000;
			}
			else
			{	
				FrontLeftWheel.brakeTorque = 0;
				FrontRightWheel.brakeTorque = 0;
				// finally, apply the values to the wheels.	The torque applied is divided by the current gear, and
				// multiplied by the user input variable.
				//"w" to move forward and "s" to move backward
				if(Input.GetKey("w") || Input.GetKey("s"))
				{
					EngineRPM = (FrontLeftWheel.rpm + FrontRightWheel.rpm)/2 * GearRatio[CurrentGear];
					ShiftGears();
					FrontLeftWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
					FrontRightWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
					curPetrol -= 0.05;
				}
				//Don't move then not pressing "w" or "s"
				else
				{
					FrontLeftWheel.brakeTorque = 300;
					FrontRightWheel.brakeTorque = 300;
				}
			}
			// the steer angle is an arbitrary value multiplied by the user input.
			FrontLeftWheel.steerAngle = 15 * Input.GetAxis("Horizontal");
			FrontRightWheel.steerAngle = 15 * Input.GetAxis("Horizontal");
			//toggle headlights
			if(Input.GetKeyUp("f"))
			{
				carLightL.enabled = !carLightL.enabled;
				carLightR.enabled = !carLightR.enabled;
			}
			//this area is to set the gui to fade in and out
			if(alpha == 1.0){
				fadeDir = -1;  
			}
			if(alpha == 0.0){
				fadeDir = 1;  
			}
		} else {
			
			//Get into the car
			if(Input.GetKeyUp("e") && nearCar && !onCar)
			{
				var director = GameObject.FindWithTag("god").GetComponent(Director);
		
				if (Player.GetComponent("Backpack").hasItemOfType("CarKeyItem")) {
					
					DriveCam.active = true;
					Player.GetComponent("FPSWalker").enabled = false;
					Player.GetComponent("Player").enabled = false;
					Player.GetComponent("Backpack").enabled = false;
					PlayerCam.active = false;
					onCar = true;
			
					director.addSubtitle(new Subtitle("Press [W] or [S] to move forward or reverse.", 3));
					director.addSubtitle(new Subtitle("Press [A] or [D] to turn left or right.", 3));
					director.addSubtitle(new Subtitle("Press [SpaceBar] to brake.", 3));
					director.addSubtitle(new Subtitle("Press [G] to get out the car.", 3));
					director.addSubtitle(new Subtitle("Press [F] to on/off light.", 3));
				} else {
					director.addSubtitle(new Subtitle("Hmm. I think I left my keys here somewhere...", 3));	
				}
			}
		}
	}
	
	function ShiftGears() {
		// this funciton shifts the gears of the vehcile, it loops through all the gears, checking which will make
		// the engine RPM fall within the desired range. The gear is then set to this "appropriate" value.
		if ( EngineRPM >= MaxEngineRPM ) {
			var AppropriateGear : int = CurrentGear;
			
			for ( var i = 0; i < GearRatio.length; i ++ ) {
				if ( FrontLeftWheel.rpm * GearRatio[i] < MaxEngineRPM ) {
					AppropriateGear = i;
					break;
				}
			}
			
			CurrentGear = AppropriateGear;
		}
		
		if ( EngineRPM <= MinEngineRPM ) {
			AppropriateGear = CurrentGear;
			
			for ( var j = GearRatio.length-1; j >= 0; j -- ) {
				if ( FrontLeftWheel.rpm * GearRatio[j] > MinEngineRPM ) {
					AppropriateGear = j;
					break;
				}
			}
			
			CurrentGear = AppropriateGear;
		}
	}	
}