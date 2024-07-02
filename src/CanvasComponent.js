import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CanvasComponent = ({ objects, speeds }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight / 1.4;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setSize(width, height);
    renderer.setClearColor(0x33334c);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 0); // Center of the scene
    scene.add(light);

    // Create objects
    const geometry3 = new THREE.OctahedronGeometry(1.5, 0);
    const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const octahedron = new THREE.Mesh(geometry3, material3);

    const geometry2 = new THREE.TorusGeometry(1, 0.4, 16, 15);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const torus = new THREE.Mesh(geometry2, material2);

    const geometry1 = new THREE.BoxGeometry();
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry1, material1);

    // Create an octahedron geometry

    cube.position.x = 4;
    torus.position.x = 0;
    octahedron.position.x = -4;

    const objectList = [octahedron, torus, cube];
    objectList.forEach((obj) => scene.add(obj));

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      objectList.forEach((obj, index) => {
        if (objects[index]) {
          obj.rotation.y += speeds[index];
        }
        obj.visible = objects[index];
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      objectList.forEach((obj) => scene.remove(obj));
      renderer.dispose();
    };
  }, [objects, speeds]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasComponent;
