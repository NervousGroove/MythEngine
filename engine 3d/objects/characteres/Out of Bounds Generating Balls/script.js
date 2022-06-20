function _classPrivateMethodGet(receiver, privateSet, fn) {if (!privateSet.has(receiver)) {throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {if (receiver !== classConstructor) {throw new TypeError("Private static access of wrong provenance");}if (descriptor.get) {return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldGet(receiver, privateMap) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to get private field on non-instance");}if (descriptor.get) {return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to set private field on non-instance");}if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}return value;}console.clear();var _balls = new WeakMap();var _ballGeometry = new WeakMap();var _ballMaterial = new WeakMap();var _ballRadius = new WeakMap();var _camera = new WeakMap();var _controls = new WeakMap();var _shouldDropBall = new WeakMap();var _renderer = new WeakMap();var _scene = new WeakMap();var _timeOfLastBall = new WeakMap();var _world = new WeakMap();var _dumpBalls = new WeakSet();var _addControls = new WeakSet();var _makeBall = new WeakSet();var _makeLights = new WeakSet();var _makePlatform = new WeakSet();var _updateBalls = new WeakMap();var _shakeOnCollision = new WeakMap();var _render = new WeakMap();

class Scene extends THREE.Scene {

















  constructor() {
    super();_makePlatform.add(this);_makeLights.add(this);_makeBall.add(this);_addControls.add(this);_dumpBalls.add(this);_balls.set(this, { writable: true, value: [] });_ballGeometry.set(this, { writable: true, value: void 0 });_ballMaterial.set(this, { writable: true, value: void 0 });_ballRadius.set(this, { writable: true, value: 5 });_camera.set(this, { writable: true, value: void 0 });_controls.set(this, { writable: true, value: void 0 });_shouldDropBall.set(this, { writable: true, value: false });_renderer.set(this, { writable: true, value: void 0 });_scene.set(this, { writable: true, value: void 0 });_timeOfLastBall.set(this, { writable: true, value: void 0 });_world.set(this, { writable: true, value: void 0 });_updateBalls.set(this, { writable: true, value:

































































































































































































      (ball, index, balls) => {
        ball.position.copy(ball.body.position);
        ball.quaternion.copy(ball.body.quaternion);

        const damping = ball.body.position.y < 6 &&
        ball.body.position.y > -1 ? .2 : 0;
        ball.body.angularDamping = damping;
        ball.body.linearDamping = damping;

        const depth = ball.position.y;
        const opacity = 1 + depth / 50;
        ball.material.opacity = opacity;

        // Dispose of balls once they've fallen far enough away
        if (opacity <= 0) {
          ball.geometry.dispose();
          ball.material.dispose();
          _classPrivateFieldGet(this, _world).removeBody(ball.body);
          this.remove(ball);
          _classPrivateFieldGet(this, _renderer).renderLists.dispose();
          balls.splice(index, 1);
        }
      } });_shakeOnCollision.set(this, { writable: true, value:






      e => {
        const force = e.contact.getImpactVelocityAlongNormal();

        if (force < _classStaticPrivateFieldSpecGet(Scene, Scene, _MIN_FORCE_FOR_CAMERA_DISTURBANCE)) return;

        _classPrivateFieldGet(this, _camera).lookAt(new THREE.Vector3(force / 400, force / 300, force / 200));
        setTimeout(() => _classPrivateFieldGet(this, _camera).lookAt(_classStaticPrivateFieldSpecGet(Scene, Scene, _INITIAL_CAMERA_TARGET)), force);
      } });_render.set(this, { writable: true, value:

      () => {
        const dt = 1 / _classStaticPrivateFieldSpecGet(Scene, Scene, _FPS);
        const { innerHeight, innerWidth } = window;
        _classPrivateFieldGet(this, _renderer).setSize(innerWidth, innerHeight);
        _classPrivateFieldGet(this, _camera).aspect = innerWidth / innerHeight;
        _classPrivateFieldGet(this, _camera).updateProjectionMatrix();

        _classPrivateFieldGet(this, _world).step(dt);

        _classPrivateFieldGet(this, _balls).forEach(_classPrivateFieldGet(this, _updateBalls));

        if (_classPrivateFieldGet(this, _shouldDropBall)) _classPrivateMethodGet(this, _dumpBalls, _dumpBalls2).call(this);

        document.querySelector('#count h2').innerHTML = _classPrivateFieldGet(this, _balls).length.toString().padStart(3, '0');

        _classPrivateFieldGet(this, _renderer).render(this, _classPrivateFieldGet(this, _camera));
      } });const _textureLoader = new THREE.TextureLoader();const ballTexture = _textureLoader.load('https://assets.codepen.io/829639/TennisBallColorMap.jpeg');const ballBumpMap = _textureLoader.load('https://assets.codepen.io/829639/TennisBallBump.jpeg');_classPrivateFieldSet(this, _ballGeometry, new THREE.SphereGeometry(_classPrivateFieldGet(this, _ballRadius), 32, 16));_classPrivateFieldSet(this, _ballMaterial, new THREE.MeshStandardMaterial({ bumpMap: ballBumpMap, bumpScale: .25, color: 0xffffff, map: ballTexture, metalness: 0, opacity: 1, roughness: 1, transparent: true }, 50));this.fog = new THREE.Fog(0x000000, -10, 1024);_classPrivateFieldSet(this, _world, new CANNON.World());_classPrivateFieldGet(this, _world).gravity.set(0, -30, 0);_classPrivateFieldGet(this, _world).broadphase = new CANNON.NaiveBroadphase();_classPrivateFieldGet(this, _world).defaultContactMaterial.restitution = .65;_classPrivateFieldSet(this, _camera, new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 10000));_classPrivateFieldGet(this, _camera).position.set(0, 300, -225);_classPrivateFieldGet(this, _camera).lookAt(_classStaticPrivateFieldSpecGet(Scene, Scene, _INITIAL_CAMERA_TARGET));this.add(_classPrivateFieldGet(this, _camera));_classPrivateMethodGet(this, _makeLights, _makeLights2).call(this);_classPrivateMethodGet(this, _makePlatform, _makePlatform2).call(this); // Drop first ball
    _classPrivateMethodGet(this, _makeBall, _makeBall2).call(this);_classPrivateFieldSet(this, _renderer, new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#demo') }));_classPrivateFieldGet(this, _renderer).setSize(window.innerWidth, window.innerHeight);_classPrivateFieldGet(this, _renderer).shadowMap.enabled = true;document.body.appendChild(_classPrivateFieldGet(this, _renderer).domElement);const setShouldDropBall = (value, e) => {e.preventDefault();e.stopPropagation();_classPrivateFieldSet(this, _shouldDropBall, value);};document.body.addEventListener('mousedown', setShouldDropBall.bind(this, true));document.body.addEventListener('mouseup', setShouldDropBall.bind(this, false));document.body.addEventListener('touchstart', setShouldDropBall.bind(this, true));document.body.addEventListener('touchend', setShouldDropBall.bind(this, false));window.addEventListener('selectstart', e => {e.preventDefault();return false;});_classPrivateMethodGet(this, _addControls, _addControls2).call(this);_classPrivateFieldGet(this, _renderer).setAnimationLoop(_classPrivateFieldGet(this, _render));}}var _INITIAL_CAMERA_TARGET = { writable: true, value: new THREE.Vector3(0, 0, 0) };var _MIN_FORCE_FOR_CAMERA_DISTURBANCE = { writable: true, value: 5 };var _SPACE_BAR_KEY_CODE = { writable: true, value: 32 };var _FPS = { writable: true, value: 15 };var _dumpBalls2 = function _dumpBalls2() {const minTimeSinceLast = 10;const timeDiff = Date.now() - _classPrivateFieldGet(this, _timeOfLastBall); // throttle
  if (timeDiff < minTimeSinceLast) return;_classPrivateMethodGet(this, _makeBall, _makeBall2).call(this);};var _addControls2 = function _addControls2() {_classPrivateFieldSet(this, _controls, new THREE.OrbitControls(_classPrivateFieldGet(this, _camera), _classPrivateFieldGet(this, _renderer).domElement));_classPrivateFieldGet(this, _controls).enablePan = false;_classPrivateFieldGet(this, _controls).minDistance = 0;_classPrivateFieldGet(this, _controls).maxDistance = 1500;_classPrivateFieldGet(this, _controls).rotateSpeed = 0.5;_classPrivateFieldGet(this, _controls).keyPanSpeed = 140;_classPrivateFieldGet(this, _controls).listenToKeyEvents(window);};var _makeBall2 = function _makeBall2() {const sign = Math.round(Math.random()) ? 1 : -1;const hasBalls = _classPrivateFieldGet(this, _balls).length > 0;const x = hasBalls ? Math.floor(Math.random() * 25) * sign : 0;const z = hasBalls ? Math.floor(Math.random() * 25) * sign : 0;const y = 100;const mesh = new THREE.Mesh(_classPrivateFieldGet(this, _ballGeometry).clone(), _classPrivateFieldGet(this, _ballMaterial).clone());const shape = new CANNON.Sphere(_classPrivateFieldGet(this, _ballRadius));const body = new CANNON.Body({ friction: 30, mass: 1 });body.addShape(shape);body.position.set(x, y, z);body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 1, 1), Math.floor(Math.random() * Math.PI));body.addEventListener('collide', _classPrivateFieldGet(this, _shakeOnCollision));_classPrivateFieldGet(this, _world).add(body);mesh.castShadow = true;mesh.position.set(x, y, z);mesh.body = body;_classPrivateFieldGet(this, _balls).push(mesh);this.add(mesh);_classPrivateFieldSet(this, _timeOfLastBall, Date.now());};var _makeLights2 = function _makeLights2() {const ambientLight = new THREE.AmbientLight(0xffffff, .5);this.add(ambientLight);const light = new THREE.DirectionalLight(0xffffff, .9);const d = 200;light.position.set(d, d, 0);light.castShadow = true;light.shadow.mapSize.width = 1024;light.shadow.mapSize.height = 1024;light.shadow.camera.left = -d;light.shadow.camera.right = d;light.shadow.camera.top = d;light.shadow.camera.bottom = -d;light.shadow.camera.far = 3 * d;light.shadow.camera.near = d;light.shadow.darkness = 0.5;this.add(light);};var _makePlatform2 = function _makePlatform2() {const size = 100;const textureLoader = new THREE.TextureLoader();const geometry = new THREE.BoxGeometry(size, 2, size);const material = new THREE.MeshStandardMaterial({ color: 0xffffff, bumpMap: textureLoader.load('https://assets.codepen.io/829639/tennis-court-bumpmap.png'), map: textureLoader.load('https://assets.codepen.io/829639/tennis-court-texture.jpeg'), metalness: .3, roughnessMap: textureLoader.load('https://assets.codepen.io/829639/tennis-court-roughmap.png'), roughness: 1, side: THREE.DoubleSide });const mesh = new THREE.Mesh(geometry, material);const shape = new CANNON.Box(new CANNON.Vec3(size / 2, 1, size / 2));const body = new CANNON.Body({ linearDamping: 1, mass: 0 });body.position = new CANNON.Vec3(0, 0, 0);body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);body.addShape(shape);_classPrivateFieldGet(this, _world).add(body);mesh.receiveShadow = true;mesh.body = body;this.add(mesh);const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: .2, opacity: .8, roughnessMap: textureLoader.load('https://assets.codepen.io/829639/tennis-court-roughmap.png'), roughness: 1, transparent: 1 });const lineGeometry = new THREE.BoxGeometry(5, .1, size);const line = new THREE.Mesh(lineGeometry, lineMaterial);line.receiveShadow = true;line.position.set(0, 1, 0);this.add(line);};
new Scene();