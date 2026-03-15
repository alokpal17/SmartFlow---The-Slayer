import React, { useEffect, useState } from "react";

export default function LiveCameraFeed() {
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (snapshots.length > 1) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % snapshots.length);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [snapshots]);

  const uploadVideo = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Upload failed ${response.status}`);

      const data = await response.json();

      if (data.status !== "success" || !Array.isArray(data.snapshots)) {
        throw new Error(data.message || "Unexpected API response");
      }

      const urls = data.snapshots.map((name: string) => `http://localhost:5000/uploads/${name}`);
      setSnapshots(urls);
      setCurrentFrame(0);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file?.type.startsWith("video/")) uploadVideo(file);
  };

  return (
    <section className="space-y-5">
      <header className="rounded-2xl bg-[var(--panel)] px-5 py-4">
        <h2 className="text-2xl font-bold text-white">Live Camera Feed</h2>
        <p className="text-sm text-slate-300">Drag and drop a video to generate real-time snapshot playback.</p>
      </header>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="glass-card flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-cyan-300/20 p-6"
      >
        <p className="text-sm text-slate-300">Drop your video file here</p>
        <p className="text-xs text-slate-400">Accepted: mp4, webm, mov, mkv</p>

        {uploading && <span className="rounded-lg bg-cyan-500/20 px-3 py-1 text-xs text-cyan-100">Processing video...</span>}
        {error && <span className="rounded-lg bg-rose-500/20 px-3 py-1 text-xs text-rose-100">{error}</span>}

        {snapshots.length > 0 && (
          <div className="w-full rounded-xl border border-cyan-300/20 bg-slate-950/70 p-3">
            <img src={snapshots[currentFrame]} alt={`frame-${currentFrame}`} className="mx-auto max-h-[360px] rounded-lg object-contain" />
            <p className="mt-2 text-center text-xs text-slate-300">Frame {currentFrame + 1}/{snapshots.length}</p>
          </div>
        )}
      </div>
    </section>
  );
}