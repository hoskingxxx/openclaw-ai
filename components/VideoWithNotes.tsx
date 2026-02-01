import { CodeBlock } from "./ui/CodeBlock";

interface VideoWithNotesProps {
  video: {
    id: string;
    platform: string;
    title: string;
    duration: string;
    notes: Array<{
      title: string;
      code: string;
    }>;
  };
}

export function VideoWithNotes({ video }: VideoWithNotesProps) {
  return (
    <div className="glass-card overflow-hidden">
      {/* 视频嵌入 */}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* 视频信息 */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{video.title}</h3>
        <p className="text-sm text-text-tertiary">{video.duration}</p>
      </div>

      {/* 指令提取区 - 核心留存功能 */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-text-primary mb-4">
          📝 视频干货 - 一键复制
        </h4>
        <p className="text-sm text-text-secondary mb-4">
          提取自视频的关键命令和配置，直接复制使用
        </p>

        <div className="space-y-4">
          {video.notes.map((note, index) => (
            <CodeBlock key={index} title={note.title} code={note.code} />
          ))}
        </div>

        <p className="text-xs text-text-tertiary mt-4">
          💡 必须留在本站才能复制，无需跳转到 YouTube
        </p>
      </div>
    </div>
  );
}
