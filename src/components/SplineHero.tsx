import Spline from '@splinetool/react-spline';

export function SplineHero() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <div className="absolute inset-0 bg-background/40 z-10 pointer-events-none" /> {/* Overlay to ensure text readability */}
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
