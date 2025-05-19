// src/__tests__/Resources.test.js
import Resources from '../src/Experience/Utils/Resources'; // Asegúrate que esta ruta es la correcta
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Mocks necesarios
jest.mock('three', () => ({
  TextureLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((path, onLoad) => onLoad(`Texture: ${path}`))
  })),
  CubeTextureLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((path, onLoad) => onLoad(`CubeTexture: ${path}`))
  }))
}));

jest.mock('three/examples/jsm/loaders/GLTFLoader.js', () => ({
  GLTFLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn((path, onLoad) => onLoad(`GLTF: ${path}`))
  }))
}));

// Fuente de prueba
const mockSources = [
  { name: 'modelo1', type: 'gltfModel', path: '/models/modelo1.glb' },
  { name: 'textura1', type: 'texture', path: '/textures/textura1.jpg' },
  { name: 'cubemap1', type: 'cubeTexture', path: '/textures/cubemap1/' }
];

describe('Resources', () => {
  let resources;

  beforeEach(() => {
    resources = new Resources(mockSources);
  });

  test('debería inicializar con los loaders definidos', () => {
    expect(resources.loaders).toBeDefined();
    expect(resources.loaders.gltfLoader).toBeDefined();
    expect(resources.loaders.textureLoader).toBeDefined();
    expect(resources.loaders.cubeTextureLoader).toBeDefined();
  });

  test('debería cargar correctamente todos los recursos en items', () => {
    expect(Object.keys(resources.items).length).toBe(3);
    expect(resources.items['modelo1']).toBe('GLTF: /models/modelo1.glb');
    expect(resources.items['textura1']).toBe('Texture: /textures/textura1.jpg');
    expect(resources.items['cubemap1']).toBe('CubeTexture: /textures/cubemap1/');
  });

  test('debería emitir el evento ready cuando todos los recursos estén cargados', () => {
    const callback = jest.fn();

    // Subclase para evitar startLoading en el constructor
    class TestResources extends Resources {
      constructor(sources) {
        super(sources);
        this.loaded = this.toLoad - 1; // casi todo cargado
      }

      startLoading() {
        // evitamos carga automática
      }
    }

    const newRes = new TestResources(mockSources);
    newRes.on('ready', callback);

    // Simulamos carga del último recurso
    newRes.sourceLoaded(mockSources[0], 'Archivo-final');

    expect(callback).toHaveBeenCalled();
  });

  test('debería incrementar "loaded" al cargar un recurso', () => {
    const initialLoaded = resources.loaded;
    const source = { name: 'extra', type: 'texture', path: '/textures/extra.jpg' };

    resources.sourceLoaded(source, 'TextureData');
    expect(resources.loaded).toBe(initialLoaded + 1);
    expect(resources.items['extra']).toBe('TextureData');
  });
});
