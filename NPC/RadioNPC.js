class RadioNPC extends NPC {
	
	var screen : GameObject;
	var led : GameObject;

	var freqText : GameObject;
	var freqTextTextStyle = new GUIStyle();
	var ptt_map_image : Texture;
	var pttTextStyle : GUIStyle;	
	
	var instructions : GameObject;
	var instructionsLetterPause : float = 0.02;
	var instructionsSound : AudioClip;
	var instructionsMorse : Texture2D;
	var instructionsTextStyle = new GUIStyle();
	
	private var on : boolean = false;
	private var PTTENABLED : boolean = false;
	private var FREQ: float = 0.0;
	private var CODE = "";
	private var CORRECT_FREQ : float = 12.50;
	private var CORRECT_CODE = "...---...";

	function TypeText(word : String) {
		for (var letter in word.ToCharArray()) {
			instructions.guiText.text += letter;
			if (instructionsSound) {
				instructions.audio.PlayOneShot(instructionsSound);	
			}
			yield WaitForSeconds(instructionsLetterPause);
		}
		instructions.audio.Stop();
	}

	function Awake() {
		on = false;
		var word = instructions.guiText.text;
		instructions.guiText.text = "";
		TypeText(word);
	}

	function OnGUI() {
		
		// update frequency screen
		if (on) {
			if (FREQ == CORRECT_FREQ) {
				freqTextTextStyle.normal.textColor = Color.green;
			} else {
				freqTextTextStyle.normal.textColor = Color.red;				
			}	
			GUI.Label(new Rect(Screen.width - 740, Screen.height - 400, 350, 300), freqText.guiText.text, freqTextTextStyle);
		}	
		
		//display the instructions and the morse code image
		GUI.Label(new Rect(Screen.width - 510, Screen.height - 600, 490,600), instructions.guiText.text, instructionsTextStyle);
		GUI.Box(new Rect(10, 10, 300, 450),instructionsMorse);
		
			
		if (!PTTENABLED) {	
			// display correct code stuff
			if (CODE == CORRECT_CODE) {
				Destroy (this);
				
				var director = GameObject.FindWithTag("god").GetComponent(Director);
				director.globalState.Remove("sosSent");
				director.globalState.Add("sosSent", true);
				director.previous_level();
			}
		}
	}

	function Update() {
		
		Screen.lockCursor = false;
		
		// update frequency display
		freqText.guiText.text = "" + FREQ.ToString("00.00");
		
		// set screen and led color
		if (on) {
			screen.renderer.material.color = Color.gray;
			if (PTTENABLED) {
				led.renderer.material.color = Color.red + Color.yellow;
			} else {
				led.renderer.material.color = Color.green;
			}
		} else {
			screen.renderer.material.color = Color.black;
			PTTENABLED = false;
			led.renderer.material.color = Color.red;
		}

		// reset code if PPT is not enabled		
		if (!PTTENABLED) {
			if (CODE != CORRECT_CODE) {
				CODE = "";	
			}	
		}
		
		if (Input.GetMouseButtonDown(0)) {
		
			var hit : RaycastHit;
			var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			
			if (Physics.Raycast(ray, hit) && hit.collider.name == "off_btn") {
				if (on) {
					on = false;
					FREQ = 0.0;
					var director = GameObject.FindWithTag("god").GetComponent(Director);
					director.previous_level();
						
				}
			} else if (Physics.Raycast(ray, hit) && hit.collider.name == "on_btn") {
				if (!on)
					on = true;	
			} else if (Physics.Raycast(ray, hit) && hit.collider.name == "PTT") {
								
				if (FREQ == CORRECT_FREQ) {
					PTTENABLED = !PTTENABLED;
				} 
			} else if (Physics.Raycast(ray, hit) && hit.collider.name == "Long_Btn") {
				if (PTTENABLED) {
					CODE = CODE + "-";	
				}
			} else if (Physics.Raycast(ray, hit) && hit.collider.name == "Short_Btn") {
				if (PTTENABLED) {
					CODE = CODE + ".";	
				}
			} else if (Physics.Raycast(ray, hit) && hit.collider.name == "Down" && !PTTENABLED) {
				if (on) {
					if (FREQ == 0.5) {
						FREQ = 0;
					} else {
						FREQ -= 0.5;
					}
				}	
			} else if (Physics.Raycast(ray, hit) && hit.collider.name == "Up" && !PTTENABLED) {
				if (on) {
					FREQ += 0.5;	
				}	
			}
		}
	}
	
}
