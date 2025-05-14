/**
 * Resources.test.js
 *
 * Prueba unitaria para la clase Resources.js original del proyecto.
 */

import Resources from '../src/Experience/Utils/Resources.js'

// Mock de EventEmitter
jest.mock('../src/Experience/Utils/EventEmitter.js', () => {
  return class {
    constructor() {
      this.callbacks = {};
    }
    on(event, callback) {
      this.callbacks[event] = callback;
    }
    trigger(event) {
      if (this.callbacks[event]) {
        this.callbacks[event]();
      }
    }
  };
});

// Mock de loaders de Three.js
jest.mock('three', () => ({
  TextureLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((_, onLoad) => {
      setTimeout(() => onLoad('mock-texture'), 10);
    }),
  })),
  CubeTextureLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((_, onLoad) => {
      setTimeout(() => onLoad('mock-cubetexture'), 10);
    }),
  })),
}));

jest.mock('three/examples/jsm/loaders/GLTFLoader.js', () => ({
  GLTFLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((_, onLoad) => {
      setTimeout(() => onLoad('mock-model'), 10);
    }),
  })),
}));

describe('Resources.js (clase original)', () => {
  test('Carga recursos y emite evento "ready"', (done) => {
    const sources = [
      { name: 'model1', type: 'gltfModel', path: '/models/m1.glb' },
      { name: 'texture1', type: 'texture', path: '/textures/t1.jpg' },
      { name: 'cube1', type: 'cubeTexture', path: '/textures/cube/' }
    ];

    const resources = new Resources(sources);

    resources.on('ready', () => {
      expect(Object.keys(resources.items)).toHaveLength(3);
      expect(resources.items.model1).toBe('mock-model');
      expect(resources.items.texture1).toBe('mock-texture');
      expect(resources.items.cube1).toBe('mock-cubetexture');
      done(); // finaliza la prueba asincrónica
    });
  });
});
