"use client"

import * as THREE from "three"
import { useEffect, useRef } from "react"


export default function CubeScene() {
    const cubeRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!cubeRef.current) return

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 4

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)

        cubeRef.current.appendChild(renderer.domElement)

        const handleRESIZE = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleRESIZE)

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: "yellow" })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)


        const animate = () => {
            requestAnimationFrame(animate)

            cube.rotation.x += 0.01
            cube.rotation.y += 0.01

            renderer.render(scene, camera)
        }
        animate()

        return () => {
            window.removeEventListener("resize", handleRESIZE)
            if (cubeRef.current) cubeRef.current.removeChild(renderer.domElement)
        }

    }, [])


    return (
        <div ref={cubeRef} className="w-full h-screen">

        </div>
    )
}