'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FloatingGem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // ── 1. Thiết lập Scene ──
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.set(0, 0, 3.2); // Đưa camera lại gần một chút để ngọc to hơn nữa

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // ── 2. Tạo kết cấu vân đá quý lấp lánh bụi vàng ──
        const texCanvas = document.createElement('canvas');
        texCanvas.width = texCanvas.height = 512;
        const ctx = texCanvas.getContext('2d')!;

        const grd = ctx.createLinearGradient(0, 0, 512, 512);
        grd.addColorStop(0, '#C4A48A');   // Vàng hổ phách
        grd.addColorStop(0.4, '#9E2A2B'); // Đỏ mận nhung
        grd.addColorStop(1, '#EAD8C7');   // Ngọc trai sữa
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 512, 512);

        for (let i = 0; i < 6000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            ctx.fillStyle = `rgba(255, 215, 0, ${Math.random() * 0.15})`;
            ctx.fillRect(x, y, 2, 2);
        }

        const texture = new THREE.CanvasTexture(texCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;

        // ── 3. Tạo Viên đá bát diện (Octahedron) ──
        const geometry = new THREE.OctahedronGeometry(1, 0);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshRef.current = mesh;

        // ── 4. Tự xoay nhẹ nhàng (Idle) ──
        const renderLoop = () => {
            mesh.rotation.x += 0.002;
            mesh.rotation.y += 0.003;
            renderer.render(scene, camera);
        };
        gsap.ticker.add(renderLoop);

        // ── 5. Cải tiến ScrollTrigger đồng bộ toàn trang (Trải dài từ đầu đến cuối trang) ──
        gsap.to(mesh.rotation, {
            x: `+=${Math.PI * 3.5}`,
            y: `+=${Math.PI * 4.5}`,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body', // Tính toán cuộn dựa trên toàn bộ trang
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2,
            },
        });

        // Ngọc sẽ trượt tịnh tiến nhẹ lên trên khi cuộn xuống dưới cùng
        gsap.to(mesh.position, {
            y: 0.4,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            },
        });

        // ── 6. Hiệu ứng nhịp thở nhẹ (Pulse) ──
        gsap.to(mesh.scale, {
            x: 1.06,
            y: 1.06,
            z: 1.06,
            duration: 4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });

        // ── 7. Xử lý Resize ──
        const handleResize = () => {
            if (!container) return;
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            gsap.ticker.remove(renderLoop);
            geometry.dispose();
            material.dispose();
            texture.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none select-none w-full h-full"
        />
    );
}