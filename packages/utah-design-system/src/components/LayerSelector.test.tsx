import Basemap from '@arcgis/core/Basemap';
import Collection from '@arcgis/core/core/Collection';
import Layer from '@arcgis/core/layers/Layer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { toggleBasemap, toggleLayer } from './LayerSelector';
import type {
  BasemapConfigOrToken,
  LayerConfigOrToken,
} from './LayerSelector.types';

// Mock the MapView class
vi.mock('@arcgis/core/views/MapView', () => {
  return {
    default: vi
      .fn()
      .mockImplementation(
        (properties: { map?: Map; container?: HTMLElement | string } = {}) => {
          const mockMapView = {
            map: properties?.map || null,
            container: properties?.container || null,
            ready: true,
            destroyed: false,
            // Add any other properties your code might access
            extent: null,
            center: null,
            zoom: 10,
            scale: 1000000,
            // Add methods if needed
            when: vi.fn().mockResolvedValue(undefined),
            destroy: vi.fn(),
            goTo: vi.fn().mockResolvedValue(undefined),
          };
          return mockMapView;
        },
      ),
  };
});

describe('LayerSelector utility functions', () => {
  let mockCollection: Collection<Layer>;
  let mockManagedObjects: Record<string, Layer | Basemap>;
  let mockView: MapView;
  let mockMap: Map;
  let mockBasemap: Basemap;

  beforeEach(() => {
    // Reset mocks before each test
    mockCollection = new Collection<Layer>();
    mockManagedObjects = {};

    // Create mock basemap with baseLayers and referenceLayers
    mockBasemap = new Basemap({
      baseLayers: new Collection<Layer>(),
      referenceLayers: new Collection<Layer>(),
    });

    // Create mock map
    mockMap = new Map({
      basemap: mockBasemap,
    });

    // Create mock view (now using mocked MapView)
    mockView = new MapView({
      map: mockMap,
    });

    // Mock the load method on basemaps
    vi.spyOn(Basemap.prototype, 'load').mockResolvedValue(undefined);
  });

  describe('toggleLayer', () => {
    it('should add a layer when visible is true and layer does not exist (string token)', async () => {
      const label = 'Test Layer';
      const token = 'Imagery' as const;

      await toggleLayer(
        token,
        label,
        true,
        mockCollection,
        mockManagedObjects,
        'testQuadWord',
      );

      expect(mockCollection.length).toBe(1);
      expect(mockManagedObjects[label]).toBeDefined();
      expect(mockManagedObjects[label]).toBeInstanceOf(WebTileLayer);
    });

    it('should add a layer when visible is true and layer does not exist (config object)', async () => {
      const label = 'Custom Layer';
      const mockLayer = new VectorTileLayer({ id: 'custom-layer' });
      const config: LayerConfigOrToken = {
        label,
        function: () => mockLayer,
      };

      await toggleLayer(
        config,
        label,
        true,
        mockCollection,
        mockManagedObjects,
        'testQuadWord',
      );

      expect(mockCollection.length).toBe(1);
      expect(mockCollection.getItemAt(0)).toBe(mockLayer);
      expect(mockManagedObjects[label]).toBe(mockLayer);
    });

    it('should reuse existing layer when visible is true and layer already exists', async () => {
      const label = 'Existing Layer';
      const existingLayer = new WebTileLayer({ id: 'existing' });
      mockManagedObjects[label] = existingLayer;

      await toggleLayer(
        'Imagery' as const,
        label,
        true,
        mockCollection,
        mockManagedObjects,
        'testQuadWord',
      );

      expect(mockCollection.length).toBe(1);
      expect(mockCollection.getItemAt(0)).toBe(existingLayer);
      expect(mockManagedObjects[label]).toBe(existingLayer);
    });

    it('should remove layer when visible is false and layer exists', async () => {
      const label = 'Layer to Remove';
      const layer = new WebTileLayer({ id: 'to-remove' });
      mockManagedObjects[label] = layer;
      mockCollection.add(layer);

      await toggleLayer(
        'Imagery' as const,
        label,
        false,
        mockCollection,
        mockManagedObjects,
        'testQuadWord',
      );

      expect(mockCollection.length).toBe(0);
      expect(mockManagedObjects[label]).toBe(layer); // Layer still exists in managed objects
    });

    it('should do nothing when visible is false and layer does not exist', async () => {
      const label = 'Non-existent Layer';

      await toggleLayer(
        'Imagery' as const,
        label,
        false,
        mockCollection,
        mockManagedObjects,
        'testQuadWord',
      );

      expect(mockCollection.length).toBe(0);
      expect(mockManagedObjects[label]).toBeUndefined();
    });
  });

  describe('toggleBasemap', () => {
    it('should add basemap layers when visible is true and basemap does not exist (string token)', async () => {
      const label = 'Test Basemap';
      const token = 'Imagery' as const;

      await toggleBasemap(
        token,
        label,
        true,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockManagedObjects[label]).toBeDefined();
      expect(mockManagedObjects[label]).toBeInstanceOf(Basemap);

      const basemap = mockManagedObjects[label] as Basemap;
      expect(basemap.baseLayers.length).toBe(1);
      expect(mockView.map?.basemap?.baseLayers.length).toBe(1);
    });

    it('should add basemap layers when visible is true and basemap does not exist (config object)', async () => {
      const label = 'Custom Basemap';
      const mockBasemapInstance = new Basemap({
        id: 'custom-basemap',
        baseLayers: [
          new WebTileLayer({
            id: 'custom-base',
            urlTemplate: 'https://test.com/{z}/{x}/{y}',
          }),
        ],
        referenceLayers: [
          new WebTileLayer({
            id: 'custom-ref',
            urlTemplate: 'https://test.com/{z}/{x}/{y}',
          }),
        ],
      });

      const config: BasemapConfigOrToken = {
        label,
        function: () => mockBasemapInstance,
      };

      await toggleBasemap(
        config,
        label,
        true,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockManagedObjects[label]).toBe(mockBasemapInstance);
      expect(mockView.map?.basemap?.baseLayers.length).toBe(1);
      expect(mockView.map?.basemap?.referenceLayers.length).toBe(1);
    });

    it('should reuse existing basemap when visible is true and basemap already exists', async () => {
      const label = 'Existing Basemap';
      const existingBasemap = new Basemap({
        id: 'existing',
        baseLayers: [
          new WebTileLayer({
            id: 'existing-base',
            urlTemplate: 'https://test.com/{z}/{x}/{y}',
          }),
        ],
      });
      mockManagedObjects[label] = existingBasemap;

      await toggleBasemap(
        'Imagery' as const,
        label,
        true,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockManagedObjects[label]).toBe(existingBasemap);
      expect(mockView.map?.basemap?.baseLayers.length).toBe(1);
    });

    it('should remove basemap layers when visible is false and basemap exists with base layers', async () => {
      const label = 'Basemap to Remove';
      const baseLayer = new WebTileLayer({
        id: 'base-to-remove',
        urlTemplate: 'https://test.com/{z}/{x}/{y}',
      });
      const basemap = new Basemap({
        id: 'to-remove',
        baseLayers: [baseLayer],
      });
      mockManagedObjects[label] = basemap;
      mockView.map?.basemap?.baseLayers.add(baseLayer);

      await toggleBasemap(
        'Imagery' as const,
        label,
        false,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockView.map?.basemap?.baseLayers.length).toBe(0);
      expect(mockManagedObjects[label]).toBe(basemap); // Basemap still exists in managed objects
    });

    it('should remove basemap layers when visible is false and basemap exists with reference layers', async () => {
      const label = 'Basemap with Reference';
      const referenceLayer = new WebTileLayer({
        id: 'ref-to-remove',
        urlTemplate: 'https://test.com/{z}/{x}/{y}',
      });
      const basemap = new Basemap({
        id: 'to-remove',
        referenceLayers: [referenceLayer],
      });
      mockManagedObjects[label] = basemap;
      mockView.map?.basemap?.referenceLayers.add(referenceLayer);

      await toggleBasemap(
        'Imagery' as const,
        label,
        false,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockView.map?.basemap?.referenceLayers.length).toBe(0);
      expect(mockManagedObjects[label]).toBe(basemap);
    });

    it('should handle basemap with both base and reference layers', async () => {
      const label = 'Complex Basemap';
      const baseLayer = new WebTileLayer({
        id: 'complex-base',
        urlTemplate: 'https://test.com/{z}/{x}/{y}',
      });
      const referenceLayer = new WebTileLayer({
        id: 'complex-ref',
        urlTemplate: 'https://test.com/{z}/{x}/{y}',
      });
      const basemap = new Basemap({
        id: 'complex',
        baseLayers: [baseLayer],
        referenceLayers: [referenceLayer],
      });

      const config: BasemapConfigOrToken = {
        label,
        function: () => basemap,
      };

      // Test adding
      await toggleBasemap(
        config,
        label,
        true,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockView.map?.basemap?.baseLayers.length).toBe(1);
      expect(mockView.map?.basemap?.referenceLayers.length).toBe(1);

      // Test removing
      await toggleBasemap(
        config,
        label,
        false,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockView.map?.basemap?.baseLayers.length).toBe(0);
      expect(mockView.map?.basemap?.referenceLayers.length).toBe(0);
    });

    it('should do nothing when visible is false and basemap does not exist', async () => {
      const label = 'Non-existent Basemap';

      await toggleBasemap(
        'Imagery' as const,
        label,
        false,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      expect(mockView.map?.basemap?.baseLayers.length).toBe(0);
      expect(mockView.map?.basemap?.referenceLayers.length).toBe(0);
      expect(mockManagedObjects[label]).toBeUndefined();
    });

    it('should not add duplicate layers to basemap collections', async () => {
      const label = 'Duplicate Test';
      const baseLayer = new WebTileLayer({
        id: 'duplicate-base',
        urlTemplate: 'https://test.com/{z}/{x}/{y}',
      });
      const basemap = new Basemap({
        id: 'duplicate-test',
        baseLayers: [baseLayer],
      });
      mockManagedObjects[label] = basemap;

      // Add the layer manually first
      mockView.map?.basemap?.baseLayers.add(baseLayer);

      await toggleBasemap(
        'Imagery' as const,
        label,
        true,
        mockManagedObjects,
        mockView,
        'testQuadWord',
      );

      // Should still only have one layer (no duplicates)
      expect(mockView.map?.basemap?.baseLayers.length).toBe(1);
    });
  });
});
