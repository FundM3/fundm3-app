// PreviewModal.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownParser from "@/components/common/MarkdownParser";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdownText: string;
}

const PreviewMarkdown: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  markdownText,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700"
          aria-label="Close"
        >
          X
        </button>
        <MarkdownParser markdownText={markdownText}></MarkdownParser>
      </div>
    </div>
  );
};

export default PreviewMarkdown;
