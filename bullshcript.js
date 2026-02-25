window.addEventListener("bs-loaded", async () => {
  // create a reference to the banter scene
  const dioramascene = BS.BanterScene.GetInstance();
  
  async function somerandomStartCrap() {
    const waitingForUnity = async () => { while (!dioramascene.unityLoaded) { await new Promise(resolve => setTimeout(resolve, 500)); } };
    await waitingForUnity(); console.log("SCRIPT: Unity-Loaded");
    setTimeout(() => { loadSettings(); landingPlatform(); }, 1000);
  };

  function loadSettings() {
    const randomLocationX = Math.round((Math.random() * 2 - 1) * 10) / 10;
    const randomLocationZ = Math.round((Math.random() * 2 - 1) * 10) / 10;
    console.log("SCRIPT setSceneSettings Loading...");
    // SetSettings - Set settings for the current space like spawn position, portals, guest access etc.
    const settings = new BS.SceneSettings();
    settings.EnableTeleport = true;
    settings.EnableForceGrab = false;
    settings.EnableSpiderMan = true;
    settings.EnablePortals = true;
    settings.EnableGuests = true;
    // settings.EnableQuaternionPose = false;
    // settings.EnableControllerExtras = false;
    // settings.EnableFriendPositionJoin = false;
    // settings.EnableDefaultTextures = true;
    // settings.EnableAvatars = true;
    settings.MaxOccupancy = 50;
    settings.RefreshRate = 72;
    settings.ClippingPlane = new BS.Vector2(0.05, 1000);
    settings.SpawnPoint = new BS.Vector4(0, 0.1, 0, 90);
    dioramascene.TeleportTo({x: randomLocationX, y: 0.2, z: randomLocationZ}, 0, true);
    dioramascene.SetSettings(settings);
    console.log("SCRIPT finish setting settings for scene");
    setTimeout(() => { dioramascene.TeleportTo({x: randomLocationX, y: 0.2, z: randomLocationZ}, 0, true); dioramascene.SetSettings(settings); }, 2000);
  };

  async function landingPlatform() {
    const platformObject = new BS.GameObject("landingPlane");
    await platformObject.AddComponent(new BS.BanterGeometry(BS.GeometryType.BoxGeometry));
    await platformObject.AddComponent(new BS.BoxCollider(false));
    await platformObject.AddComponent(new BS.BanterMaterial("Unlit/DiffuseTransparent", "",  new BS.Vector4(0,0,0,0.5)));
    const plane20transform = await platformObject.AddComponent(new BS.Transform());

    plane20transform.localPosition = new BS.Vector3(0,-20,0);
    plane20transform.localScale = new BS.Vector3(20,0.05,20);
  }

  async function createButton(name, butPosition, ButtonImage = null, localRotation = new BS.Vector3(0,0,0), localScale = new BS.Vector3(1, 1, 1), width = 1, height = 1, depth = 1, clickHandler, text, whiteColour = new BS.Vector4(1,1,1,1)) {
    const buttonObject = await new BS.GameObject(`Button_${name}`).Async(); // Create the Object and give it a name
    await buttonObject.AddComponent(new BS.BanterGeometry(BS.GeometryType.BoxGeometry, 0, width, height, depth)); // add geometry to the object
    await buttonObject.AddComponent(new BS.BanterMaterial('Unlit/Diffuse', ButtonImage, new BS.Vector4(1, 1, 1, 1))); // Set the Shader (Unlit/Diffuse) and the Color (0.1, 0.1, 0.1, 0.7) 0.7 being the alpha / transparency 
    const buttonTransform = await buttonObject.AddComponent(new BS.Transform()); // Add a transform component so you can move and transform the object
    await buttonObject.AddComponent(new BS.MeshCollider(true)); // Add a mesh Collider for the clicking to work
    buttonObject.SetLayer(5); // Set the object to UI Layer 5 so it can be clicked

    buttonTransform.position = butPosition; // Set the Position of the object
    buttonTransform.localScale = localScale; // Set the Scale of the object
    buttonTransform.localEulerAngles = localRotation; // Set the Scale of the object

    const textObject = await new BS.GameObject(`Button_${name}Text`).Async();
    await textObject.AddComponent(new BS.BanterText(text, whiteColour, BS.HorizontalAlignment.Center, BS.VerticalAlignment.Center, 1, true, true, new BS.Vector2(2,1)));
    const textTransform = await textObject.AddComponent(new BS.Transform());
    textTransform.localPosition = new BS.Vector3(0, 0, -0.105);
    await textObject.SetParent(buttonObject, false);

    buttonObject.On('click', (e) => {
      console.log(`Button clicked!`);
      clickHandler(e);
    });
  }
  
    createButton(
      'Button1',
      new BS.Vector3(6,1.1,-6),
      'https://firer.at/files/FireRat-(4).jpeg',
      new BS.Vector3(0,90,0),
      new BS.Vector3(1, 1, 1),
      1, 1, 0.2,
      () => { 
        console.log("Button 1 Clicked!");
        dioramascene.Gravity(new BS.Vector3(0, 0, 0));
      },
      "Zero Gravity"
    );

    createButton(
      'Button2',
      new BS.Vector3(6,1.1,-5),
      'https://firer.at/files/FireRat-(8).jpeg',
      new BS.Vector3(0,90,0),
      new BS.Vector3(1, 1, 1),
      1, 1, 0.2,
      () => { console.log("Button 2 Clicked!"); dioramascene.Gravity(new BS.Vector3(0, -0.1, 0)); },
      "-0.1 Gravity"
    );

    createButton(
      'Button3',
      new BS.Vector3(6,1.1,-4),
      'https://firer.at/files/FireRat-(33).jpeg',
      new BS.Vector3(0,90,0),
      new BS.Vector3(1, 1, 1),
      1, 1, 0.2,
      () => { console.log("Button 3 Clicked!"); dioramascene.Gravity(new BS.Vector3(0, -9.8, 0)); },
      "Normal Gravity"
    );

  somerandomStartCrap();

})