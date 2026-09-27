import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"

// Tactile micro-tick sound generator (Web Audio API)
function playHapticTick() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === "suspended") {
      ctx.resume()
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.009)

    gain.gain.setValueAtTime(0.045, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.009)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.01)
  } catch {
    // Ignore if audio is restricted
  }
}

// Device hardware vibration
function triggerDeviceVibration() {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(12)
    }
  } catch {
    // Ignore
  }
}

// Official AIR Lab Mark SVG string for instant synchronous parse without network delay
const AIR_LAB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="98 22 146 152" width="146" height="152" fill="none">
  <path d="M 145.38 168.61 C 146.34 168.39, 147.46 168.09, 147.88 167.95 C 148.29 167.81, 149.07 167.56, 149.62 167.41 C 150.18 167.25, 150.90 166.93, 151.24 166.69 C 151.58 166.45, 152.06 166.25, 152.30 166.25 C 153.47 166.25, 158.69 163.29, 160.26 161.74 C 160.47 161.53, 161.44 160.72, 162.42 159.94 C 163.40 159.16, 164.63 157.95, 165.16 157.25 C 165.69 156.55, 166.50 155.57, 166.95 155.07 C 168.11 153.78, 169.70 151.30, 171.24 148.39 C 171.96 147.03, 172.85 145.47, 173.21 144.92 C 174.18 143.47, 175.38 141.39, 176.48 139.24 C 177.02 138.20, 177.64 137.20, 177.85 137.02 C 178.07 136.84, 178.25 136.51, 178.25 136.30 C 178.25 136.09, 178.44 135.71, 178.67 135.46 C 178.89 135.20, 179.20 134.78, 179.35 134.52 C 179.50 134.25, 180.03 133.33, 180.53 132.46 C 181.03 131.59, 181.86 130.09, 182.37 129.13 C 182.89 128.17, 183.52 127.11, 183.78 126.78 C 184.04 126.45, 184.25 126.04, 184.25 125.87 C 184.25 125.70, 184.42 125.42, 184.62 125.25 C 184.82 125.09, 185.14 124.65, 185.33 124.29 C 185.52 123.92, 185.93 123.17, 186.25 122.62 C 186.56 122.08, 187.16 120.95, 187.57 120.12 C 187.98 119.30, 188.48 118.44, 188.68 118.20 C 188.88 117.97, 189.23 117.44, 189.46 117.02 C 189.69 116.61, 190.63 114.97, 191.56 113.39 C 192.49 111.81, 193.25 110.36, 193.25 110.17 C 193.25 109.98, 193.47 109.62, 193.75 109.38 C 194.03 109.13, 194.25 108.82, 194.25 108.70 C 194.25 108.58, 194.71 107.78, 195.27 106.94 C 196.18 105.57, 196.96 104.19, 198.91 100.53 C 199.24 99.92, 199.63 99.27, 199.78 99.09 C 199.94 98.90, 200.25 98.41, 200.47 98.01 C 200.69 97.61, 201.50 96.17, 202.27 94.83 C 203.04 93.48, 204.09 91.64, 204.60 90.75 C 205.11 89.86, 205.85 88.62, 206.25 88.00 C 207.30 86.36, 209.63 82.19, 210.16 81.00 C 210.25 80.79, 210.52 80.40, 210.76 80.12 C 211.38 79.42, 215.25 72.54, 215.25 72.15 C 215.25 71.97, 215.46 71.63, 215.73 71.40 C 215.99 71.16, 216.63 70.10, 217.16 69.04 C 218.05 67.26, 218.12 66.95, 218.21 64.52 C 218.28 62.34, 218.22 61.73, 217.80 60.77 C 217.07 59.08, 216.77 58.44, 216.39 57.78 C 215.87 56.89, 212.96 54.02, 212.38 53.84 C 212.10 53.75, 211.59 53.50, 211.25 53.27 C 208.53 51.45, 203.26 51.65, 200.20 53.70 C 199.64 54.07, 198.92 54.52, 198.60 54.69 C 197.74 55.17, 195.95 57.32, 195.29 58.68 C 194.55 60.19, 194.50 60.27, 193.20 62.33 C 191.62 64.84, 191.32 65.37, 189.81 68.25 C 189.06 69.69, 188.29 70.96, 188.10 71.07 C 187.91 71.18, 187.75 71.41, 187.75 71.58 C 187.75 71.75, 187.38 72.45, 186.93 73.13 C 185.69 75.03, 183.75 78.53, 183.75 78.88 C 183.75 79.05, 183.57 79.34, 183.35 79.52 C 183.13 79.70, 182.84 80.08, 182.72 80.36 C 182.59 80.65, 182.16 81.38, 181.76 82.00 C 181.36 82.62, 180.23 84.61, 179.25 86.43 C 178.27 88.25, 177.37 89.80, 177.23 89.89 C 177.10 89.97, 176.83 90.39, 176.62 90.83 C 176.42 91.27, 176.03 91.96, 175.76 92.38 C 175.09 93.42, 172.75 97.65, 172.75 97.84 C 172.75 97.93, 172.30 98.64, 171.75 99.43 C 171.20 100.23, 170.75 101.00, 170.75 101.16 C 170.75 101.31, 170.58 101.58, 170.38 101.75 C 170.18 101.91, 169.85 102.35, 169.66 102.71 C 167.24 107.36, 166.64 108.45, 166.28 108.88 C 166.05 109.15, 165.59 109.88, 165.27 110.50 C 164.94 111.12, 164.54 111.79, 164.36 112.00 C 164.19 112.21, 163.64 113.19, 163.14 114.18 C 162.63 115.17, 162.12 116.05, 161.99 116.13 C 161.86 116.21, 161.75 116.48, 161.75 116.73 C 161.75 116.98, 161.57 117.34, 161.35 117.52 C 161.13 117.70, 160.85 118.08, 160.72 118.36 C 160.59 118.65, 160.14 119.44, 159.71 120.12 C 158.54 122.00, 155.75 126.99, 155.75 127.22 C 155.75 127.33, 155.53 127.63, 155.25 127.88 C 154.97 128.12, 154.75 128.46, 154.75 128.63 C 154.75 128.80, 154.53 129.21, 154.26 129.55 C 154.00 129.89, 153.05 131.51, 152.17 133.15 C 151.28 134.79, 150.15 136.74, 149.65 137.49 C 149.16 138.25, 148.75 139.00, 148.75 139.18 C 148.75 139.72, 144.86 143.46, 144.09 143.65 C 143.70 143.75, 143.07 144.05, 142.70 144.33 C 142.12 144.76, 141.64 144.82, 138.81 144.80 C 135.66 144.79, 135.54 144.76, 134.10 143.99 C 130.88 142.24, 129.02 140.10, 128.03 136.98 C 127.57 135.54, 127.69 131.59, 128.24 129.96 C 128.66 128.69, 129.35 127.34, 129.76 127.00 C 129.84 126.93, 130.27 126.26, 130.71 125.50 C 131.15 124.74, 131.62 123.96, 131.74 123.75 C 132.86 121.87, 134.25 119.21, 134.25 118.97 C 134.25 118.80, 134.46 118.42, 134.71 118.14 C 135.35 117.42, 137.01 114.70, 138.34 112.22 C 138.95 111.07, 139.66 109.73, 139.91 109.25 C 140.17 108.78, 140.57 108.23, 140.81 108.05 C 141.05 107.87, 141.25 107.60, 141.25 107.46 C 141.25 107.31, 141.63 106.56, 142.10 105.78 C 142.57 105.01, 143.37 103.59, 143.89 102.62 C 144.41 101.66, 144.96 100.65, 145.11 100.38 C 145.25 100.10, 145.80 99.24, 146.31 98.47 C 146.83 97.70, 147.25 96.98, 147.25 96.87 C 147.25 96.76, 147.41 96.49, 147.59 96.27 C 147.78 96.05, 148.58 94.64, 149.36 93.12 C 150.15 91.61, 151.04 90.04, 151.35 89.62 C 152.08 88.65, 155.25 83.11, 155.25 82.81 C 155.25 82.68, 155.47 82.32, 155.75 82.00 C 156.03 81.68, 156.25 81.29, 156.25 81.12 C 156.25 80.96, 156.62 80.33, 157.08 79.72 C 157.89 78.64, 159.11 76.55, 160.62 73.62 C 161.49 71.94, 162.70 70.00, 162.87 70.00 C 162.93 70.00, 163.62 71.10, 164.41 72.44 C 165.19 73.78, 166.04 75.08, 166.29 75.32 C 166.54 75.57, 166.75 75.98, 166.75 76.23 C 166.75 76.48, 166.91 76.82, 167.10 76.98 C 167.30 77.14, 167.86 78.09, 168.36 79.08 C 168.86 80.07, 169.52 81.28, 169.82 81.78 C 170.13 82.29, 170.75 83.32, 171.20 84.09 C 172.13 85.66, 172.30 85.81, 172.84 85.60 C 173.27 85.44, 174.89 82.91, 176.53 79.82 C 177.13 78.69, 177.82 77.41, 178.05 76.97 C 178.29 76.53, 178.57 76.10, 178.68 76.02 C 178.94 75.84, 180.65 72.93, 181.85 70.62 C 182.35 69.66, 183.01 68.47, 183.32 67.99 C 183.62 67.50, 184.21 66.54, 184.61 65.86 C 185.01 65.18, 185.55 64.36, 185.80 64.03 C 186.36 63.28, 186.39 61.57, 185.85 60.97 C 185.63 60.73, 185.27 60.19, 185.04 59.77 C 184.81 59.35, 183.92 57.82, 183.06 56.38 C 182.20 54.94, 181.50 53.67, 181.50 53.56 C 181.50 53.18, 179.91 51.15, 178.26 49.41 C 176.33 47.38, 174.60 46.06, 172.88 45.28 C 172.19 44.97, 171.16 44.51, 170.59 44.25 C 170.02 43.99, 169.12 43.70, 168.59 43.60 C 168.06 43.50, 167.26 43.27, 166.82 43.09 C 165.71 42.62, 160.37 42.63, 158.95 43.10 C 158.36 43.30, 157.48 43.54, 157.00 43.64 C 156.52 43.74, 155.73 44.03, 155.25 44.28 C 154.77 44.54, 154.24 44.75, 154.07 44.75 C 153.10 44.75, 149.35 47.40, 147.47 49.41 C 146.23 50.74, 144.75 52.76, 144.75 53.12 C 144.75 53.29, 144.53 53.63, 144.25 53.88 C 143.97 54.12, 143.75 54.42, 143.75 54.53 C 143.75 54.65, 143.33 55.39, 142.83 56.18 C 142.32 56.98, 141.53 58.36, 141.07 59.25 C 140.61 60.14, 140.09 61.10, 139.93 61.38 C 138.94 63.02, 138.36 63.91, 138.07 64.21 C 137.89 64.39, 137.75 64.68, 137.75 64.86 C 137.75 65.04, 137.54 65.45, 137.28 65.78 C 137.03 66.11, 136.33 67.33, 135.73 68.50 C 134.68 70.55, 134.36 71.10, 133.22 72.78 C 132.57 73.73, 130.09 78.10, 129.61 79.12 C 129.23 79.94, 129.14 80.10, 127.59 82.50 C 127.01 83.39, 125.84 85.42, 124.99 87.00 C 124.14 88.58, 123.28 90.05, 123.09 90.27 C 122.90 90.49, 122.75 90.76, 122.75 90.87 C 122.75 90.98, 122.36 91.66, 121.89 92.37 C 121.42 93.08, 120.40 94.83, 119.63 96.27 C 118.85 97.70, 117.78 99.55, 117.24 100.38 C 116.70 101.20, 116.12 102.16, 115.95 102.50 C 115.79 102.84, 115.46 103.41, 115.23 103.75 C 115.00 104.09, 114.44 105.11, 113.99 106.00 C 113.54 106.89, 112.67 108.41, 112.05 109.38 C 111.44 110.34, 110.77 111.40, 110.56 111.73 C 110.05 112.54, 108.54 115.35, 107.82 116.80 C 107.50 117.45, 107.13 118.04, 107.00 118.13 C 106.86 118.21, 106.75 118.48, 106.75 118.73 C 106.75 118.98, 106.53 119.47, 106.25 119.82 C 105.97 120.17, 105.75 120.60, 105.74 120.79 C 105.74 120.97, 105.52 121.58, 105.25 122.12 C 104.98 122.67, 104.76 123.33, 104.76 123.58 C 104.75 123.83, 104.63 124.26, 104.47 124.55 C 104.32 124.83, 103.98 126.37, 103.72 127.97 C 102.75 133.97, 103.36 140.78, 105.31 145.62 C 106.36 148.22, 108.67 152.58, 109.99 154.45 C 111.32 156.33, 114.86 159.91, 117.44 162.00 C 120.57 164.54, 127.12 167.64, 130.67 168.27 C 131.38 168.40, 132.22 168.61, 132.54 168.73 C 133.59 169.15, 143.40 169.06, 145.38 168.61 Z M 231.12 168.54 C 234.38 167.37, 236.73 165.19, 238.71 161.51 C 239.26 160.49, 239.32 160.06, 239.35 157.23 C 239.37 154.39, 239.32 153.95, 238.76 152.73 C 238.43 151.98, 238.00 151.20, 237.83 150.98 C 237.65 150.76, 236.98 149.58, 236.35 148.36 C 235.72 147.13, 234.45 144.92, 233.54 143.44 C 231.86 140.72, 231.35 139.84, 229.92 137.12 C 229.48 136.30, 228.71 134.98, 228.19 134.20 C 227.67 133.42, 227.25 132.67, 227.25 132.54 C 227.25 132.42, 227.10 132.18, 226.91 132.03 C 226.72 131.87, 225.97 130.59, 225.25 129.18 C 224.52 127.78, 223.57 126.06, 223.13 125.38 C 222.70 124.69, 222.12 123.79, 221.86 123.38 C 221.06 122.12, 220.91 121.85, 220.04 120.23 C 219.59 119.37, 218.69 117.78, 218.04 116.70 C 217.40 115.62, 216.69 114.39, 216.46 113.98 C 216.23 113.56, 215.89 113.03, 215.70 112.80 C 215.51 112.56, 214.96 111.60, 214.49 110.65 C 213.08 107.84, 213.20 108.04, 210.86 104.38 C 210.04 103.09, 209.81 102.68, 208.88 100.82 C 207.86 98.78, 207.71 98.64, 206.88 98.85 C 206.45 98.96, 206.05 99.47, 205.47 100.69 C 205.02 101.62, 204.47 102.60, 204.25 102.88 C 203.68 103.55, 201.56 107.16, 200.22 109.71 C 198.52 112.95, 198.49 113.00, 198.25 113.00 C 198.13 113.00, 197.96 113.25, 197.86 113.56 C 197.77 113.87, 197.31 114.71, 196.84 115.44 C 196.36 116.16, 195.82 117.13, 195.62 117.60 C 195.42 118.07, 194.87 119.11, 194.38 119.91 C 193.90 120.72, 193.50 121.55, 193.50 121.77 C 193.50 122.32, 196.72 128.52, 197.38 129.26 C 197.59 129.48, 197.75 129.76, 197.75 129.87 C 197.75 129.98, 198.16 130.69, 198.66 131.45 C 199.16 132.20, 200.13 133.90, 200.82 135.22 C 201.50 136.54, 202.22 137.80, 202.41 138.02 C 202.60 138.24, 202.75 138.53, 202.75 138.67 C 202.75 138.81, 202.97 139.13, 203.25 139.38 C 203.53 139.62, 203.75 140.02, 203.75 140.25 C 203.75 140.48, 203.97 140.87, 204.24 141.12 C 204.52 141.36, 204.81 141.78, 204.89 142.05 C 205.09 142.69, 208.68 148.95, 209.28 149.72 C 209.54 150.05, 209.75 150.45, 209.75 150.62 C 209.75 150.79, 209.97 151.13, 210.25 151.38 C 210.53 151.62, 210.75 151.96, 210.75 152.13 C 210.75 152.50, 214.90 159.73, 215.26 160.00 C 215.36 160.07, 215.92 161.06, 216.51 162.20 C 217.32 163.79, 217.97 164.64, 219.22 165.77 C 220.13 166.58, 220.97 167.25, 221.10 167.25 C 221.23 167.25, 221.55 167.44, 221.80 167.67 C 223.25 168.98, 228.52 169.47, 231.12 168.54 Z M 222.95 49.60 C 223.54 49.41, 224.31 49.25, 224.66 49.25 C 225.01 49.25, 225.60 49.09, 225.96 48.89 C 226.33 48.69, 227.05 48.34, 227.56 48.11 C 228.54 47.67, 230.76 45.57, 231.38 44.50 C 233.03 41.60, 233.25 40.87, 233.25 38.23 C 233.25 36.04, 233.15 35.42, 232.59 34.02 C 231.35 30.92, 229.68 28.91, 227.00 27.32 C 225.73 26.56, 222.88 25.75, 221.51 25.75 C 219.46 25.75, 216.39 26.93, 213.56 28.80 C 212.51 29.50, 210.75 31.58, 210.75 32.13 C 210.75 32.30, 210.53 32.72, 210.25 33.07 C 209.97 33.42, 209.75 33.98, 209.75 34.31 C 209.75 34.64, 209.57 35.44, 209.35 36.09 C 208.44 38.76, 210.41 44.49, 213.05 46.87 C 214.32 48.01, 216.21 49.01, 218.00 49.48 C 218.62 49.64, 219.46 49.87, 219.88 49.98 C 220.69 50.21, 221.31 50.13, 222.95 49.60 Z" fill="#e11d48" fill-rule="evenodd" />
</svg>`

interface Logo3DProps {
  className?: string
  size?: number
}

export function Logo3D({ className = "", size = 180 }: Logo3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const previousPointerPositionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const groupRef = useRef<THREE.Group | null>(null)
  const baseScaleRef = useRef(1)

  const [isInteracting, setIsInteracting] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // Reset rotation to front-facing view
  const handleReset = useCallback(() => {
    playHapticTick()
    triggerDeviceVibration()
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0)
      velocityRef.current = { x: 0, y: 0 }
    }
    setIsInteracting(false)
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000)
    camera.position.set(0, 0, 260)

    // Renderer with transparency & high DPR
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(size, size)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(120, 150, 200)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffa5b5, 1.6)
    fillLight.position.set(-120, -100, 150)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.4)
    rimLight.position.set(0, 150, -180)
    scene.add(rimLight)

    const topLight = new THREE.PointLight(0xe11d48, 3.5, 300)
    topLight.position.set(0, 0, 60)
    scene.add(topLight)

    // 3D Model Group
    const logoGroup = new THREE.Group()
    groupRef.current = logoGroup
    scene.add(logoGroup)

    // Parse SVG and Extrude into 3D Mesh
    try {
      const loader = new SVGLoader()
      const svgData = loader.parse(AIR_LAB_SVG)

      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#e11d48"),
        metalness: 0.65,
        roughness: 0.22,
        clearcoat: 0.85,
        clearcoatRoughness: 0.12,
        reflectivity: 0.9,
      })

      const innerGroup = new THREE.Group()

      svgData.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path)
        shapes.forEach((shape) => {
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 14,
            bevelEnabled: true,
            bevelSegments: 6,
            steps: 2,
            bevelSize: 2.2,
            bevelThickness: 2.2,
          })

          geometry.center()

          // Invert Y axis to convert SVG coordinate system to 3D Cartesian coordinates
          geometry.scale(1, -1, 1)

          // Invert triangle index winding so surface normals face outward correctly
          const index = geometry.index
          if (index) {
            const arr = index.array as Uint16Array | Uint32Array
            for (let i = 0; i < arr.length; i += 3) {
              const temp = arr[i + 1]
              arr[i + 1] = arr[i + 2]
              arr[i + 2] = temp
            }
            index.needsUpdate = true
          }

          geometry.computeVertexNormals()

          const mesh = new THREE.Mesh(geometry, material)
          innerGroup.add(mesh)
        })
      })

      // Normalize scale so it fits nicely inside canvas
      const box = new THREE.Box3().setFromObject(innerGroup)
      const maxDim = Math.max(
        box.max.x - box.min.x,
        box.max.y - box.min.y,
        box.max.z - box.min.z
      )
      const scaleFactor = 115 / maxDim
      baseScaleRef.current = scaleFactor
      innerGroup.scale.set(scaleFactor, scaleFactor, scaleFactor)

      logoGroup.add(innerGroup)
    } catch (err) {
      console.error("Error creating 3D logo:", err)
    }

    // Animation & Physics Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      if (logoGroup) {
        if (!isDraggingRef.current) {
          // Apply rotational inertia / momentum after dragging
          if (
            Math.abs(velocityRef.current.x) > 0.0001 ||
            Math.abs(velocityRef.current.y) > 0.0001
          ) {
            logoGroup.rotation.y += velocityRef.current.x
            logoGroup.rotation.x += velocityRef.current.y

            // Friction damping
            velocityRef.current.x *= 0.94
            velocityRef.current.y *= 0.94
          } else {
            // Idle floating hover & subtle breathing tilt when not actively dragged
            logoGroup.position.y = Math.sin(elapsedTime * 2.2) * 3.5
            // Subtle living float
            if (!isInteracting) {
              logoGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.12
              logoGroup.rotation.x = Math.cos(elapsedTime * 0.8) * 0.06
            }
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [size])

  // Mouse / Pointer Event Handlers for 360° Drag & Recoil
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    setIsMouseDown(true)
    setIsInteracting(true)
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY }
    velocityRef.current = { x: 0, y: 0 }

    // Haptic feedback
    playHapticTick()
    triggerDeviceVibration()

    // Capture pointer so dragging outside canvas remains smooth
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !groupRef.current) return

    const deltaX = e.clientX - previousPointerPositionRef.current.x
    const deltaY = e.clientY - previousPointerPositionRef.current.y

    const rotSpeed = 0.012
    groupRef.current.rotation.y += deltaX * rotSpeed
    groupRef.current.rotation.x += deltaY * rotSpeed

    velocityRef.current = {
      x: deltaX * 0.008,
      y: deltaY * 0.008,
    }

    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false
    setIsMouseDown(false)
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // Ignore
    }
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Container with tactile spring recoil */}
      <motion.div
        animate={{
          scale: isMouseDown ? 0.94 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
        className="relative cursor-grab active:cursor-grabbing group touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Soft Crimson Ambient Back-glow */}
        <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl pointer-events-none transform scale-90 group-hover:bg-primary/25 transition-all duration-500" />

        {/* WebGL Canvas */}
        <div ref={mountRef} className="relative z-10" />

        {/* Interactive 3D Orbit Ring Indicator */}
        <div className="absolute inset-2 rounded-full border border-dashed border-primary/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" />
      </motion.div>

      {/* Interactive Helper Badge */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[11px] font-mono text-muted-foreground/80 tracking-wide flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {isInteracting ? "360° Free Rotation Active" : "Drag to rotate 3D logo"}
        </span>

        {isInteracting && (
          <button
            type="button"
            onClick={handleReset}
            title="Reset orientation"
            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border shadow-2xs"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
