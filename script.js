const realWorldTasks = [
  {
    id: "find-blue-block",
    label: "Find Blue Block",
  },
  {
    id: "line-swap",
    label: "Line Swap",
  },
  {
    id: "triangle-swap",
    label: "Triangle Swap",
  },
  {
    id: "press-twice",
    label: "Press Twice",
  },
];

const realWorldMethods = [
  {
    id: "pi05",
    label: "pi0.5",
  },
  {
    id: "fast-wam",
    label: "Fast-WAM",
  },
  {
    id: "lingbot-va",
    label: "LingBot-VA",
  },
  {
    id: "dim-wam",
    label: "DiM-WAM",
  },
];

const realWorldVideoFiles = {
  "find-blue-block/pi05": {
    url: "https://youtu.be/WYwEEhNy0VY",
    status: "fail",
  },
  "find-blue-block/fast-wam": {
    url: "https://youtu.be/Wxz6EGaHWYU",
    status: "fail",
  },
  "find-blue-block/lingbot-va": {
    url: "https://youtu.be/um7nlJYJTvg",
    status: "fail",
  },
  "find-blue-block/dim-wam": {
    url: "https://youtu.be/zJm0yGS_vyU",
    status: "success",
  },
  "line-swap/pi05": {
    url: "https://youtu.be/gDpxkhF6lqM",
    status: "fail",
  },
  "line-swap/fast-wam": {
    url: "https://youtu.be/MzKlhl3K2KQ",
    status: "fail",
  },
  "line-swap/lingbot-va": {
    url: "https://youtu.be/MQIIryZq2EY",
    status: "fail",
  },
  "line-swap/dim-wam": {
    url: "https://youtu.be/PBEg4ViszKs",
    status: "success",
  },
  "triangle-swap/pi05": {
    url: "https://youtu.be/8-lGbCJHAp4",
    status: "fail",
  },
  "triangle-swap/fast-wam": {
    url: "https://youtu.be/c-7tsjNlP-U",
    status: "fail",
  },
  "triangle-swap/lingbot-va": {
    url: "https://youtu.be/YAcCazWGtdE",
    status: "fail",
  },
  "triangle-swap/dim-wam": {
    url: "https://youtu.be/r8UqkxPWhok",
    status: "success",
  },
  "press-twice/pi05": {
    url: "https://youtu.be/ngYI2u1w6Vw",
    status: "fail",
  },
  "press-twice/fast-wam": {
    url: "https://youtu.be/XjO4xAQXxcg",
    status: "fail",
  },
  "press-twice/lingbot-va": {
    url: "https://youtu.be/GFrInmRAneE",
    status: "success",
  },
  "press-twice/dim-wam": {
    url: "https://youtu.be/g14p7FXv46w",
    status: "success",
  },
};

function getYouTubeId(url) {
  const match = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function getYouTubeEmbedUrl(youtubeId) {
  const params = new URLSearchParams({
    origin: window.location.origin,
    rel: "0",
  });

  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}

function populateVideoMatrix(matrix, tasks, methods, videoFiles) {
  for (const task of tasks) {
    const taskHead = document.createElement("div");
    taskHead.className = "task-head";
    taskHead.textContent = task.label;
    matrix.appendChild(taskHead);

    for (const method of methods) {
      const key = `${task.id}/${method.id}`;
      const videoFile = videoFiles[key];
      const slot = document.createElement("article");
      slot.className = "video-slot";

      const shell = document.createElement("div");
      shell.className = "video-shell";

      if (videoFile?.url) {
        const youtubeId = getYouTubeId(videoFile.url);

        if (youtubeId) {
          const iframe = document.createElement("iframe");
          iframe.src = getYouTubeEmbedUrl(youtubeId);
          iframe.title = `${task.label} ${method.label} video`;
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.allowFullscreen = true;
          iframe.loading = "lazy";
          iframe.referrerPolicy = "strict-origin-when-cross-origin";
          shell.appendChild(iframe);
        } else {
          const video = document.createElement("video");
          video.src = videoFile.url;
          video.controls = true;
          video.muted = true;
          video.playsInline = true;
          video.preload = "metadata";
          shell.appendChild(video);
        }
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "placeholder";
        placeholder.textContent = "+";
        placeholder.setAttribute(
          "aria-label",
          `Reserved video slot for ${task.label} with ${method.label}`,
        );
        shell.appendChild(placeholder);
      }

      const meta = document.createElement("div");
      meta.className = "slot-meta";
      meta.innerHTML = `<strong>${method.label}</strong><span>${videoFile?.status ?? "reserved"}</span>`;

      if (videoFile?.url) {
        const link = document.createElement("a");
        link.className = "video-link";
        link.href = videoFile.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open on YouTube";
        meta.appendChild(link);
      }

      slot.append(shell, meta);
      matrix.appendChild(slot);
    }
  }
}

populateVideoMatrix(
  document.querySelector(".video-matrix"),
  realWorldTasks,
  realWorldMethods,
  realWorldVideoFiles,
);
